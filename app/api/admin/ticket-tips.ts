// app/api/admin/ticket-tips/route.ts
import { NextResponse } from "next/server";
import { db } from "database/drizzle"; // Drizzle kliensed
import { ticket_tips } from "database/schema"; // A schema definíciód
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  const body: {
    date: string;
    day_name: string;
    subscription: string;
    package: string;
    combination: string;
    slip_name: string;
    sum_odds: string;
    tips: {
      tip_name: string;
      tip_description: string;
      odds_value: string;
    }[];
  } = await request.json();

  // Sorok összeállítása: minden tipp egy új rekord
  const rows = body.tips.map((tip) => ({
    id: uuid(),
    date: body.date,
    day_name: body.day_name,
    subscription: body.subscription,
    package: body.package,
    combination: body.combination,
    slip_name: body.slip_name,
    tip_name: tip.tip_name,
    tip_description: tip.tip_description,
    odds_value: tip.odds_value,
    sum_odds: body.sum_odds,
  }));

  // Bulk insert Drizzle‑lal
  await db.insert(ticket_tips).values(rows);

  return NextResponse.json({ inserted: rows.length });
}
