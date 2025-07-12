import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendMail } from "@/lib/sendMail"; // ✅ ez a tiéd

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, message, selectedTarget, customEmails } = body;

    let targetEmails: string[] = [];

    if (selectedTarget === "custom") {
      targetEmails = (customEmails || []).map((e: string) =>
        e.trim().toLowerCase(),
      );
    } else if (selectedTarget === "all") {
      const result = await db.select({ email: users.email }).from(users);
      targetEmails = result.map((u: { email: string }) => u.email);
    } else {
      // Feltételezzük, hogy selectedTarget egy konkrét e-mail cím
      targetEmails = [selectedTarget.toLowerCase()];
    }

    for (const email of targetEmails) {
      await sendMail(email, subject, message);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Email küldési hiba:", err.message);
    return NextResponse.json(
      { error: "Email küldése sikertelen" },
      { status: 500 },
    );
  }
}
