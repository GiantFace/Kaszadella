import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <p>sidebar</p>
      <div className="admin-container">
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};
export default Layout;
