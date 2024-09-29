"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "@/components/checkout";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function CheckoutPage() {
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount: 500, currency: "usd" }}
    >
      <Checkout amount={500} currency="usd" />
    </Elements>
  );
}
