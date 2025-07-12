// components/AdminTipsTabs.tsx
"use client";

import React, { useState } from "react";
import AdminTips from "./AdminTips";
import AdminUsers from "./AdminUsers";
import AdminEmailSender from "./AdminEmailSender";
import AdminPreview from "./AdminPreview";
import AdminCouponManager from "./AdminCouponManager";

export default function AdminTipsTabs() {
  const [selectedTab, setSelectedTab] = useState<
    "tips" | "users" | "email" | "preview" | "coupons"
  >("tips");

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Admin Felület
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
          Tippek
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "users"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Felhasználók
        </button>
        <button
          onClick={() => setSelectedTab("email")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "email"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setSelectedTab("coupons")}
          className={`px-4 py-2 border rounded ${
            selectedTab === "coupons"
              ? "bg-black text-yellow-500 border-yellow-500"
              : "bg-white text-black border-black"
          }`}
        >
          🎫 Kuponok
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

      {selectedTab === "tips" && <AdminTips />}
      {selectedTab === "users" && <AdminUsers />}
      {selectedTab === "email" && <AdminEmailSender />}
      {selectedTab === "coupons" && <AdminCouponManager />}
      {selectedTab === "preview" && <AdminPreview />}
    </div>
  );
}
