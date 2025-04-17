// app/admin/tips/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminTips from "@/components/AdminTips";
import AdminTipsTabs from "@/components/AdminTipsTabs";
import Header from "@/components/Header";
export default async function AdminTipsPage() {
  // 1) Szerver‐oldali védelem
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // 2) Ha admin, egyszerűen rendereljük a kliens‐komponenst
  return (
    <>
      <AdminTipsTabs />
    </>
  );
}
