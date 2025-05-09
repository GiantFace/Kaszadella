import React, { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main
      className="auth-container"
      style={{
        backgroundImage: "url('/LandingPage.svg')",
        backgroundSize: "cover",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="auth-form">
        <div className="auth-box">
          <Link href="/">
            <div className="flex flex-row gap-3 text-center justify-center">
              <Image
                src="/images/kasza.png"
                alt="logo"
                width={50}
                height={50}
              />
              <h1 className="text-4xl font-semibold text-center">Kaszadella</h1>
              <Image
                src="/images/kasza.png"
                alt="Kaszadella kasza"
                width={50}
                height={50}
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </Link>

          <div>{children}</div>
        </div>
        <section className="hidden md:block w-1/2">
          <Image
            src="/images/Kaszadella_halal_kaszadella_pack2.png"
            alt="Kaszadella"
            height={1000}
            width={1000}
            className="size-full object-cover"
          />
        </section>
      </section>
    </main>
  );
};

export default Layout;
