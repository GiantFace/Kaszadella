import { NextResponse } from "next/server";
import { withRateLimit } from "@/lib/ratelimit";
// import redis from "@/database/redis"; ← TÖRLÉS

export async function POST(req: Request) {
  try {
    // Rate limiting ellenőrzés
    await withRateLimit(req, 5); // 5 kérés/perc
    
    // ... többi logika
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Too many requests" }, 
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal error" }, 
      { status: 500 }
    );
  }
} 