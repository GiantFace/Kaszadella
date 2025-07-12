import { NextResponse } from "next/server";
import { validateSimpleCoupon } from "@/lib/simple-coupon-system";
import { sampleTips } from "@/constans/Index";

export async function POST(request: Request) {
  try {
    const { couponCode, packageId, userId } = await request.json();
    
    // Adatok ellenőrzése
    if (!couponCode || !packageId || !userId) {
      return NextResponse.json(
        { error: "Hiányzó adatok" },
        { status: 400 }
      );
    }

    // Csomag ár ellenőrzés
    const pkg = sampleTips.find(p => p.id === packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: "Érvénytelen csomag" },
        { status: 400 }
      );
    }

    // Egyszerű kupon validáció
    const validationResult = await validateSimpleCoupon(userId, couponCode, packageId, pkg.price);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      coupon: validationResult.coupon,
      calculation: validationResult.calculation
    });

  } catch (error) {
    console.error("🚨 Kupon validáció hiba:", error);
    return NextResponse.json(
      { error: "Szerverhiba a kupon ellenőrzés során" },
      { status: 500 }
    );
  }
} 