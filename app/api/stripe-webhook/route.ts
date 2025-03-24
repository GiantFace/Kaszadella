import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateUserSubscription } from "@/database/updateUserSubscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Ellenőrizd az eseményt: itt a checkout.session.completed eseményt használjuk
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Feltételezzük, hogy a Checkout Session metadata mezőjében van a userId és packageId
    const userId = session.metadata?.userId;
    const packageId = session.metadata?.packageId;
    if (userId && packageId) {
      try {
        await updateUserSubscription(userId, packageId);
      } catch (error) {
        console.error("Error updating subscription:", error);
        return NextResponse.json(
          { error: "Subscription update failed" },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
