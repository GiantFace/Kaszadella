// app/api/admin/ticket-tips/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { ticket_tips } from "@/database/schema";

export async function GET() {
  try {
    const rows = await db
      .select({
        slipName: ticket_tips.slip_name,
        date: ticket_tips.date,
        dayName: ticket_tips.day_name,
        subscription: ticket_tips.subscription,
        package: ticket_tips.package,
        tipName: ticket_tips.tip_name,
        tipDescription: ticket_tips.tip_description,
        oddsValue: ticket_tips.odds_value,
      })
      .from(ticket_tips);

    console.log("📦 API válasz:", rows); // ← Ellenőrzésre

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("Failed to fetch ticket tips:", err);
    return NextResponse.json(
      { error: "Fetch failed", details: err.message },
      { status: 500 },
    );
  }
}
