import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { coupons } from "@/database/schema";
import { eq } from "drizzle-orm";

// GET - Kuponok listázása
export async function GET() {
  try {
    const couponList = await db.select().from(coupons).orderBy(coupons.createdAt);
    return NextResponse.json(couponList);
  } catch (error) {
    console.error("Kuponok lekérése sikertelen:", error);
    return NextResponse.json(
      { error: "Szerverhiba" },
      { status: 500 }
    );
  }
}

// POST - Új kupon létrehozása
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validáció
    if (!data.code || !data.name || !data.type || !data.validFrom || !data.validUntil) {
      return NextResponse.json(
        { error: "Hiányzó kötelező mezők" },
        { status: 400 }
      );
    }

    // Kupon kód egyediség ellenőrzése
    const existingCoupon = await db
      .select()
      .from(coupons)
      .where(eq(coupons.code, data.code))
      .limit(1);

    if (existingCoupon.length > 0) {
      return NextResponse.json(
        { error: "Ez a kupon kód már létezik" },
        { status: 400 }
      );
    }

    // Dátum validáció
    const validFrom = new Date(data.validFrom);
    const validUntil = new Date(data.validUntil);
    
    if (validFrom >= validUntil) {
      return NextResponse.json(
        { error: "A kezdő dátum nem lehet későbbi mint a befejező dátum" },
        { status: 400 }
      );
    }

    // Kupon létrehozása
    const newCoupon = await db.insert(coupons).values({
      code: data.code.toUpperCase(),
      name: data.name,
      type: data.type,
      value: data.value,
      minAmount: data.minAmount || 0,
      maxDiscount: data.maxDiscount || null,
      usageLimit: data.usageLimit || null,
      validFrom,
      validUntil,
      isActive: data.isActive ?? true,
      applicablePackages: data.applicablePackages || null,
    }).returning();

    return NextResponse.json(newCoupon[0]);
  } catch (error) {
    console.error("Kupon létrehozási hiba:", error);
    return NextResponse.json(
      { error: "Szerverhiba" },
      { status: 500 }
    );
  }
} 