// app/api/activate-subscription/route.ts
import { NextResponse } from "next/server";
import { updateUserSubscription } from "@/database/updateUserSubscription";

export async function POST(request: Request) {
  try {
    const { userId, packageId } = await request.json();
    // Frissítjük az előfizetést: 30 napos előfizetés például
    await updateUserSubscription(userId, packageId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Activate subscription error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
