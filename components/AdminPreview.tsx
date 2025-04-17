"use client";

import React, { useState, useEffect } from "react";

export interface TipListItem {
  date: string; // "2023-10-12"
  dayName: string; // "Kedd"
  subscription: string; // "Start csomag"
  packageName: string; // "Kicsi tipp"
  tipName: string; // Tipp neve
  tipDescription: string; // Tipp leírása
  oddsValue: string; // "1.50"
}

export default function AdminPreview() {
  const [tips, setTips] = useState<TipListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/ticket-tips")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data: TipListItem[]) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Preview fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Betöltés...</div>;
  }
  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        Hiba a betöltés során: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Előnézet</h2>
      <table className="min-w-full table-fixed border-collapse mb-4">
        <thead>
          <tr className="bg-black text-white">
            {[
              "Dátum",
              "Nap neve",
              "Előfizetés neve",
              "Csomag neve",
              "Tipp neve",
              "Tipp leírása",
              "Odds értéke",
            ].map((hdr) => (
              <th
                key={hdr}
                className="border px-2 py-1 text-center"
                style={{ width: `${100 / 7}%` }}
              >
                {hdr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tips.map((tip, idx) => (
            <tr key={idx} className="border-t text-center">
              <td className="border px-2 py-1 text-black">{tip.date}</td>
              <td className="border px-2 py-1 text-black">{tip.dayName}</td>
              <td className="border px-2 py-1 text-black">
                {tip.subscription}
              </td>
              <td className="border px-2 py-1 text-black">{tip.packageName}</td>
              <td className="border px-2 py-1 text-black">{tip.tipName}</td>
              <td className="border px-2 py-1 text-black">
                {tip.tipDescription}
              </td>
              <td className="border px-2 py-1 text-black">{tip.oddsValue}</td>
            </tr>
          ))}
          {tips.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="border px-2 py-4 text-center text-gray-500"
              >
                Nincsenek tippek az adatbázisban.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
