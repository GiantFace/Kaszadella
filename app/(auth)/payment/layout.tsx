// app/payment/layout.tsx
"use client";
import React from "react";
import Script from "next/script";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-primary text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Stripe Fizetés</h1>
        </header>
        <main className="flex-grow p-6">{children}</main>
        <footer className="bg-gray-200 text-center py-4">
          © {new Date().getFullYear()} Your Company
        </footer>
      </div>
    </>
  );
}
