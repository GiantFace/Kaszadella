"use server";

import { db } from "@/database/drizzle";
import { users, forgotPasswordTokens } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { sendMail } from "@/lib/sendMail";
import { randomUUID } from "crypto";
import { date, timestamp } from "drizzle-orm/pg-core";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Nem megfelelő felhasználónév vagy jelszó",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, nickname } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 48);

  if (!success) return redirect("/too-fast");
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser.length > 0) {
    return { success: false, error: "A felhasználó már regisztrált" };
  }

  const hashedPassword = await hash(password, 10);
  const verificationToken = randomUUID();

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      package: "Default",
    });

    await db.insert(forgotPasswordTokens).values({
      email,
      token: verificationToken,
      expiresAt: expiration,
      createdAt: new Date(),
    });

    // 🔥 Itt küldjük el az emailt a sikeres regisztráció után
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    await sendMail(
      email,
      "Üdv Kaszadella világában!",
      `
  <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
    <h2 style="color:#0EA5C4;">Üdvözlünk a Kaszadella világában!</h2>
    <h2>Kérjük, erősítsd meg az email címed!</h2>
  <p>Kattints az alábbi linkre, hogy aktiváld a fiókodat:</p>
  <a href="${verifyUrl}" style="padding: 10px 15px; background: #0EA5C4; color: white; text-decoration: none;">Email megerősítése</a>
  <p>Ha nem te regisztráltál, kérjük hagyd figyelmen kívül ezt az üzenetet.</p>
  \`,
    <p>
      Ahol az álmok találkoznak a valósággal, és a kaszád nem a fűre, hanem a nyereményekre sújt le!<br/>
      Öröm látni, hogy te is csatlakoztál a <strong>Kaszadella</strong> közösséghez – a <em>bajnokok brigádjához</em>, ahol nap mint nap együtt haladunk a siker felé.
    </p>
    
    <p>
      <strong>Mit kaphatsz mostantól?</strong><br/>
      ✅ Duplázó tippek, hogy stabilan építsd az alapokat<br/>
      ✅ Közepes és nagy oddsok, hogy megéld az izgalmakat<br/>
      ✅ Hétvégi extra mixek, hogy igazán nagyot kaszálj<br/>
    </p>

    <p style="margin-top:20px;">
      Kaszadella története most veled folytatódik! Fogd meg a kaszát, vedd kezedbe a sorsod – és indulhat az aratás!<br/>
      <strong>“Célozd meg a holdat, és a csillagok közé esel!”</strong>
    </p>

    <hr style="margin: 30px 0;" />

    <p style="font-size: 14px; color: #555;">
      Ha bármilyen kérdésed van, írj nekünk bátran: <a href="mailto:info@kaszadella.com">info@kaszadella.com</a><br/>
      Üdvözlettel,<br/>
      A Kaszadella csapata 🌾
    </p>
  </div>
  `,
    );

    //await signInCredentials({ email, password });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Regisztrációs hiba" };
  }
};
