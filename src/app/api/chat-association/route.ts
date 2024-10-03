import { NextResponse } from "next/server";
import { supabase } from "@/lib";

export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    const { data, error } = await supabase
      .from("chat_associations")
      .insert({ user_id: userId })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { chatAssociationId: data && data.id ? data.id : null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
