import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { after } from "next/server";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });
  return (
    <div
      className="
      bg-primary-turquoise
        flex
        flex-col
        min-h-screen
        overflow-x-hidden
        justify-center
        max-w-70
      "
      style={{
        backgroundImage: "url('LandingPage.svg')",
        backgroundSize: "cover",
      }}
    >
      {/*<Header session={Session} />*/}
      <Header session={session} />

      {/* A tartalom, ahol a children komponensek megjelennek */}
      <main className="root-container flex-1 mt-0 relative w-full">
        {children}
      </main>

      {/* Lábléc (ha nincs szükség külön .footer-container osztályra, elhagyható) */}
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
