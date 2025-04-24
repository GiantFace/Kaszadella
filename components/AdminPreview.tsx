"use client";

import React, { useState, useEffect } from "react";

export interface TipListItem {
  id?: string;
  date: string;
  dayName: string;
  subscription: string;
  package: string;
  tipName: string;
  tipDescription: string;
  oddsValue: string;
  slip_name: string;
}

export default function AdminPreview() {
  const [tips, setTips] = useState<TipListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [edited, setEdited] = useState<Record<string, TipListItem[]>>({});
  const [slipRenames, setSlipRenames] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/ticket-tips")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: TipListItem[] = data.map((item) => ({
          id: item.id,
          date: item.date,
          dayName: item.day_name,
          subscription: item.subscription,
          package: item.package,
          slip_name: item.slip_name,
          tipName: item.tip_name,
          tipDescription: item.tip_description,
          oddsValue: item.odds_value,
        }));

        setTips(mapped);

        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const [y, m, d] = todayStr.split("-");
        setSelectedYear(y);
        setSelectedMonth(m);
        setSelectedDay(d);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const groupedByDate = tips.reduce<Record<string, TipListItem[]>>(
    (acc, tip) => {
      acc[tip.date] = acc[tip.date] || [];
      acc[tip.date].push(tip);
      return acc;
    },
    {},
  );

  const availableDates = Object.keys(groupedByDate);
  const availableYears = Array.from(
    new Set(availableDates.map((d) => d.split("-")[0])),
  );
  const availableMonths = Array.from(
    new Set(
      availableDates
        .filter((d) => d.startsWith(selectedYear))
        .map((d) => d.split("-")[1]),
    ),
  );
  const availableDays = Array.from(
    new Set(
      availableDates
        .filter((d) => d.startsWith(`${selectedYear}-${selectedMonth}`))
        .map((d) => d.split("-")[2]),
    ),
  );

  const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
  const filteredTips = tips.filter((t) => t.date === selectedDate);

  const groupedBySlip: Record<string, TipListItem[]> = {};
  filteredTips.forEach((tip) => {
    if (!groupedBySlip[tip.slip_name]) groupedBySlip[tip.slip_name] = [];
    groupedBySlip[tip.slip_name].push(tip);
  });

  const handleInputChange = (
    slip: string,
    index: number,
    field: keyof TipListItem,
    value: string,
  ) => {
    setEdited((prev) => {
      const newEdit = [...(prev[slip] || groupedBySlip[slip])];
      newEdit[index] = { ...newEdit[index], [field]: value };
      return { ...prev, [slip]: newEdit };
    });
  };

  const handleSlipRename = (oldName: string, newName: string) => {
    setSlipRenames((prev) => ({ ...prev, [oldName]: newName }));
    setEdited((prev) => {
      const current = prev[oldName] || groupedBySlip[oldName];
      const updated = current.map((tip) => ({ ...tip, slip_name: newName }));
      const { [oldName]: _, ...rest } = prev;
      return { ...rest, [newName]: updated };
    });
  };

  const handleDelete = async (slip: string, index: number) => {
    const tip = (edited[slip] || groupedBySlip[slip])[index];
    if (!tip?.id) return;

    try {
      const res = await fetch(`/api/admin/ticket-tips/${tip.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Sikertelen törlés");
      alert("Törölve");
      setEdited((prev) => {
        const newEdit = [...(prev[slip] || groupedBySlip[slip])];
        newEdit.splice(index, 1);
        return { ...prev, [slip]: newEdit };
      });
    } catch (err) {
      alert("Hiba törlés közben");
    }
  };

  const handleSave = async (slip: string) => {
    const payload = edited[slipRenames[slip] || slip];
    if (!payload) return;
    try {
      const res = await fetch("/api/admin/ticket-tips", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tips: payload }),
      });
      if (!res.ok) throw new Error("Sikertelen mentés");
      alert("Sikeres mentés");
    } catch (err) {
      alert("Hiba mentés közben");
    }
  };

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
    <div className="px-4 sm:px-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Előnézet</h2>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mr-2 font-semibold text-black">Év:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold text-black">Hónap:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold text-black">Nap:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {availableDays.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Object.entries(groupedBySlip).map(([slipName, slipTips]) => (
        <div key={slipName} className="mb-10">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-black font-semibold">Szelvény neve:</span>
            <input
              value={slipRenames[slipName] || slipName}
              onChange={(e) => handleSlipRename(slipName, e.target.value)}
              className="border px-2 py-1 rounded text-black"
            />
          </div>
          <table className="min-w-full table-fixed border-collapse mb-4 shadow-md">
            <thead>
              <tr className="bg-black text-white">
                {[
                  "Dátum",
                  "Nap neve",
                  "Előfizetés neve",
                  "Csomag neve",
                  "Szelvény neve",
                  "Tipp neve",
                  "Tipp leírása",
                  "Odds értéke",
                  "",
                ].map((hdr) => (
                  <th key={hdr} className="border px-2 py-1 text-center">
                    {hdr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(edited[slipName] || slipTips).map((data, idx) => (
                <tr
                  key={idx}
                  className="border-t text-center bg-white hover:bg-gray-100"
                >
                  <td className="border px-2 py-1">
                    <input
                      value={data.date}
                      onChange={(e) =>
                        handleInputChange(slipName, idx, "date", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.dayName}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "dayName",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.subscription}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "subscription",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.package}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "package",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.slip_name}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "slip_name",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.tipName}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "tipName",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.tipDescription}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "tipDescription",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      value={data.oddsValue}
                      onChange={(e) =>
                        handleInputChange(
                          slipName,
                          idx,
                          "oddsValue",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(slipName, idx)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => handleSave(slipName)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Mentés
          </button>
        </div>
      ))}

      {filteredTips.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          Nincsenek tippek ehhez a naphoz.
        </div>
      )}
    </div>
  );
}
