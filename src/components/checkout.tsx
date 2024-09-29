"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export default function Checkout({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [amount]);

  if (loading || !clientSecret || !stripe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="bars" color="#000" />
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message || "Something went wrong");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message || "Something went wrong");
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      {clientSecret && <PaymentElement className="mb-6" />}
      {errorMessage && (
        <p className="text-red-500 mb-4 text-sm font-medium">{errorMessage}</p>
      )}
      <button
        disabled={!stripe}
        className="text-white w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        Pay Now
      </button>
    </form>
  );
}
