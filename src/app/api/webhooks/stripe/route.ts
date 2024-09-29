import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

  const signature = req.headers.get("Stripe-Signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature ?? "",
      endpointSecret ?? ""
    );

    if (event.type === "payment_intent.succeeded") {
      console.log("Payment intent succeeded");
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Webhook received" });
}
