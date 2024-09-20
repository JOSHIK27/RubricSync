import { NextResponse } from "next/server";
import { supabase } from "@/lib";

export async function POST(req: Request) {
  const { userId } = await req.json();

  console.log(userId);

  try {
    const { data, error } = await supabase
      .from("chat_associations")
      .insert({ user_id: userId });

    console.log(data);

    if (error) throw error;

    return NextResponse.json(
      { chatAssociationId: data ? data[0].id : null },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
