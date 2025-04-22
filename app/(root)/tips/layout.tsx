"use client";

import React from "react";

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fejléc */}
      <header className="bg-primary text-white py-4 px-6">
        <h2 className="text-2xl font-bold">Előfizetésedhez tartozó tippek</h2>
      </header>
      {/* Fő tartalom */}
      <main className="p-6 bg-black ">{children}</main>
      {/* Lábléc */}
      <footer className="bg-gray-200 text-center py-4">
        © {new Date().getFullYear()} Kaszadella
      </footer>
    </div>
  );
}
