"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/hooks/use-toast"; // Ellenőrizd az import útvonalát
import { sampleTips } from "@/constans/Index";

// Inicializáljuk a Stripe-ot a publishable key-val
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/**
 * handlePayment: Ez a függvény elküldi a packageId-t a backend API-nak,
 * amely létrehozza a Stripe Checkout Session-t, majd a kapott sessionId alapján
 * a Stripe redirectToCheckout metódusával átirányítja a felhasználót a fizetési felületre.
 */
const handlePayment = async (packageId: number): Promise<void> => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error("Stripe nem töltődött be.");
  }

  // API hívás a Checkout Session létrehozásához
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageId }),
  });
  const data = await response.json();

  if (!data.id) {
    throw new Error("Checkout session létrehozása sikertelen.");
  }

  // Átirányítás a Stripe Checkout oldalára
  const { error } = await stripe.redirectToCheckout({
    sessionId: data.id,
  });
  if (error) {
    throw new Error(error.message);
  }
};

const PaymentInterface: React.FC = () => {
  const router = useRouter();
  const [loadingPackageId, setLoadingPackageId] = useState<number | null>(null);

  const purchasePackage = async (pkg: (typeof sampleTips)[number]) => {
    setLoadingPackageId(pkg.id);
    try {
      await handlePayment(pkg.id);
      // A Stripe.redirectToCheckout() átirányítja a felhasználót,
      // így ez utána nem feltétlenül fut le.
      toast({
        title: "Átirányítás...",
        front_description:
          "Kérem várjon, a Stripe fizetési felületre irányítjuk Önt.",
      });
    } catch (error: any) {
      toast({
        title: "Fizetési hiba",
        front_description: error.message || "Hiba történt a fizetés során.",
        variant: "destructive",
      });
    } finally {
      setLoadingPackageId(null);
    }
  };

  return (
    <section className="py-12 bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Válaszd ki a csomagodat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleTips.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
              style={{ borderTop: `4px solid ${pkg.color}` }}
            >
              <h3 className="text-2xl font-bold mb-2 text-center">
                {pkg.title}
              </h3>
              <p className="text-center text-lg mb-4">
                {pkg.front_description}
              </p>
              {pkg.cover && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={pkg.cover}
                    alt={pkg.title}
                    className="w-32 object-contain"
                  />
                </div>
              )}
              <p className="text-center font-semibold text-xl mb-4">
                {`${pkg.price} Ft`}
              </p>
              <p className="text-center text-sm text-gray-700 whitespace-pre-line mb-6">
                {pkg.back_description}
              </p>
              <button
                onClick={() => purchasePackage(pkg)}
                disabled={loadingPackageId === pkg.id}
                className="mt-auto bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                {loadingPackageId === pkg.id
                  ? "Fizetés folyamatban..."
                  : "Vásárlás"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentInterface;
