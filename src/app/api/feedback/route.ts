import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { openai } from "@/lib/openai";
import {
  ExtractRubricCriteria,
  CalculateSimilarityScore,
} from "../../../utils/index";
import pdf from "pdf-parse";
import { render_page } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request) {
  const { userId } = auth();
  try {
    const { reportDataBuffer, rubricDataBuffer } = await req.json();

    const reportData = await textExtractor(reportDataBuffer);

    const rubricData = await textExtractor(rubricDataBuffer);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 8192,
      chunkOverlap: 100,
      separators: ["|", "##", ">", "-"],
    });

    const reportContent = await splitter.splitDocuments([
      new Document({ pageContent: reportData }),
    ]);

    const reportEmbeddingVectorList = [];

    let num = 0;
    for (const context of reportContent) {
      const response = await openai.embeddings.create({
        input: context.pageContent,
        model: "text-embedding-ada-002",
      });
      reportEmbeddingVectorList.push({
        id: `vec${num}`,
        values: response.data[0].embedding,
      });
      num = num + 1;
    }

    const rubricArray = await ExtractRubricCriteria(rubricData);

    const feedback: { [key: string]: number } = {};

    for (const rubric of JSON.parse(rubricArray.choices[0].message.content)) {
      const rubricEmbedding = await openai.embeddings.create({
        input: rubric,
        model: "text-embedding-ada-002",
      });
      let score = 0;
      for (const reportEmbeddingItem of reportEmbeddingVectorList) {
        score =
          score +
          CalculateSimilarityScore(
            reportEmbeddingItem.values,
            rubricEmbedding.data[0].embedding
          );
      }
      score = score / reportEmbeddingVectorList.length;
      feedback[rubric] = score;
    }

    const { error } = await supabase.from("feedbacks").insert({
      feedback: JSON.stringify(feedback),
      user_id: userId,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ feedback }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = auth();
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("user_id", userId);
  const response = data?.map((item) => {
    const feedbackObj = JSON.parse(item.feedback);
    let avg = 0;
    for (const criteria in feedbackObj) {
      avg += feedbackObj[criteria];
    }
    avg /= Object.keys(feedbackObj).length;
    return {
      ...item,
      avgScore: avg,
      feedback: feedbackObj.feedback,
    };
  });
  if (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
  return NextResponse.json({ data: response }, { status: 200 });
}

async function textExtractor(pdfBuffer: Buffer) {
  const pdfData = await pdf(pdfBuffer, {
    pagerender: render_page,
  });

  return pdfData.text;
}
