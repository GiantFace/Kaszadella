// @/app/api/resend-verification/action.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users, forgotPasswordTokens } from "@/database/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { sendMail } from "@/lib/sendMail";
import { id } from "postcss-selector-parser";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Hiányzó email" }, { status: 400 });
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user[0]) {
    return NextResponse.json(
      { error: "Nincs ilyen felhasználó" },
      { status: 404 },
    );
  }

  if (user[0].status === "Approved") {
    return NextResponse.json({ error: "Már aktív fiók" }, { status: 400 });
  }

  // Töröljük a korábbi tokent
  await db
    .delete(forgotPasswordTokens)
    .where(eq(users.email, forgotPasswordTokens.email));

  // Új token
  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Például 1 órás érvényesség

  await db.insert(forgotPasswordTokens).values({
    email,
    token,
    expiresAt,
    createdAt: new Date(),
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  await sendMail(
    email,
    "Új megerősítő email",
    `
    <h2>Kattints az alábbi linkre a fiókod megerősítéséhez:</h2>
    <a href="${verifyUrl}" style="background: #0EA5C4; padding: 10px 15px; color: white; text-decoration: none;">
      Email megerősítése
    </a>
    <p>A link 24 óráig érvényes.</p>
    `,
  );

  return NextResponse.json({ success: true });
}
