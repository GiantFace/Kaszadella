// /app/api/admin/delete-tip.ts
import { db } from "@/database/drizzle";
import { weeklyTips } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Hiányzó ID" }, { status: 400 });
  }

  try {
    await db.delete(weeklyTips).where(eq(weeklyTips.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Törlés sikertelen" }, { status: 500 });
  }
}
