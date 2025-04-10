import { db } from "@/database/drizzle";
import { weeklyTips } from "@/database/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { packageType, day, tip, total_odds } = body;

  const validPackages = ["START", "KASZA", "KASZADELLA"];
  const validDays = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];

  if (!validPackages.includes(packageType) || !validDays.includes(day)) {
    return NextResponse.json(
      { error: "Érvénytelen csomag vagy nap" },
      { status: 400 },
    );
  }

  if (!packageType || !day || !tip) {
    return NextResponse.json({ error: "Hiányzó mezők" }, { status: 400 });
  }

  await db.insert(weeklyTips).values({
    package: packageType,
    day,
    tip,
    oddsSummary: total_odds ? String(total_odds) : null,
  });

  return NextResponse.json({ success: true });
}
