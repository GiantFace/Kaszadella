import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { ticket_tips } from "@/database/schema";

export async function GET() {
  try {
    const rows = await db
      .select({
        slip_name: ticket_tips.slip_name,
        date: ticket_tips.date,
        day_name: ticket_tips.day_name,
        combination: ticket_tips.combination,
        tip_name: ticket_tips.tip_name,
        tip_description: ticket_tips.tip_description,
        odds_value: ticket_tips.odds_value,
        sum_odds: ticket_tips.sum_odds,
      })
      .from(ticket_tips);

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("Failed to fetch ticket tips:", err);
    return NextResponse.json(
      { error: "Fetch failed", details: err.message },
      { status: 500 },
    );
  }
}
