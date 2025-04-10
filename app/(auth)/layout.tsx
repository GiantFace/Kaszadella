import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Kaszadella</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="">
        <Image
          src="/images/Kaszadella_halal_kaszadella_pack.png"
          alt="Kaszadella"
          height={500}
          width={500}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Layout;
