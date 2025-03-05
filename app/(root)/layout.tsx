import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <div className="root-container flex flex-col min-h-screen">
      {/* Központi tartalom (header + children) */}
      <div className="mx-auto w-full max-w-7xl">
        <Header session={session} />
        <main className="mt-20 pb-20">{children}</main>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
