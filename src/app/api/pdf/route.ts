import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import pdf from "pdf-parse";
import { Document } from "@langchain/core/documents";
import { openai } from "@/lib/openai";
import { render_page } from "@/lib/utils";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ExtractRubricCriteria } from "@/lib/prompts";

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
    console.log(rubricData.text);

    const resp = await ExtractRubricCriteria(rubricData.text);

    console.log(resp.choices[0].message);

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

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// const pc = new Pinecone({
//   apiKey: process.env.PINE_CONE_API_KEY ?? "",
// });

// const dbIndex = pc.index("rubricsync");

// await dbIndex.namespace("reports").upsert(reportEmbeddingVectorList);
// await dbIndex.namespace("rubrics").upsert(rubricEmbeddingVectorList);

// const vectorStore = await PineconeStore.fromExistingIndex(
//   new OpenAIEmbeddings(),
//   { pineconeIndex: dbIndex }
// );

// const rubricCriteria = await vectorStore.similaritySearch("", 100);

// console.log(rubricCriteria);
