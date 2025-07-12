// scripts/create-demo-coupons.ts
import { db } from "@/database/drizzle";
import { coupons } from "@/database/schema";

async function createDemoCoupons() {
  console.log("🎫 Demo kuponok létrehozása...");
  
  const demoCoupons = [
    {
      code: "WELCOME20",
      name: "Üdvözlő 20% kedvezmény",
      type: "percentage" as const,
      value: 20,
      minAmount: 0,
      maxDiscount: 2000, // Max 2000 Ft kedvezmény
      usageLimit: 100,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 nap
      isActive: true,
      applicablePackages: JSON.stringify([1, 2, 3]), // Mind a 3 csomagra
    },
    {
      code: "SAVE1000",
      name: "1000 Ft kedvezmény",
      type: "fixed" as const,
      value: 1000,
      minAmount: 3000, // Min 3000 Ft vásárlás
      maxDiscount: null,
      usageLimit: 50,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 nap
      isActive: true,
      applicablePackages: JSON.stringify([2, 3]), // Csak KASZA és KASZADELLA
    },
    {
      code: "FREESTART",
      name: "Ingyenes START csomag",
      type: "free" as const,
      value: 0,
      minAmount: 0,
      maxDiscount: null,
      usageLimit: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 nap
      isActive: true,
      applicablePackages: JSON.stringify([1]), // Csak START csomag
    },
    {
      code: "TESTCOUPON",
      name: "Teszt kupon - 50%",
      type: "percentage" as const,
      value: 50,
      minAmount: 0,
      maxDiscount: null,
      usageLimit: null, // Korlátlan
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 év
      isActive: true,
      applicablePackages: JSON.stringify([1, 2, 3]),
    },
    {
      code: "EXPIRED",
      name: "Lejárt kupon (teszt)",
      type: "percentage" as const,
      value: 30,
      minAmount: 0,
      maxDiscount: null,
      usageLimit: 5,
      validFrom: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 napja
      validUntil: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 napja lejárt
      isActive: true,
      applicablePackages: JSON.stringify([1, 2, 3]),
    }
  ];

  try {
    for (const coupon of demoCoupons) {
      await db.insert(coupons).values(coupon);
      console.log(`✅ Kupon létrehozva: ${coupon.code} - ${coupon.name}`);
    }
    
    console.log("🎉 Demo kuponok sikeresen létrehozva!");
    console.log("\n📋 TESZT KUPONOK:");
    console.log("• WELCOME20 - 20% kedvezmény (max 2000 Ft)");
    console.log("• SAVE1000 - 1000 Ft kedvezmény (min 3000 Ft vásárlás)");
    console.log("• FREESTART - Ingyenes START csomag");
    console.log("• TESTCOUPON - 50% kedvezmény (teszt)");
    console.log("• EXPIRED - Lejárt kupon (teszt)");
    
  } catch (error) {
    console.error("❌ Hiba a kuponok létrehozásakor:", error);
  }
}

// Futtatás
createDemoCoupons().catch(console.error); 