// components/AdminPreview.tsx
"use client";

import React, { useState } from "react";

export interface TipListItem {
  date: string; // például "2023-10-12"
  dayName: string; // például "Kedd"
  subscriptionName: string; // például "Prémium Előfizetés"
  packageName: string; // például "Kicsi tipp", "Közepes tipp", stb.
  tipName: string; // Tipp neve
  tipDescription: string; // Tipp leírása
  oddsValue: string; // például "1.50"
}

export default function AdminPreview() {
  // Dummy adatok; az adatbázisból származó adatok esetén ezek dinamikusan jönnének.
  const [tips] = useState<TipListItem[]>([
    {
      date: "2023-10-12",
      dayName: "Kedd",
      subscriptionName: "Prémium Előfizetés",
      packageName: "Kicsi tipp",
      tipName: "Tipp 1",
      tipDescription: "Ez az első tipp leírása",
      oddsValue: "1.50",
    },
    {
      date: "2023-10-12",
      dayName: "Kedd",
      subscriptionName: "Prémium Előfizetés",
      packageName: "Nagy tipp",
      tipName: "Tipp 2",
      tipDescription: "Ez a második tipp részletes leírása",
      oddsValue: "1.75",
    },
    // További tippek...
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Előnézet</h2>
      <table className="min-w-full table-fixed border-collapse mb-4">
        <thead>
          <tr className="bg-black text-white">
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Dátum
              <br />
              (Év,hónap,nap)
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Nap neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Előfizetés neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Csomag neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Tipp neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Tipp leírása
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "14.28%" }}
            >
              Odds értéke
            </th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip, index) => (
            <tr key={index} className="border-t text-center">
              <td className="border px-2 py-1 text-black">{tip.date}</td>
              <td className="border px-2 py-1 text-black">{tip.dayName}</td>
              <td className="border px-2 py-1 text-black">
                {tip.subscriptionName}
              </td>
              <td className="border px-2 py-1 text-black">{tip.packageName}</td>
              <td className="border px-2 py-1 text-black">{tip.tipName}</td>
              <td className="border px-2 py-1 text-black">
                {tip.tipDescription}
              </td>
              <td className="border px-2 py-1 text-black">{tip.oddsValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
