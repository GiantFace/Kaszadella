"use client";

import { useState } from "react";

export default function AdminTipsList({
  tips,
  onUpdate,
}: {
  tips: any[];
  onUpdate: () => void;
}) {
  const [tipList, setTipList] = useState(tips);

  const deleteTip = async (id: string) => {
    const confirmed = confirm("Biztosan törlöd?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/delete-tip?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTipList((prev) => prev.filter((tip) => tip.id !== id));
      onUpdate(); // 🔥 Szülő újra lekéri a friss adatokat
    } else {
      alert("Hiba a törlés közben");
    }
  };

  return (
    <div className="space-y-4">
      {tipList.map((tip) => (
        <div
          key={tip.id}
          className="bg-white shadow border rounded p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">
              {tip.package} – {tip.day}
            </div>
            <div className="text-gray-700">{tip.tip}</div>
            {tip.oddsSummary && (
              <div className="text-sm text-gray-500">
                Össz. odds: {tip.oddsSummary}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert("Szerkesztés még nincs kész")}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Szerkesztés
            </button>
            <button
              onClick={() => deleteTip(tip.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Törlés
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
