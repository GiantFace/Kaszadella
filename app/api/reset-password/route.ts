// /app/api/reset-password/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { forgotPasswordTokens, users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Hiányzó adat" }, { status: 400 });
  }

  const user = await db
    .select()
    .from(forgotPasswordTokens)
    .where(eq(forgotPasswordTokens.token, token))
    .limit(1);

  if (!user[0]) {
    return NextResponse.json({ error: "Érvénytelen token" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, user[0].id));

  await db
    .delete(forgotPasswordTokens)
    .where(eq(forgotPasswordTokens.token, token));

  return NextResponse.json({ success: true });
}
