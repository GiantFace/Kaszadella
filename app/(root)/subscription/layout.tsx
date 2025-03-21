// app/subscription/layout.tsx
import React from "react";

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fejléc */}
      <header className="bg-primary text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Előfizetési lehetőségek</h1>
      </header>

      {/* Fő tartalom */}
      <main className="flex-grow p-6">{children}</main>

      {/* Lábléc */}
      <footer className="bg-gray-200 text-center py-4">
        © {new Date().getFullYear()} Kaszadella
      </footer>
    </div>
  );
}
