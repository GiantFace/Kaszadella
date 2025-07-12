// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export async function GET() {
  try {
    const rows = await db
      .select({
        id: users.id, // u.id
        name: users.fullName, // u.name
        email: users.email, // u.email
        lastActivityDate: users.lastActivityDate, // IDE változtattuk
      })
      .from(users);

    // Ha Date objektum jön vissza, alakítsd stringre:
    const payload = rows.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      // ha van dátum, alakítsd stringgé, különben üres vagy 'N/A'
      lastActivity: u.lastActivityDate
        ? u.lastActivityDate
        : "nem elérhető adat",
    }));

    return NextResponse.json(payload);
  } catch (err: any) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { error: "Fetch failed", details: err.message },
      { status: 500 },
    );
  }
}
