import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateUserSubscription } from "@/database/updateUserSubscription";
import { db } from "@/database/drizzle";
import { coupons, couponUsages } from "@/database/schema";
import { eq } from "drizzle-orm";

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
    const couponId = session.metadata?.couponId;
    const originalPrice = session.metadata?.originalPrice;
    const finalPrice = session.metadata?.finalPrice;
    const discountAmount = session.metadata?.discountAmount;
    
    if (userId && packageId) {
      try {
        // Felhasználó előfizetés frissítése
        await updateUserSubscription(userId, packageId);
        
        // Kupon használat rögzítése, ha volt kupon
        if (couponId && originalPrice && finalPrice && discountAmount) {
          await db.insert(couponUsages).values({
            couponId,
            userId,
            packageId: parseInt(packageId),
            originalPrice: parseInt(originalPrice) * 100, // Ft -> fillér
            discountAmount: parseInt(discountAmount) * 100, // Ft -> fillér
            finalPrice: parseInt(finalPrice) * 100, // Ft -> fillér
            stripeSessionId: session.id,
          });

          // Kupon használat számláló frissítése
          await db
            .update(coupons)
            .set({
              usedCount: db.raw("used_count + 1"),
            })
            .where(eq(coupons.id, couponId));
        }
        
      } catch (error) {
        console.error("Error updating subscription or coupon usage:", error);
        return NextResponse.json(
          { error: "Subscription update failed" },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
