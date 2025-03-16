"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      // For demo purposes, we're not actually charging anything
      setSucceeded(true);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setSucceeded(false);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-md p-3 bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className={`w-full px-4 py-2 text-white rounded-md ${
          processing || succeeded
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processing
          ? "Processing..."
          : succeeded
          ? "Payment Successful!"
          : "Test Payment"}
      </button>
    </form>
  );
};

export const PaymentForm = () => (
  <div className="max-w-md mx-auto">
    <h3 className="text-xl font-semibold mb-4">Test Stripe Integration</h3>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);
