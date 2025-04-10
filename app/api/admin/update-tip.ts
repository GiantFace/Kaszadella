import { db } from "@/database/drizzle";
import { weeklyTips } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, packageType, day, tip, total_odds } = body;

  if (!id || !packageType || !day || !tip) {
    return NextResponse.json(
      { error: "Hiányzó mezők az adatmódosításhoz" },
      { status: 400 },
    );
  }

  try {
    await db
      .update(weeklyTips)
      .set({
        package: packageType,
        day,
        tip,
        oddsSummary: total_odds ? String(total_odds) : null,
      })
      .where(eq(weeklyTips.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Szerkesztési hiba" }, { status: 500 });
  }
}
