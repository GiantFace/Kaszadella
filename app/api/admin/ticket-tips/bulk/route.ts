// app/api/admin/ticket-tips/bulk/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { ticket_tips } from "@/database/schema";

// Ha kifejezetten Node.js környezetet szeretnél:
// export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  if (!Array.isArray(body.slips)) {
    return NextResponse.json(
      { error: "Missing or invalid 'slips' array" },
      { status: 400 },
    );
  }

  const rows = body.slips.flatMap((slip: any) =>
    Array.isArray(slip.tips)
      ? slip.tips.map((tip: any) => ({
          id: crypto.randomUUID(),
          date: slip.date,
          day_name: slip.dayName,
          subscription: slip.subscriptionName,
          package: slip.packageName,
          combination: slip.combinationType,
          slip_name: slip.ticketName,
          tip_name: tip.tipName,
          tip_description: tip.tipDescription,
          odds_value: tip.oddsValue,
          sum_odds: slip.sumOdds,
        }))
      : [],
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "No tips to insert" }, { status: 400 });
  }

  try {
    await db.insert(ticket_tips).values(rows);
    return NextResponse.json({ success: true, inserted: rows.length });
  } catch (err: any) {
    console.error("Drizzle insert error:", err);
    return NextResponse.json(
      { error: "DB insert failed", details: err.message },
      { status: 500 },
    );
  }
}
