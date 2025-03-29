"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { sendMail } from "@/lib/sendMail";

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

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      package: "Default",
    });

    // 🔥 Itt küldjük el az emailt a sikeres regisztráció után
    await sendMail(
      email,
      "Üdv Kaszadella világában!",
      `
  <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
    <h2 style="color:#0EA5C4;">Üdvözlünk a Kaszadella világában!</h2>
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
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
