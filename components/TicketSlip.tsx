// components/TicketSlip.tsx
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
  packageType,
  tips,
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
      <h3 className="text-lg font-bold mb-2 text-left glass-shine">
        {packageType}
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full w-full table-fixed border-collapse mb-8">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              {/* First column: 2/6 of full width => w-2/6 */}
              <th className="border px-2 py-2 text-center w-2/6">Tipp neve</th>
              {/* Second column: 3/6 of full width => w-3/6 */}
              <th className="border px-2 py-2 text-center w-3/6">Leírás</th>
              {/* Third column: 1/6 of full width => w-1/6 */}
              <th className="border px-2 py-2 text-center w-1/6">Odds</th>
            </tr>
          </thead>
          <tbody>
            {/* Összegző sor */}
            <tr className="border-b">
              <td className="border px-2 py-3 w-2/6"></td>
              <td className="border px-2 py-3 text-center font-semibold w-3/6 text-gray-200">
                {combination}
                <div className="text-sm text-gray-600 mt-1">
                  Kötésben ajánlott megtenni
                </div>
              </td>
              <td className="border px-2 py-3 text-center font-semibold w-1/6 text-white">
                {sum_odds}
              </td>
            </tr>
            {/* Egyedi tippek */}
            {tips.map((t, i) => (
              <tr key={i} className="border-t text-center text-white">
                <td className="border px-2 py-2 font-bold w-2/6">
                  {t.tip_name}
                </td>
                <td className="border px-2 py-2 w-3/6">{t.tip_description}</td>
                <td className="border px-2 py-2 w-1/6">
                  {t.odds_value || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
