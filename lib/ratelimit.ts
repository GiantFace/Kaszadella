import { checkRateLimit } from "@/database/session";

export async function rateLimit(
  identifier: string, 
  action: string = "api", 
  limit: number = 10, 
  windowSeconds: number = 60
) {
  return await checkRateLimit(identifier, action, limit, windowSeconds);
}

// Használat API route-okban:
export async function withRateLimit(req: Request, limit: number = 10) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const allowed = await rateLimit(ip, "api-call", limit, 60);
  
  if (!allowed) {
    throw new Error("Rate limit exceeded");
  }
}

// ✅ Default export hozzáadása
export default rateLimit;
