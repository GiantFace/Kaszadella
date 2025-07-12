import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { ticket_tips } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select({
        id: ticket_tips.id,
        slip_name: ticket_tips.slip_name,
        date: ticket_tips.date,
        day_name: ticket_tips.day_name,
        subscription: ticket_tips.subscription,
        package: ticket_tips.package,
        tip_name: ticket_tips.tip_name,
        tip_description: ticket_tips.tip_description,
        odds_value: ticket_tips.odds_value,
        sum_odds: ticket_tips.sum_odds,
        combination: ticket_tips.combination,
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

export async function PUT(req: Request) {
  const { tips } = await req.json();

  try {
    for (const tip of tips) {
      if (!tip.id) continue;
      await db
        .update(ticket_tips)
        .set({
          date: tip.date,
          day_name: tip.dayName,
          subscription: tip.subscription,
          package: tip.package,
          slip_name: tip.slip_name,
          tip_name: tip.tipName,
          tip_description: tip.tipDescription,
          odds_value: tip.oddsValue,
        })
        .where(eq(ticket_tips.id, tip.id.toString()));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
