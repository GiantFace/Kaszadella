import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-container flex flex-col min-h-screen">
      {/* Központi tartalom (header + children) */}
      <div className="mx-auto w-full max-w-7xl">
        <Header />
        <main className="mt-20 pb-20">{children}</main>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
