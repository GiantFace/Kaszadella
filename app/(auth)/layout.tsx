import React, { ReactNode } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row w-23">
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section>
        <Image
          src="/images/Kaszadella_halal_casa_pack.png"
          alt="illustration"
          width={500}
          height={500}
        />
      </section>
    </main>
  );
};
export default Layout;
