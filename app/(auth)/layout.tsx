import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
          <div className="flex flex-row gap-3">
            <Image src="moneyBag.svg" alt="logo" width={50} height={50} />
            <h1 className="text-2xl font-semibold ">Kaszadella</h1>
          </div>

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
