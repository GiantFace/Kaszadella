// app/subscription/page.tsx
"use client";

import React from "react";
import PaymentInterface from "@/components/PaymentInterface";
import { useSession } from "next-auth/react";

export default function SubscriptionPage() {
  const { data: session } = useSession();

  return (
    <div className="relative">
      {/* SEO Meta információk (kliens oldalon nem látható, de jó struktúra) */}
      <div className="sr-only">
        <h1>Kaszadella Prémium Előfizetési Csomagok</h1>
        <p>Válaszd ki a tökéletes sportfogadási tipp csomagot. START, KASZA vagy KASZADELLA csomag kupon kedvezményekkel.</p>
      </div>

      {/* Nem bejelentkezett felhasználók számára CTA */}
      {!session && (
        <div className="mb-8">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl">🔐</span>
                <h2 className="text-xl font-bold text-gray-900">Jelentkezz be a vásárláshoz!</h2>
              </div>
              <p className="text-gray-700 mb-6">
                A csomagok megvásárlásához és a kupon kódok használatához be kell jelentkezned a fiókodba.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/sign-in" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  🚀 Bejelentkezés
                </a>
                <a 
                  href="/sign-up" 
                  className="bg-white text-gray-900 border-2 border-gray-200 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300"
                >
                  📝 Regisztráció
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PaymentInterface komponens */}
      <PaymentInterface />
    </div>
  );
}
