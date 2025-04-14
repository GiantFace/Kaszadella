// components/WeeklyTipsClient.tsx
"use client";

import React, { useState } from "react";
import { TipItemData } from "@/constans/Index";

interface WeeklyTipsClientProps {
  activePackageId: number;
  packageNames: Record<number, string>;
  // Napokra bontva: kulcs = nap (pl. "Vasárnap"), érték = tippek tömbje
  weeklyTips: Record<string, TipItemData[]>;
}

/**
 * Segédfüggvény: A nap tippeit szelvényekre bontja.
 * Új szelvényt hoz létre, amikor talál egy separator ("------------------------") elemet.
 */
function groupTipsIntoSlips(tips: TipItemData[]): TipItemData[][] {
  const slips: TipItemData[][] = [];
  let currentSlip: TipItemData[] = [];

  tips.forEach((tip) => {
    if (tip.title.trim() === "------------------------") {
      if (currentSlip.length > 0) {
        slips.push(currentSlip);
        currentSlip = [];
      }
    } else {
      currentSlip.push(tip);
    }
  });
  if (currentSlip.length > 0) {
    slips.push(currentSlip);
  }
  return slips;
}

/**
 * TicketSlip komponens – egy adott szelvényt jelenít meg mátrix (táblázat) formában.
 * A táblázat első sora speciális:
 * - Az első cella üres.
 * - A második cellában a szelvény első elemének leírása jelenik meg,
 *   alatta pedig a "{title} kötésben kell megtenni" információ.
 * - A harmadik cellában az egész szelvény aggregált odds értéke (szorzó) látható.
 * A további sorokban a szelvény tippei jelennek meg soronként.
 * Az oszlopok fix, azonos szélességűek.
 */
interface TicketSlipProps {
  slip: TipItemData[];
}
function TicketSlip({ slip }: TicketSlipProps) {
  if (slip.length === 0) return null;

  const labelTip = slip[0];
  const remainingTips = slip.slice(1);

  const aggregatedOdds = slip.reduce((acc, tip) => {
    const oddsValue = parseFloat(tip.odds ?? "");
    if (!Number.isNaN(oddsValue) && oddsValue > 0) {
      return acc * oddsValue;
    }
    return acc;
  }, 1);

  return (
    <table className="min-w-full table-fixed border-collapse mb-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1 w-1/3">Tipp neve</th>
          <th className="border px-2 py-1 w-1/3">Leírás</th>
          <th className="border px-2 py-1 w-1/3">Odds</th>
        </tr>
      </thead>
      <tbody>
        {/* Speciális összegző sor */}
        <tr className="border-b text-center">
          <td className="border px-2 py-1 w-1/5"></td>
          <td className="border px-2 py-1 w-1/3">
            {labelTip.tip}
            <div className="text-sm text-gray-600">
              {labelTip.title} Kötésben kell megtenni
            </div>
          </td>
          <td className="border px-2 py-1 w-1/3">
            {aggregatedOdds.toFixed(2)}
          </td>
        </tr>
        {/* A maradék tippek soronként */}
        {remainingTips.map((tip, index) => (
          <tr key={index} className="border-t text-center">
            <td className="border px-2 py-1 w-1/5 font-bold text-black">
              {tip.title}
            </td>
            <td className="border px-2 py-1 w-1/2">{tip.tip}</td>
            <td className="border px-2 py-1 w-1/3">
              {tip.odds && tip.odds.trim() !== "" ? tip.odds : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * DayCard komponens – egy adott nap tippeit kezeli.
 * A tippeket a groupTipsIntoSlips segítségével szelvényekre bontja,
 * majd minden szelvényt a TicketSlip komponens segítségével mátrixként jelenít meg.
 */
function DayCard({ day, tips }: { day: string; tips: TipItemData[] }) {
  const slips = groupTipsIntoSlips(tips);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4">{day}</h3>
      {slips.map((slip, index) => (
        <TicketSlip key={index} slip={slip} />
      ))}
    </div>
  );
}

/**
 * WeeklyTipsClient komponens – az oldalon mindig csak egy nap tippeit jeleníti meg,
 * melyet a legördülő lista alapján lehet választani.
 * Alapértelmezetten a rendszer aktuális napja kerül kijelölésre (ha elérhető).
 */
export default function WeeklyTipsClient({
  activePackageId,
  packageNames,
  weeklyTips,
}: WeeklyTipsClientProps) {
  const days = Object.keys(weeklyTips);

  // Leképezzük a JavaScript getDay() által adott számot a magyar napnevekre.
  const dayMap = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
  ];
  const today = new Date().getDay();
  const currentDay = dayMap[today];
  const defaultDay = days.includes(currentDay) ? currentDay : days[0];

  const [selectedDay, setSelectedDay] = useState<string>(defaultDay);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Heti tippek a {packageNames[activePackageId]} csomaghoz
      </h2>
      {/* Legördülő lista a napok kiválasztásához */}
      <div className="mb-6">
        <label htmlFor="daySelect" className="mr-2 font-medium">
          Válassz napot:
        </label>
        <select
          id="daySelect"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <DayCard day={selectedDay} tips={weeklyTips[selectedDay]} />
    </div>
  );
}
