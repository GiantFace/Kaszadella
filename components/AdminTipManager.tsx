"use client";

import { useState } from "react";
import TipForm from "./TipForm";
import AdminTipList from "./AdminTipsList";

const csomagok = ["START", "KASZA", "KASZADELLA"] as const;
const napok = [
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
];

export default function AdminTipManager({
  initialTips,
}: {
  initialTips: any[];
}) {
  const [activePackage, setActivePackage] =
    useState<(typeof csomagok)[number]>("START");
  const [selectedDay, setSelectedDay] = useState("Hétfő");
  const [tips, setTips] = useState(initialTips);

  const filtered = tips.filter(
    (t) => t.package === activePackage && t.day === selectedDay,
  );

  const refresh = async () => {
    const res = await fetch("/api/admin/get-tips");
    const data = await res.json();
    setTips(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        {csomagok.map((pkg) => (
          <button
            key={pkg}
            onClick={() => setActivePackage(pkg)}
            className={`px-4 py-2 rounded font-bold ${
              activePackage === pkg ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {pkg}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {napok.map((nap) => (
          <button
            key={nap}
            onClick={() => setSelectedDay(nap)}
            className={`px-3 py-1 rounded ${
              selectedDay === nap ? "bg-yellow-500 text-white" : "bg-gray-100"
            }`}
          >
            {nap}
          </button>
        ))}
      </div>

      <TipForm
        currentPackage={activePackage}
        currentDay={selectedDay}
        onSuccess={refresh}
      />

      <AdminTipList tips={filtered} onUpdate={refresh} />
    </div>
  );
}
