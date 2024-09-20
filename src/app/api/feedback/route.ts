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

export async function POST(req: Request) {
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

    for (const rubric of rubricArray.choices[0].message.content) {
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

    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

async function textExtractor(pdfBuffer: Buffer) {
  const pdfData = await pdf(pdfBuffer, {
    pagerender: render_page,
  });

  return pdfData.text;
}
