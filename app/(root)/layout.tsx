import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

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
