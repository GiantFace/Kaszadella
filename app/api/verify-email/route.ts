import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users, forgotPasswordTokens } from "@/database/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect("/verify-failed");
  }

  const result = await db
    .select()
    .from(forgotPasswordTokens)
    .where(
      and(
        eq(forgotPasswordTokens.token, token),
        eq(forgotPasswordTokens.email, email.toLowerCase()),
      ),
    )
    .limit(1);

  const record = result[0];

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect("/verify-failed");
  }

  await db
    .update(users)
    .set({ status: "Approved" })
    .where(eq(users.email, email.toLowerCase()));

  await db
    .delete(forgotPasswordTokens)
    .where(eq(forgotPasswordTokens.token, token));

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
