// @/database/tokens.ts
import { db } from "@/database/drizzle";
import { forgotPasswordTokens } from "@/database/schema";

export async function createForgotPasswordToken(
  email: string,
  token: string,
  expiresAt: Date,
) {
  await db.insert(forgotPasswordTokens).values({
    email,
    token,
    expiresAt,
  });
}
