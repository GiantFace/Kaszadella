// app/admin/tips/page.tsx
"use client";

import React, { useState } from "react";
import AdminTipsList from "@/components/AdminTips";
import AdminUsers from "@/components/AdminUsers";
import AdminEmailSender from "@/components/AdminEmailSender";
import AdminPreview from "@/components/AdminPreview";

export default function AdminTipsPage() {
  const [selectedTab, setSelectedTab] = useState<
    "tips" | "users" | "email" | "preview"
  >("tips");

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Admin Felület - Tipprendszer
      </h2>
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setSelectedTab("tips")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "tips"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Tippek listázása
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "users"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Felhasználók listázása
        </button>
        <button
          onClick={() => setSelectedTab("email")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "email"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Email küldése
        </button>
        <button
          onClick={() => setSelectedTab("preview")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "preview"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Előnézet
        </button>
      </div>
      {selectedTab === "tips" && <AdminTipsList />}
      {selectedTab === "users" && <AdminUsers />}
      {selectedTab === "email" && <AdminEmailSender />}
      {selectedTab === "preview" && <AdminPreview />}
    </div>
  );
}
