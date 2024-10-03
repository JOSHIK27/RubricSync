import { ImproveText } from "@/utils/prompts";
import pdf from "pdf-parse";
import { render_page } from "@/lib/utils";
import { NextResponse } from "next/server";
import { supabase } from "@/lib";

export async function POST(req: Request) {
  try {
    const { originalText, criterion, chatId } = await req.json();
    const rubricBuffer = Buffer.from(criterion);
    const rubricText = await textExtractor(rubricBuffer);
    const improvedText = await ImproveText(originalText, rubricText);

    const { error } = await supabase.from("chat_history").insert({
      selected_text: originalText,
      improved_text: improvedText.choices[0].message.content,
      chat_id: chatId,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json(improvedText.choices[0].message.content, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}

async function textExtractor(pdfBuffer: Buffer) {
  const pdfData = await pdf(pdfBuffer, {
    pagerender: render_page,
  });

  return pdfData.text;
}
