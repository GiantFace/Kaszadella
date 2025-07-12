// /app/api/admin/get-tips.ts
import { db } from "@/database/drizzle";
import { weeklyTips } from "@/database/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tips = await db
      .select()
      .from(weeklyTips)
      .orderBy(asc(weeklyTips.day));
    return NextResponse.json({ success: true, tips });
  } catch (error) {
    return NextResponse.json(
      { error: "Nem sikerült lekérdezni a tippeket" },
      { status: 500 },
    );
  }
}
