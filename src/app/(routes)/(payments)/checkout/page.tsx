"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "@/components/checkout";
import { convertToSubCurrency } from "@/utils/stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function Page() {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubCurrency(1),
        currency: "usd",
      }}
    >
      <Checkout amount={convertToSubCurrency(5)} />
    </Elements>
  );
}
