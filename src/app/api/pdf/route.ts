import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import pdf from "pdf-parse";
import { Document } from "@langchain/core/documents";
import Together from "together-ai";
import { render_page } from "@/lib/utils";
import { RubricPrompt } from "@/prompts/rubric_prompt";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: "d07cc4e7-febc-4d5e-8949-d988301a175c" });
const index = pc.index("sample");
const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function POST(req: Request) {
  const { reportDataBuffer, rubricDataBuffer } = await req.json();

  const reportData = await pdf(reportDataBuffer, {
    pagerender: render_page,
  });

  const rubricData = await pdf(rubricDataBuffer, {
    pagerender: render_page,
  });
  console.log(rubricData.text);

  // const splitter = new RecursiveCharacterTextSplitter({
  //   chunkSize: 1000,
  //   chunkOverlap: 100,
  //   separators: ["|", "##", ">", "-"],
  // });
  // const docOutput = await splitter.splitDocuments([
  //   new Document({ pageContent: reportData.text }),
  // ]);
  // console.log(docOutput);
  // const embeddingVectorList = [];
  // let num = 0;
  // for (const context of docOutput) {
  //   const response = await together.embeddings.create({
  //     model: "hazyresearch/M2-BERT-2k-Retrieval-Encoder-V1",
  //     input: context.pageContent,
  //   });
  //   embeddingVectorList.push({
  //     id: `vec${num}`,
  //     values: response.data[0].embedding,
  //   });
  //   num = num + 1;
  // }
  // await index.namespace("ns1").upsert(embeddingVectorList);
  // return NextResponse.json({ message: "OK" });
  // console.log(reportData.text);
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: RubricPrompt(rubricData.text),
        },
      ],
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    });
    if (response.choices) console.log(response.choices[0].message?.content);

    if (response.choices)
      return NextResponse.json(
        { message: "Success", feedback: response.choices[0].message?.content },
        { status: 201 }
      );
    else {
      throw new Error("Some error while matching rubric with report");
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  const response = await together.embeddings.create({
    model: "hazyresearch/M2-BERT-2k-Retrieval-Encoder-V1",
    input: `i do not have right to work in the uk`,
  });
  const queryResponse = await index.namespace("ns1").query({
    vector: response.data[0].embedding,
    topK: 1,
    includeValues: true,
  });
  console.log(queryResponse);
  return NextResponse.json({ message: "OK" });
}
