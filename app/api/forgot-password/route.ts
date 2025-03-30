// app/api/forgot-password/route.ts
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { createForgotPasswordToken } from "@/database/tokents";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Itt ellenőrizd, hogy létezik-e a felhasználó az adott emaillel
  // ...

  // Generálj egy token-t
  const token = uuidv4();
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); // Például 1 órás érvényesség

  // Tárold a token-t az adatbázisban
  await createForgotPasswordToken(email, token, expiration);

  // Küldd el a visszaállító linket az emailben
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const htmlContent = `
    <p>Kedves Felhasználó!</p>
    <p>Kattints az alábbi linkre a jelszavad visszaállításához:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>A link 1 órán belül érvényes.</p>
  `;

  try {
    await sendMail(email, "Jelszó visszaállítás", htmlContent);
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 },
    );
  }
}
