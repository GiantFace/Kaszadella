// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sampleTips } from "@/constans/Index";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const { packageId, userId } = await request.json();
    const pkg = sampleTips.find((p) => p.id === packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: "Érvénytelen csomag" },
        { status: 400 },
      );
    }
    const amountInCents = pkg.price * 100;

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
              description: pkg.front_description,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tips`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?canceled=true`,
      // Itt elmentjük a userId és packageId értékeket
      metadata: {
        userId,
        packageId: packageId.toString(),
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Session hiba:", error);
    return NextResponse.error();
  }
}
