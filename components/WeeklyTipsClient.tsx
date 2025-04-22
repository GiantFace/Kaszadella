// components/WeeklyTipsClient.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import TicketSlip from "@/components/TicketSlip";

interface Tip {
  tip_name: string;
  odds_value: string;
  tip_description: string;
}

interface Slip {
  packageType: string;
  slip_name: string;
  combination: string;
  sum_odds: string;
  date: string;
  tips: Tip[];
}

type GroupedByDay = Record<string, Slip[]>;

interface RawTip {
  date: string;
  day_name: string;
  slip_name: string;
  combination: string;
  sum_odds: string;
  tip_name: string;
  odds_value: string;
  tip_description: string;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ddRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // csak egyszer fusson le a slideDown animáció sessionStorage alapján
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("headerAnimated")) {
      setAnimateHeader(true);
      sessionStorage.setItem("headerAnimated", "1");
    }
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  // fetch data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/ticket-tips");
        if (!res.ok) throw new Error("Nem sikerült lekérni az adatokat");
        const data: RawTip[] = await res.json();

        const grouped: Record<string, Record<string, RawTip[]>> = {};
        data.forEach((row) => {
          grouped[row.day_name] ??= {};
          (grouped[row.day_name][row.slip_name] ??= []).push(row);
        });

        const transformed: GroupedByDay = {};
        for (const [day, slipsMap] of Object.entries(grouped)) {
          transformed[day] = Object.values(slipsMap).map((rows) => {
            const first = rows[0];
            return {
              packageType: first.package,
              slip_name: first.slip_name,
              combination: first.combination,
              sum_odds: first.sum_odds,
              date: first.date,
              tips: rows.map((r) => ({
                tip_name: r.tip_name,
                odds_value: r.odds_value,
                tip_description: r.tip_description,
              })),
            };
          });
        }

        setWeeklyTips(transformed);
        const today = new Date().toLocaleDateString("hu-HU", {
          weekday: "long",
        });
        setSelectedDay(
          transformed[today] ? today : Object.keys(transformed)[0] || "",
        );
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Adatok betöltése…</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Hiba: {error}</p>;

  const days = Object.keys(weeklyTips);
  const slips = weeklyTips[selectedDay] || [];

  return (
    <div className="relative">
      {/* blur overlay when dropdown open */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-10"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* header-glass + animate */}
      <div
        className={`header-glass max-w-7xl mx-auto px-6 py-10 relative z-20
                    ${animateHeader ? "animate" : ""}`}
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white">
          Heti tippek a{" "}
          <span className="text-yellow-400">
            {packageNames[activePackageId]}
          </span>{" "}
          kaszásainak
        </h2>

        {/* dropdown */}
        <div ref={ddRef} className="relative inline-block mb-6 w-56 text-white">
          <p className="ml-2">Válassz napot</p>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="header-button bg-white text-black"
          >
            {selectedDay}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-20 mt-2 w-full bg-primary-turquoise rounded-lg shadow-lg max-h-60 overflow-auto">
              <style
                dangerouslySetInnerHTML={{
                  __html: `ul::-webkit-scrollbar { display: none; }`,
                }}
              />
              {days.map((day) => {
                const date = weeklyTips[day]?.[0]?.date;
                return (
                  <li
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setDropdownOpen(false);
                    }}
                    className="group relative cursor-pointer px-4 py-2 text-center text-white hover:text-black hover:bg-white"
                  >
                    {day}
                    {date && (
                      <div
                        className="absolute left-full top-1/2 ml-3 -translate-y-1/2
                bg-white bg-opacity-90 backdrop-blur-sm text-white text-sm
                 px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100
                 transition-opacity duration-200 whitespace-nowrap
                 z-30"
                      >
                        {date}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* alatta dátum */}
        <div className="text-left text-gray-600 mb-10">
          Dátum:{" "}
          <span className="font-semibold text-yellow-400">
            {slips[0]?.date}
          </span>
        </div>

        {/* tippek */}
        {slips.map((slip, idx) => (
          <div key={idx} className="mb-10 overflow-x-auto">
            <TicketSlip {...slip} />
          </div>
        ))}
      </div>
    </div>
  );
}
