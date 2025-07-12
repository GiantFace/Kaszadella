// app/api/contact/action.ts
import { sendMail } from "@/lib/sendMail"; // a helyes elérési út
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, name, email, message } = await req.json();

  const htmlContent = `
    <p><strong>ID:</strong> ${userId}</p>
    <p><strong>Név:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Üzenet:</strong><br/>${message}</p>
  `;

  try {
    await sendMail(
      "info@kaszadella.com",
      "Kapcsolatfelvétel az oldalról",
      htmlContent,
    );
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending mail:", error);
    return NextResponse.json({ error: "Hiba történt" }, { status: 500 });
  }
}
