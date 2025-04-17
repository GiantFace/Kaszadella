"use client";

import React, { useEffect, useState } from "react";
import TicketSlip from "@/components/TicketSlip";

interface Tip {
  tip_name: string;
  odds_value: string;
  tip_description: string;
}

interface Slip {
  packageType: string;
  package: string;
  slip_name: string;
  combination: string;
  sum_odds: string;
  tips: Tip[];
}

type GroupedByDay = Record<string, Slip[]>;

interface RawTip {
  tip_description: string; // <-- EZT HASZNÁLD!
  slip_name: string;
  combination: string;
  sum_odds: string;
  tip_name: string;
  odds_value: string;
  day_name: string;
  package: string;
}

interface WeeklyTipsClientProps {
  activePackageId: number;
  packageNames: Record<number, string>;
}

export default function WeeklyTipsClient({
  activePackageId,
  packageNames,
}: WeeklyTipsClientProps) {
  const [weeklyTips, setWeeklyTips] = useState<GroupedByDay>({});
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchTips() {
      try {
        const res = await fetch("/api/admin/ticket-tips");
        if (!res.ok) throw new Error("Nem sikerült lekérni az adatokat");
        const data: RawTip[] = await res.json();

        const groupedByDay: Record<string, Record<string, RawTip[]>> = {};

        // Csoportosítás nap és szelvény szerint
        for (const item of data) {
          const day = item.day_name;
          const slip = item.slip_name;

          if (!groupedByDay[day]) groupedByDay[day] = {};
          if (!groupedByDay[day][slip]) groupedByDay[day][slip] = [];

          groupedByDay[day][slip].push(item);
        }

        // Transzformálás a TicketSlip formátumra
        const finalStructure: GroupedByDay = {};
        for (const day of Object.keys(groupedByDay)) {
          finalStructure[day] = Object.values(groupedByDay[day]).map(
            (slipRows) => {
              const first = slipRows[0];
              return {
                slip_name: first.slip_name,
                combination: first.combination,
                sum_odds: first.sum_odds,
                packageType: first.package,

                tips: slipRows.map((row) => ({
                  tip_name: row.tip_name,
                  odds_value: row.odds_value,
                  tip_description: row.tip_description,
                })),
              };
            },
          );
        }

        setWeeklyTips(finalStructure);

        const todayName = new Date().toLocaleDateString("hu-HU", {
          weekday: "long",
        });
        setSelectedDay(
          finalStructure[todayName]
            ? todayName
            : Object.keys(finalStructure)[0] || "",
        );
      } catch (err: any) {
        console.error("Hiba:", err);
        setError(err.message || "Ismeretlen hiba");
      } finally {
        setLoading(false);
      }
    }

    fetchTips();
  }, []);

  if (loading) return <p className="text-center mt-10">Adatok betöltése...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Hiba: {error}</p>;

  const days = Object.keys(weeklyTips);
  const slips = weeklyTips[selectedDay] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Heti tippek a {packageNames[activePackageId]}hoz
      </h2>

      <div className="mb-6">
        <label htmlFor="daySelect" className="mr-2 font-bold">
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

      {slips.length === 0 ? (
        <p className="text-center text-gray-600">
          Nincs elérhető tipp erre a napra.
        </p>
      ) : (
        slips.map((slip, index) => (
          <TicketSlip
            key={index}
            slip_name={slip.slip_name}
            combination={slip.combination}
            sum_odds={slip.sum_odds}
            tips={slip.tips}
            packageType={slip.packageType}
          />
        ))
      )}
    </div>
  );
}
