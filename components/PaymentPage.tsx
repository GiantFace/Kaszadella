"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

// A környezetből olvassuk a Stripe publishable key-t
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Létrehozzuk a PaymentIntent-et a backend API-n keresztül
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();

    if (!data.clientSecret) {
      toast({
        title: "Fizetési hiba",
        front_description: "Nem sikerült létrehozni a tranzakciót.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // A bankkártya adatok alapján véglegesítjük a fizetést
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      toast({
        title: "Fizetési hiba",
        front_description:
          result.error.message || "Hiba történt a fizetés során.",
        variant: "destructive",
      });
    } else if (result.paymentIntent?.status === "succeeded") {
      toast({
        title: "Fizetés sikeres",
        front_description: "Átirányítás folyamatban...",
      });
      router.push("/payment-succes");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border border-gray-300 p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        {loading ? "Fizetés folyamatban..." : "Fizetés"}
      </button>
    </form>
  );
};

const PaymentPage: React.FC = () => {
  // Példa: 9990 Ft összeget fizetünk (átváltva centre, ha szükséges)
  const amount = 9901 * 100;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Fizetés bankkártyával
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
