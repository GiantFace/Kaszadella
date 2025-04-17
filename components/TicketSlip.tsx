"use client";
import React from "react";

interface Tip {
  tip_name: string;
  tip_description: string;
  odds_value: string;
}

interface TicketSlipProps {
  slip_name: string;
  combination: string;
  sum_odds: string;
  packageType: string;
  tips: Tip[];
}

export default function TicketSlip({
  slip_name,
  combination,
  sum_odds,
  tips,
  packageType,
}: TicketSlipProps) {
  if (!tips || tips.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Nincs elérhető tipp ehhez a szelvényhez.
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold mb-2 text-left text-black">
        {packageType}
      </h3>
      <table className="min-w-full table-fixed border-collapse mb-8">
        <thead>
          <tr className="bg-blue-100 text-gray-800">
            <th className="border px-2 py-2 text-center">Tipp neve</th>
            <th className="border px-2 py-2 text-center">Leírás</th>
            <th className="border px-2 py-2 text-center">Odds</th>
          </tr>
        </thead>
        <tbody>
          {/* Összegző sor */}
          <tr className="border-b">
            <td className="border px-2 py-3"></td>
            <td className="border px-2 py-3 text-center font-semibold">
              {combination}
              <div className="text-sm text-gray-600 mt-1">
                Kötésben kell megtenni
              </div>
            </td>
            <td className="border px-2 py-3 text-center font-semibold">
              {sum_odds}
            </td>
          </tr>
          {/* Egyedi tippek */}
          {tips.map((t, i) => (
            <tr key={i} className="border-t text-center text-black">
              <td className="border px-2 py-2 font-bold">{t.tip_name}</td>
              <td className="border px-2 py-2">{t.tip_description}</td>
              <td className="border px-2 py-2">{t.odds_value || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
