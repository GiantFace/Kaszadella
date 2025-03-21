import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    // PaymentIntent létrehozása
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "huf", // pl. HUF
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
