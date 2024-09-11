import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import pdf from "pdf-parse";
import { Document } from "@langchain/core/documents";
import { openai } from "@/lib/openai";
import { render_page } from "@/lib/utils";
import {
  ExtractRubricCriteria,
  CalculateSimilarityScore,
} from "../../../utils/index";

export async function POST(req: Request) {
  try {
    const { reportDataBuffer, rubricDataBuffer } = await req.json();

    const reportData = await pdf(reportDataBuffer, {
      pagerender: render_page,
    });

    const rubricData = await pdf(rubricDataBuffer, {
      pagerender: render_page,
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 8192,
      chunkOverlap: 100,
      separators: ["|", "##", ">", "-"],
    });

    const reportContent = await splitter.splitDocuments([
      new Document({ pageContent: reportData.text }),
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

    const rubricArray = await ExtractRubricCriteria(rubricData.text);

    const feedback: { [key: string]: number } = {};

    for (const rubric of rubricArray.choices[0].message.content) {
      const rubricEmbedding = await openai.embeddings.create({
        input: rubric,
        model: "text-embedding-ada-002",
      });
      let score = 0;
      for (const reportEmbeddingItem of reportEmbeddingVectorList) {
        console.log(
          reportEmbeddingItem.values,
          rubricEmbedding.data[0].embedding
        );
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

    return NextResponse.json({ feedback });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
