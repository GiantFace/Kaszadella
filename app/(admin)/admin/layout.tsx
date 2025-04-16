// app/admin/tips/layout.tsx
import React from "react";

export default function TipsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold text-yellow-500">Admin Felület</h1>
      </header>
      <main className="p-8">{children}</main>
    </div>
  );
}
