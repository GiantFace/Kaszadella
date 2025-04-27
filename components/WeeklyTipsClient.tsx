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
  subscription: string;
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/ticket-tips");
        if (!res.ok) throw new Error("Nem sikerült lekérni az adatokat");
        const data: RawTip[] = await res.json();

        // a mai dátum és a hétfő-vasárnap határok
        const today = new Date();
        const dayIdx = today.getDay(); // 0=vasárnap,1=hétfő...
        const diffToMon = (dayIdx + 6) % 7; // hétfő legyen 0
        const monday = new Date(today);
        monday.setDate(today.getDate() - diffToMon);
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        const normalize = (str: string) =>
          str
            .normalize("NFD")
            .replace(/\s+/g, "")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        const currentPackage = normalize(packageNames[activePackageId]);

        // először csomag szerint, aztán dátum szerint szűrés a héten belül
        const filtered = data.filter((r) => {
          if (normalize(r.subscription) !== currentPackage) return false;
          const d = new Date(r.date);
          return d >= monday && d <= sunday;
        });

        const grouped: Record<string, Record<string, RawTip[]>> = {};
        filtered.forEach((r) => {
          grouped[r.day_name] ??= {};
          grouped[r.day_name][r.slip_name] ??= [];
          grouped[r.day_name][r.slip_name].push(r);
        });

        const transformed: GroupedByDay = {};
        Object.entries(grouped).forEach(([day, slips]) => {
          transformed[day] = Object.values(slips).map((rows) => {
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
        });

        setWeeklyTips(transformed);

        const todayName = today.toLocaleDateString("hu-HU", {
          weekday: "long",
        });
        const matched = Object.keys(transformed).find(
          (d) => normalize(d) === normalize(todayName),
        );
        setSelectedDay(matched || Object.keys(transformed)[0] || "");
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [activePackageId, packageNames]);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Adatok betöltése…</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Hiba: {error}</p>;

  const order = [
    "hétfő",
    "kedd",
    "szerda",
    "csütörtök",
    "péntek",
    "szombat",
    "vasárnap",
  ];
  const daysUnsorted = Object.keys(weeklyTips);
  const days = order
    .map((w) => daysUnsorted.find((d) => d.toLowerCase() === w))
    .filter((d): d is string => Boolean(d));

  const slips = weeklyTips[selectedDay] || [];

  return (
    <div className="relative">
      {dropdownOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-10 flex flxe-col md:flex-row list-none"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      <div className="header-glass max-w-7xl mx-auto px-6 py-10 relative z-20">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white">
          Heti tippek a{" "}
          <span className="text-yellow-400">
            {packageNames[activePackageId]}
          </span>{" "}
          csomaghoz
        </h2>
        <div className="text-sm text-gray-600 mt-1 text-center">
          Az oddsok a feltöltés pillanatában értendőek
        </div>

        <div ref={ddRef} className="relative inline-block mb-6 text-white">
          <p className="ml-2">Válassz napot</p>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="header-button bg-white text-black w-30 text-left px-2  text-center"
          >
            {selectedDay || "Hamarosan"}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-20 mt-2 w-full bg-primary-turquoise rounded-lg shadow-lg w-50 overflow-auto">
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
                      <div className="absolute left-full top-1/2 ml-3 -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-sm text-black text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                        {date}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="text-left text-gray-600 mb-10">
          Dátum:{" "}
          <span className="font-semibold text-yellow-400">
            {slips[0]?.date ||
              "Nincs aktuális tipp még erre a napra. Hamarosan fent leszek a nyerő szelvények ;)"}
          </span>
        </div>

        {slips.map((slip, idx) => (
          <div key={idx} className="mb-10 overflow-x-auto">
            <TicketSlip {...slip} />
          </div>
        ))}
      </div>
    </div>
  );
}
