// @/db/subscription.ts
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sampleTips } from "@/constans/Index";

// Ez a függvény lekéri az adott felhasználó előfizetés adatait az adatbázisból.
// Példa: az előfizetés aktív, ha a user.status "Approved" vagy "Customer".
export async function getUserSubscription(userId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (result.length === 0) return null;

  const user = result[0];

  // Számoljuk ki az előfizetés lejárati dátumát: például 30 nap az előfizetés kezdete után.
  const createdAt = new Date(user.createdAt);
  const expirationDate = new Date(createdAt);
  expirationDate.setDate(createdAt.getDate() + 30);

  const pkgId = parseInt(user.package);
  const tipObj = sampleTips.find((p) => p.id === pkgId);

  return {
    package: user.package, // Ebben a mezőben a csomag neve (pl. "1", "2", "3")
    status: user.status, // Például "Approved" vagy "Customer" aktív státusz esetén
    expirationDate: expirationDate.toISOString(),
    createdAt: undefined,
    lastActivityDate: undefined,
    packageName: tipObj ? tipObj.title : "Nincs aktív csomagod",
  };
}
