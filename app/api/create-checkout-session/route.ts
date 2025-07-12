// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sampleTips } from "@/constans/Index";
import { validateSimpleCoupon, applyCoupon } from "@/lib/simple-coupon-system";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const { packageId, userId, couponCode } = await request.json();
    
    const pkg = sampleTips.find((p) => p.id === packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: "Érvénytelen csomag" },
        { status: 400 },
      );
    }

    let finalPrice = pkg.price;
    let discountAmount = 0;
    let appliedCoupon = null;

    // Kupon validáció ha meg van adva
    if (couponCode) {
      try {
        const validationResult = await validateSimpleCoupon(userId, couponCode, packageId, pkg.price);
        
        if (validationResult.success && validationResult.coupon && validationResult.calculation) {
          finalPrice = parseInt(validationResult.calculation.finalPriceFormatted.replace(/\s/g, ''));
          discountAmount = parseInt(validationResult.calculation.discountAmountFormatted.replace(/\s/g, ''));
          appliedCoupon = validationResult.coupon;
          
          // Kupon alkalmazása (jelöljük felhasználtként)
          applyCoupon(userId, couponCode);
        }

      } catch (error) {
        console.error("Kupon validáció hiba:", error);
        return NextResponse.json(
          { error: "Kupon validáció sikertelen: " + (error instanceof Error ? error.message : 'Ismeretlen hiba') },
          { status: 400 }
        );
      }
    }

    const amountInCents = finalPrice * 100;

    // Létrehozzuk a Stripe Checkout Session-t
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "huf",
            product_data: {
              name: pkg.title,
              description: appliedCoupon 
                ? `${pkg.front_description} (Kupon: ${appliedCoupon.code} - ${discountAmount.toLocaleString('hu-HU')} Ft kedvezmény)`
                : pkg.front_description,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tips`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?canceled=true`,
      metadata: {
        userId,
        packageId: packageId.toString(),
        couponCode: appliedCoupon ? appliedCoupon.code : "",
        originalPrice: pkg.price.toString(),
        finalPrice: finalPrice.toString(),
        discountAmount: discountAmount.toString(),
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Session hiba:", error);
    return NextResponse.error();
  }
}
