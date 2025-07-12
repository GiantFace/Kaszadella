"use client";

import { useState } from "react";

export default function TipForm({
  currentPackage,
  currentDay,
  onSuccess,
}: {
  currentPackage: string;
  currentDay: string;
  onSuccess: () => void;
}) {
  const [tip, setTip] = useState("");
  const [odds, setOdds] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/add-tip", {
      method: "POST",
      body: JSON.stringify({
        package: currentPackage,
        day: currentDay,
        tip,
        oddsSummary: odds || null,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setTip("");
      setOdds("");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto">
      <input
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        placeholder="Tipp szövege"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        value={odds}
        onChange={(e) => setOdds(e.target.value)}
        placeholder="Össz. odds (opcionális)"
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Tipp hozzáadása
      </button>
    </form>
  );
}
