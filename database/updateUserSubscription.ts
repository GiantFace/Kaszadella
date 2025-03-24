// @/database/subscription.ts
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { subscription } from "swr/subscription";

export async function updateUserSubscription(
  userId: string,
  packageId: string | number,
) {
  const subscriptionStart = new Date();
  const subscriptionEnd = new Date(subscriptionStart);
  subscriptionEnd.setDate(subscriptionStart.getDate() + 30);

  await db
    .update(users)
    .set({
      package: packageId.toString(),
      subscription_start: subscriptionStart,
      subscription_end: subscriptionEnd,
      status: "Approved", // vagy az általad meghatározott aktív státusz
    })
    .where(eq(users.id, userId));
}
