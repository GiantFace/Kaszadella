// app/api/admin/ticket-tips/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { ticket_tips } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await db.delete(ticket_tips).where(eq(ticket_tips.id, id));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
