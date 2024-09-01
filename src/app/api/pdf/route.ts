import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import pdf from "pdf-parse";
import { Document } from "@langchain/core/documents";
import OpenAI from "openai";
import { render_page } from "@/lib/utils";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINE_CONE_API_KEY ?? "" });
const dbIndex = pc.index("rubricsync");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const rubricContent = await splitter.splitDocuments([
      new Document({ pageContent: rubricData.text }),
    ]);

    const reportEmbeddingVectorList = [];
    const rubricEmbeddingVectorList = [];

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

    num = 0;
    for (const context of rubricContent) {
      const response = await openai.embeddings.create({
        input: context.pageContent,
        model: "text-embedding-ada-002",
      });
      rubricEmbeddingVectorList.push({
        id: `vec${num}`,
        values: response.data[0].embedding,
      });
      num = num + 1;
    }

    await dbIndex.namespace("reports").upsert(reportEmbeddingVectorList);
    await dbIndex.namespace("rubrics").upsert(rubricEmbeddingVectorList);

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
