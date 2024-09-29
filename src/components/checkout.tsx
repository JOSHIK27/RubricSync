"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function Checkout({ amount, currency }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  console.log(clientSecret);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount, currency }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {clientSecret && <PaymentElement />}
    </div>
  );
}
