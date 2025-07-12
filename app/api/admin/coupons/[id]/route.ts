import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { coupons } from "@/database/schema";
import { eq } from "drizzle-orm";

// PUT - Kupon frissítése
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Validáció
    if (!data.code || !data.name || !data.type || !data.validFrom || !data.validUntil) {
      return NextResponse.json(
        { error: "Hiányzó kötelező mezők" },
        { status: 400 }
      );
    }

    // Kupon kód egyediség ellenőrzése (kivéve a jelenlegi kupon)
    const existingCoupon = await db
      .select()
      .from(coupons)
      .where(eq(coupons.code, data.code))
      .limit(1);

    if (existingCoupon.length > 0 && existingCoupon[0].id !== id) {
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

    // Kupon frissítése
    const updatedCoupon = await db
      .update(coupons)
      .set({
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
      })
      .where(eq(coupons.id, id))
      .returning();

    if (updatedCoupon.length === 0) {
      return NextResponse.json(
        { error: "Kupon nem található" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCoupon[0]);
  } catch (error) {
    console.error("Kupon frissítési hiba:", error);
    return NextResponse.json(
      { error: "Szerverhiba" },
      { status: 500 }
    );
  }
}

// DELETE - Kupon törlése
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Kupon törlése
    const deletedCoupon = await db
      .delete(coupons)
      .where(eq(coupons.id, id))
      .returning();

    if (deletedCoupon.length === 0) {
      return NextResponse.json(
        { error: "Kupon nem található" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Kupon törlési hiba:", error);
    return NextResponse.json(
      { error: "Szerverhiba" },
      { status: 500 }
    );
  }
} 