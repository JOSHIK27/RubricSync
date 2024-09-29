import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment-success ",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An error occurred");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Complete Your Payment
        </h2>
        <PaymentElement
          id="payment-element"
          options={{ layout: "tabs" }}
          className="w-full"
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold 
                     hover:bg-blue-700 transition duration-300 ease-in-out
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && (
          <div id="payment-message" className="text-center text-red-600 mt-4">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
