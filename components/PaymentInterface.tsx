"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/hooks/use-toast";
import { sampleTips } from "@/constans/Index";
import { useSession } from "next-auth/react";
import CouponInput from "@/components/CouponInput";

// Coupon interface
interface AppliedCoupon {
  id: number;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'free';
  value: number;
  applicablePackages: string[];
}

// Pricing calculation interface
interface PricingCalculation {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  finalPriceFormatted: string;
  discountAmountFormatted: string;
  discountPercentage: string;
}

// Inicializáljuk a Stripe-ot a publishable key-val
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/**
 * handlePayment: Ez a függvény elküldi a packageId-t és a userId-t a backend API-nak,
 * amely létrehozza a Stripe Checkout Session-t, majd a kapott sessionId alapján
 * a Stripe redirectToCheckout metódusával átirányítja a felhasználót a fizetési felületre.
 */
const handlePayment = async (packageId: number, userId: string, couponCode?: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error("Stripe nem töltődött be.");
  }

  // API hívás a Checkout Session létrehozásához
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageId, userId, couponCode }),
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
  const [packageCoupons, setPackageCoupons] = useState<Record<number, AppliedCoupon | null>>({});
  const [packageCalculations, setPackageCalculations] = useState<Record<number, PricingCalculation | null>>({});

  // Ha NextAuth-ot használsz, ezzel ki tudod nyerni a user ID-t:
  const { data: session } = useSession();
  const userId = session?.user?.id; // Ha be van jelentkezve, itt lesz a user ID

  // Calculate discounted price for display
  const calculateDiscountedPrice = (originalPrice: number, coupon: AppliedCoupon): string => {
    let finalPrice = originalPrice;
    
    if (coupon.type === 'percentage') {
      finalPrice = originalPrice * (1 - coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      finalPrice = Math.max(0, originalPrice - coupon.value);
    } else if (coupon.type === 'free') {
      finalPrice = 0;
    }
    
    return Math.round(finalPrice).toLocaleString('hu-HU');
  };

  // Format price helper
  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString('hu-HU');
  };

  // Handle coupon applied
  const handleCouponApplied = (packageId: number, coupon: AppliedCoupon, calculation: PricingCalculation) => {
    setPackageCoupons(prev => ({ ...prev, [packageId]: coupon }));
    setPackageCalculations(prev => ({ ...prev, [packageId]: calculation }));
    
    toast({
      title: "Kupon alkalmazva! 🎉",
      front_description: `${calculation.discountAmountFormatted} Ft kedvezmény`,
    });
  };

  // Handle coupon removed
  const handleCouponRemoved = (packageId: number) => {
    setPackageCoupons(prev => ({ ...prev, [packageId]: null }));
    setPackageCalculations(prev => ({ ...prev, [packageId]: null }));
    
    toast({
      title: "Kupon eltávolítva",
      front_description: "A kedvezmény törölve lett",
    });
  };

  const purchasePackage = async (pkg: (typeof sampleTips)[number]) => {
    if (!userId) {
      toast({
        title: "Hiba",
        front_description: "Kérlek, jelentkezz be a vásárláshoz.",
        variant: "destructive",
      });
      return;
    }

    setLoadingPackageId(pkg.id);
    try {
      const appliedCoupon = packageCoupons[pkg.id];
      await handlePayment(pkg.id, userId, appliedCoupon?.code);
      // A Stripe.redirectToCheckout() átirányítja a felhasználót,
      // így ez utána nem feltétlenül fut le.
      toast({
        title: "Átirányítás...",
        front_description: "Kérem várjon, a Stripe fizetési felületre irányítjuk Önt.",
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
    <section className="py-12 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-primary-turquoise">
          Válaszd ki a csomagodat
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {sampleTips.map((pkg) => {
            const appliedCoupon = packageCoupons[pkg.id];
            const calculation = packageCalculations[pkg.id];
            const finalPrice = calculation ? calculation.finalPriceFormatted : formatPrice(pkg.price);
            const discountAmount = calculation ? calculation.discountAmountFormatted : 0;
            
            return (
              <div
                key={pkg.id}
                className="bg-gray-900 shadow-lg rounded-lg p-6 flex flex-col border border-gray-700 hover:border-primary-turquoise transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-2 text-center text-white">
                  {pkg.title}
                </h3>
                <p className="text-center text-lg mb-4 text-gray-300">
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
                
                {/* Pricing with coupon support */}
                <div className="text-center mb-4">
                  {appliedCoupon && calculation ? (
                    <div className="space-y-2">
                      <p className="text-lg text-gray-400 line-through">
                        {formatPrice(pkg.price)} Ft
                      </p>
                      <p className="text-2xl font-semibold text-primary-turquoise">
                        {finalPrice} Ft
                      </p>
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                        💰 {discountAmount} Ft megtakarítás!
                      </div>
                    </div>
                  ) : (
                    <p className="text-2xl font-semibold text-primary-turquoise">
                      {formatPrice(pkg.price)} Ft
                    </p>
                  )}
                </div>
                
                <p className="text-center text-sm text-gray-300 whitespace-pre-line mb-6">
                  {pkg.back_description}
                </p>
                
                {/* Coupon Input */}
                {userId && (
                  <div className="mb-6">
                    <CouponInput
                      packageId={pkg.id}
                      userId={userId}
                      onCouponApplied={(coupon, calculation) => 
                        handleCouponApplied(pkg.id, coupon, calculation)
                      }
                      onCouponRemoved={() => handleCouponRemoved(pkg.id)}
                      disabled={loadingPackageId === pkg.id}
                    />
                  </div>
                )}
                
                <button
                  onClick={() => purchasePackage(pkg)}
                  disabled={loadingPackageId === pkg.id}
                  className="mt-auto bg-primary-turquoise hover:bg-primary-turquoise/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingPackageId === pkg.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Átírányítás...</span>
                    </div>
                  ) : (
                    <span>Vásárlás - {finalPrice} Ft</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Trust badges */}
        <div className="text-center">
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">🛡️ Miért válaszd a Kaszadellát?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-turquoise rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                  🔒
                </div>
                <h4 className="font-semibold text-white mb-2">Biztonságos Fizetés</h4>
                <p className="text-sm text-gray-300">Stripe által védett, SSL titkosított tranzakciók</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                  ⚡
                </div>
                <h4 className="font-semibold text-white mb-2">Azonnali Hozzáférés</h4>
                <p className="text-sm text-gray-300">Vásárlás után azonnal elérheted a tippeket</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-turquoise rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                  🎯
                </div>
                <h4 className="font-semibold text-white mb-2">Magas Pontosság</h4>
                <p className="text-sm text-gray-300">Szakértői elemzések és megbízható tippek</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInterface;
