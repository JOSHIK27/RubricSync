"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import CheckoutForm from "@/components/checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App mt-20">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <></> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
}
