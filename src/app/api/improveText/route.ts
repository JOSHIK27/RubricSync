import { ImproveText } from "@/utils/prompts";
import pdf from "pdf-parse";
import { render_page } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { originalText, criterion } = await req.json();
    const rubricBuffer = Buffer.from(criterion);
    const rubricText = await textExtractor(rubricBuffer);
    const improvedText = await ImproveText(originalText, rubricText);
    return NextResponse.json(improvedText.choices[0].message.content, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function textExtractor(pdfBuffer: Buffer) {
  const pdfData = await pdf(pdfBuffer, {
    pagerender: render_page,
  });

  return pdfData.text;
}
