"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminTipsList from "@/components/AdminTipsList";
import AdminAddTipForm from "@/components/AdminAddTipForm";

export default function AdminTipsPage() {
  const { data: session } = useSession();
  const [tips, setTips] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTips = async () => {
      const res = await fetch("/api/admin/all-tips");
      const data = await res.json();
      setTips(data);
    };
    fetchTips();
  }, [refresh]);

  if (!session || session.user.role === "ADMIN") {
    return (
      <div className="text-center mt-10 text-xl">
        Nincs jogosultságod az oldal megtekintéséhez.
        {session?.user?.email}
        {session?.user.role}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin tippkezelő felület
      </h1>

      <AdminAddTipForm onSuccess={() => setRefresh(!refresh)} />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Meglevő tippek</h2>
      <AdminTipsList tips={tips} onUpdate={() => setRefresh(!refresh)} />
    </div>
  );
}
