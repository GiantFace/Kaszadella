// components/AdminTipsList.tsx
"use client";

import React, { useState } from "react";

// TicketSlipTip – egy ticket szelvényhez tartozó tét adatai
export interface TicketSlipTip {
  tipName: string;
  tipDescription: string;
  oddsValue: string; // elvárt formátum: X.XX (például "1.50")
}

// TicketSlip – a ticket szelvény adatai
export interface TicketSlip {
  id: string;
  ticketName: string; // Automatikusan generált név: évhónapnap_Előfizetés rövidítése_Csomag rövidítése_Kötéstípusa_szelvénySzáma
  date: string; // "YYYY-MM-DD" formátum
  dayName: string; // Például "Hétfő"
  subscriptionName: string; // "Start csomag", "Kasza csomag", "Kaszadella csomag"
  packageName: string; // "Kicsi tipp", "Közepes tipp", "Nagy tipp", "duplázó"
  combinationType: string; // Például "3-as kötés" (ebből kinyerjük a számot)
  sumOdds: string; // Összesített odds érték – kiszámolt vagy manuálisan szerkesztett
  tips: TicketSlipTip[]; // A ticket szelvényhez tartozó tétek
}

const dayNames = [
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
];

function getCurrentWeekDates(): { date: string; dayName: string }[] {
  const today = new Date();
  const jsDay = today.getDay(); // 0 = Vasárnap, 1 = Hétfő, ...
  const diffToMonday = jsDay === 0 ? 6 : jsDay - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");
    weekDates.push({ date: `${year}-${month}-${day}`, dayName: dayNames[i] });
  }
  return weekDates;
}

// Lehetséges opciók
const subscriptionOptions = [
  "Start csomag",
  "Kasza csomag",
  "Kaszadella csomag",
];
const packageOptions = [
  "Közepes tipp",
  "Nagy tipp",
  "Duplázó",
  "Extra hétvégi",
];
const combinationOptions = [
  "2-es kötés",
  "3-as kötés",
  "4-es kötés",
  "9-es kötés",
  "Egyéni",
];

const oddsPattern = /^\d+\.\d{2}$/;

/**
 * generateTicketName
 * Új ticket név generálása a következő formátumban:
 * <YYYYMMDD>_<Előfizetés rövidítése>_<Csomag rövidítése>_<Kötéstípusa száma>_<Szelvény száma>
 * Például: "20231016_St_Kic_3_1"
 */
function generateTicketName(
  ticket: Partial<TicketSlip>,
  existingTickets: TicketSlip[],
): string {
  const dateStr = ticket.date ? ticket.date.replace(/-/g, "") : "";
  const subscriptionAbbrMap: Record<string, string> = {
    "Start csomag": "St",
    "Kasza csomag": "Kas",
    "Kaszadella csomag": "Kdl",
  };
  const subAbbr =
    ticket.subscriptionName && subscriptionAbbrMap[ticket.subscriptionName]
      ? subscriptionAbbrMap[ticket.subscriptionName]
      : ticket.subscriptionName
        ? ticket.subscriptionName.substring(0, 3)
        : "";
  const packageAbbrMap: Record<string, string> = {
    Extás: "Ext",
    "Közepes tipp": "Köz",
    "Nagy tipp": "Nag",
    Duplázó: "Dup",
  };
  const pkgAbbr =
    ticket.packageName && packageAbbrMap[ticket.packageName]
      ? packageAbbrMap[ticket.packageName]
      : ticket.packageName
        ? ticket.packageName.substring(0, 3)
        : "";

  let betTypeNumber = "";
  if (ticket.combinationType) {
    const match = ticket.combinationType.match(/(\d+)/);
    betTypeNumber = match ? match[1] : ticket.combinationType.trim();
  }
  // Szelvény száma az adott nap ticket-jeinek száma + 1
  const ticketCount =
    existingTickets.filter((t) => t.date === ticket.date).length + 1;
  return `${dateStr}_${subAbbr}_${pkgAbbr}_${betTypeNumber}_${ticketCount}`;
}

function calculateSumOdds(tips: TicketSlipTip[]): string {
  if (tips.length === 0) return "";
  let product = 1;
  for (const tip of tips) {
    const val = parseFloat(tip.oddsValue);
    if (isNaN(val)) return "";
    product *= val;
  }
  return product.toFixed(2);
}

export default function AdminTipsList() {
  // Kezdeti dummy adatok
  const [ticketSlips, setTicketSlips] = useState<TicketSlip[]>([]);
  const [ticketCounter, setTicketCounter] = useState(1);

  const weekDates = getCurrentWeekDates();
  const today = new Date();
  const jsToday =
    today.getDay() === 0 ? "Vasárnap" : dayNames[today.getDay() - 1];
  const defaultDayName = weekDates.some((wd) => wd.dayName === jsToday)
    ? jsToday
    : weekDates[0].dayName;
  const [selectedDayName, setSelectedDayName] =
    useState<string>(defaultDayName);
  const selectedDateObj = weekDates.find(
    (wd) => wd.dayName === selectedDayName,
  );
  const selectedDate = selectedDateObj ? selectedDateObj.date : "";
  const filteredTicketSlips = ticketSlips.filter(
    (ts) => ts.date === selectedDate,
  );

  // Új ticket űrlap state-je
  const [newTicket, setNewTicket] = useState<Partial<TicketSlip>>({
    subscriptionName: subscriptionOptions[0],
    packageName: packageOptions[0],
    combinationType: combinationOptions[0],
    sumOdds: "",
    tips: [],
  });
  // Új tét űrlap state-je
  const [newTicketTip, setNewTicketTip] = useState<Partial<TicketSlipTip>>({
    tipName: "",
    tipDescription: "",
    oddsValue: "",
  });
  // Sum Odds szerkesztési mód
  const [isEditingSumOdds, setIsEditingSumOdds] = useState<boolean>(false);
  // Egyéni kötés mód
  const [customCombinationActive, setCustomCombinationActive] =
    useState<boolean>(false);
  const [customCombinationType, setCustomCombinationType] =
    useState<string>("");
  // Szerkesztési mód: ha van szerkesztett ticket, akkor annak id-je kerül ide
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);

  // Új tét hozzáadása a tickethez
  const handleAddTicketTip = () => {
    if (
      !newTicketTip.tipName?.trim() ||
      !newTicketTip.tipDescription?.trim() ||
      !newTicketTip.oddsValue ||
      !oddsPattern.test(newTicketTip.oddsValue.trim())
    ) {
      alert(
        "Kérlek töltsd ki a tét mezőit! (Tipp név, leírás és odds értéke X.XX formátumban)",
      );
      return;
    }
    setNewTicket((prev) => {
      // 1) Biztosítsuk, hogy oddsValue mindig string legyen:
      const trimmedOdds = (newTicketTip.oddsValue ?? "").trim();

      // 2) Ha üres maradt, ne vegyük fel a tippek közé:
      if (!trimmedOdds) {
        alert("Az odds értéke nem lehet üres!");
        return prev;
      }

      // 3) Építsük újra a tips tömböt
      const updatedTips: TicketSlipTip[] = [
        ...(prev.tips ?? []),
        {
          tipName: newTicketTip.tipName!.trim(),
          tipDescription: newTicketTip.tipDescription!.trim(),
          oddsValue: trimmedOdds,
        },
      ];

      // 4) Számoljuk újra a sumOdds‑ot és frissítsük a state‑et
      return {
        ...prev,
        tips: updatedTips,
        sumOdds: calculateSumOdds(updatedTips),
      };
    });

    setNewTicketTip({ tipName: "", tipDescription: "", oddsValue: "" });
  };

  const handleCalculateSumOdds = () => {
    if (!newTicket.tips || newTicket.tips.length === 0) return;
    setNewTicket({ ...newTicket, sumOdds: calculateSumOdds(newTicket.tips) });
  };

  // Mentés (új ticket hozzáadása vagy szerkesztése)
  const handleSaveTicket = () => {
    const effectiveCombinationType =
      customCombinationActive && customCombinationType.trim()
        ? customCombinationType.trim()
        : newTicket.combinationType || "";
    if (
      !newTicket.subscriptionName ||
      !newTicket.packageName ||
      !effectiveCombinationType ||
      !newTicket.sumOdds ||
      !newTicket.tips ||
      newTicket.tips.length === 0
    ) {
      alert(
        "Kérlek töltsd ki a ticket szelvény összes kötelező mezőjét, és adj hozzá legalább egy tétet!",
      );
      return;
    }
    // Ha szerkesztési mód aktív, módosítjuk a meglévő ticket-et
    if (editingTicketId) {
      setTicketSlips((prev) =>
        prev.map((ticket) =>
          ticket.id === editingTicketId
            ? {
                ...ticket,
                subscriptionName: newTicket.subscriptionName!,
                packageName: newTicket.packageName!,
                combinationType: effectiveCombinationType,
                sumOdds: newTicket.sumOdds!,
                tips: newTicket.tips!,
                // Opcionálisan frissíthetjük a ticketName-t is, ha szeretnénk:
                ticketName: generateTicketName(
                  newTicket,
                  prev.filter((t) => t.date === newTicket.date),
                ),
              }
            : ticket,
        ),
      );
      setEditingTicketId(null);
    } else {
      // Új ticket hozzáadása

      const ticketName =
        generateTicketName(newTicket, ticketSlips) + `_${ticketCounter}`;
      const ticketToAdd: TicketSlip = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        ticketName,
        date: selectedDate,
        dayName: selectedDayName,
        subscriptionName: newTicket.subscriptionName!,
        packageName: newTicket.packageName!,
        combinationType: effectiveCombinationType,
        sumOdds: newTicket.sumOdds!,
        tips: newTicket.tips!,
      };
      setTicketSlips([...ticketSlips, ticketToAdd]);
      setTicketCounter((prev) => prev + 1); // minden mentés után nő
    }
    // Reseteljük az űrlapot
    setNewTicket({
      subscriptionName: subscriptionOptions[0],
      packageName: packageOptions[0],
      combinationType: combinationOptions[0],
      sumOdds: "",
      tips: [],
    });
    setCustomCombinationActive(false);
    setCustomCombinationType("");
    setIsEditingSumOdds(false);
  };
  const handleBulkUpload = async () => {
    // 1. Confirm:
    if (
      !window.confirm(
        "Biztos, hogy fel akarod tölteni az összes tippet az adatbázisba?",
      )
    ) {
      return;
    }

    // 2. Kis payload: egy objektum slips tömbbel
    const payload = { slips: ticketSlips };

    // 3. Küldés a bulk route-ra
    try {
      const res = await fetch("/api/admin/ticket-tips/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      alert("Sikeresen feltöltöttük az adatokat!");
      setTicketSlips([]); // opcionális: ürítsd ki a frontendet
    } catch (err: any) {
      alert("Hiba a feltöltés során: " + err.message);
    }
  };

  // Egy tét törlése egy adott ticketből
  const handleDeleteTip = (ticketId: string, tipIndex: number) => {
    setTicketSlips((prevTickets) =>
      prevTickets
        .map((ticket) =>
          ticket.id === ticketId
            ? {
                ...ticket,
                tips: ticket.tips.filter((_, i) => i !== tipIndex),
                sumOdds:
                  ticket.tips.filter((_, i) => i !== tipIndex).length > 0
                    ? calculateSumOdds(
                        ticket.tips.filter((_, i) => i !== tipIndex),
                      )
                    : "",
              }
            : ticket,
        )
        .filter((ticket) => ticket.tips.length > 0),
    );
  };

  const handleDeleteTicket = (id: string) => {
    setTicketSlips(ticketSlips.filter((ts) => ts.id !== id));
  };

  // Amikor a felhasználó szerkesztésre kattint egy adott sorra,
  // feltöltjük az űrlapot az adott ticket adataival, és beállítjuk a szerkesztési módot.
  const handleEditTicket = (ticket: TicketSlip) => {
    setNewTicket(ticket);
    setEditingTicketId(ticket.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">
        Ticket szelvények (Tippek) listázása
      </h2>

      {/* Dátum skála: gombok a hét napjaival */}
      <div className="flex justify-center space-x-2 mb-4">
        {weekDates.map((wd, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayName(wd.dayName)}
            className={`px-3 py-1 border rounded ${
              wd.dayName === selectedDayName
                ? "bg-black text-yellow-500 border-yellow-500"
                : "bg-white text-black border-black"
            }`}
          >
            {wd.dayName}
            <div className="text-xs">{wd.date}</div>
          </button>
        ))}
      </div>

      {/* Táblázat: Minden sor egy tippet reprezentál */}
      <table className="min-w-full table-fixed border-collapse mb-4">
        <thead>
          <tr className="bg-black text-white">
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Dátum
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Nap neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Előfizetés
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Csomag
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Kötés típusa
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Szelvény név
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Tipp neve
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Tipp leírása
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Tipp Odds
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Sum Odds
            </th>
            <th
              className="border px-2 py-1 text-center"
              style={{ width: "8.33%" }}
            >
              Műveletek
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTicketSlips.length > 0 ? (
            filteredTicketSlips.flatMap((ticket) =>
              ticket.tips.map((tip, tipIndex) => (
                <tr key={`${ticket.id}-${tipIndex}`} className="border-t">
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.date}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.dayName}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.subscriptionName}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.packageName}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.combinationType}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.ticketName}
                  </td>
                  <td className="border px-2 py-1 text-black">{tip.tipName}</td>
                  <td className="border px-2 py-1 text-black">
                    {tip.tipDescription}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {tip.oddsValue}
                  </td>
                  <td className="border px-2 py-1 text-black text-center">
                    {ticket.sumOdds}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => handleEditTicket(ticket)}
                      className="px-2 py-1 border rounded bg-blue-500 text-white text-xs mr-1"
                    >
                      Szerkesztés
                    </button>
                    <button
                      onClick={() => handleDeleteTip(ticket.id, tipIndex)}
                      className="px-2 py-1 border rounded bg-red-500 text-white text-xs"
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              )),
            )
          ) : (
            <tr>
              <td
                colSpan={12}
                className="border px-2 py-1 text-center text-black"
              >
                Nincs ticket szelvény (tipp) ezen a napon.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Új (vagy szerkesztett) ticket űrlap */}
      <div className="border p-4 rounded bg-gray-100">
        <h3 className="text-xl font-bold mb-2 text-black">
          {editingTicketId
            ? "Ticket szerkesztése"
            : "Új ticket szelvény hozzáadása"}
        </h3>
        <p className="text-sm mb-2 text-black">
          Kiválasztott nap: {selectedDayName} ({selectedDate})
        </p>
        <div className="flex flex-col space-y-2">
          <label className="text-black">Előfizetés neve:</label>
          <select
            value={newTicket.subscriptionName || ""}
            onChange={(e) =>
              setNewTicket({ ...newTicket, subscriptionName: e.target.value })
            }
            className="border px-2 py-1"
          >
            {subscriptionOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <label className="text-black">Csomag neve:</label>
          <select
            value={newTicket.packageName || ""}
            onChange={(e) =>
              setNewTicket({ ...newTicket, packageName: e.target.value })
            }
            className="border px-2 py-1"
          >
            {packageOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <label className="text-black">Kötés típusa:</label>
          {customCombinationActive ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Írd be az egyéni kötést (pl. 5-es kötés)"
                value={customCombinationType}
                onChange={(e) => setCustomCombinationType(e.target.value)}
                className="border px-2 py-1"
              />
              <button
                onClick={() => {
                  setCustomCombinationActive(false);
                  setCustomCombinationType("");
                  setNewTicket({
                    ...newTicket,
                    combinationType: combinationOptions[0],
                  });
                }}
                className="px-2 py-1 border rounded bg-gray-500 text-white"
              >
                Visszaállítás
              </button>
            </div>
          ) : (
            <select
              value={newTicket.combinationType || ""}
              onChange={(e) => {
                const val = e.target.value;
                setNewTicket({ ...newTicket, combinationType: val });
                if (val === "Egyéni") {
                  setCustomCombinationActive(true);
                  setCustomCombinationType("");
                }
              }}
              className="border px-2 py-1"
            >
              {combinationOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          <label className="text-black">Sum Odds:</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Sum Odds értéke"
              value={newTicket.sumOdds || ""}
              onChange={(e) =>
                setNewTicket({ ...newTicket, sumOdds: e.target.value })
              }
              className="border px-2 py-1"
              readOnly={!isEditingSumOdds}
            />
            {!isEditingSumOdds ? (
              <>
                <button
                  onClick={handleCalculateSumOdds}
                  className="px-2 py-1 border rounded bg-green-500 text-white"
                >
                  Számítsd ki
                </button>
                <button
                  onClick={() => setIsEditingSumOdds(true)}
                  className="px-2 py-1 border rounded bg-blue-500 text-white"
                >
                  Szerkesztés
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditingSumOdds(false)}
                className="px-2 py-1 border rounded bg-gray-500 text-white"
              >
                Mentés
              </button>
            )}
          </div>
        </div>

        <div className="border p-2 rounded bg-white mt-4">
          <h4 className="font-bold text-black mb-1">Új tét hozzáadása</h4>
          <div className="flex flex-col space-y-1">
            <label className="text-black text-sm">Tipp neve:</label>
            <input
              type="text"
              placeholder="Tipp neve"
              value={newTicketTip.tipName || ""}
              onChange={(e) =>
                setNewTicketTip({ ...newTicketTip, tipName: e.target.value })
              }
              className="border px-2 py-1"
            />
            <label className="text-black text-sm">Tipp leírása:</label>
            <input
              type="text"
              placeholder="Tipp leírása"
              value={newTicketTip.tipDescription || ""}
              onChange={(e) =>
                setNewTicketTip({
                  ...newTicketTip,
                  tipDescription: e.target.value,
                })
              }
              className="border px-2 py-1"
            />
            <label className="text-black text-sm">
              Odds értéke (X.XX formátum):
            </label>
            <input
              type="text"
              placeholder="Odds értéke (X.XX)"
              value={newTicketTip.oddsValue || ""}
              onChange={(e) =>
                setNewTicketTip({ ...newTicketTip, oddsValue: e.target.value })
              }
              onBlur={(e) => {
                const val = e.target.value;
                if (val !== "" && !oddsPattern.test(val)) {
                  alert(
                    "Az odds értékének X.XX formátumúnak kell lennie (például 1.50)!",
                  );
                }
              }}
              className="border px-2 py-1"
            />
          </div>
          <button
            onClick={handleAddTicketTip}
            className="mt-2 px-4 py-1 border rounded bg-blue-500 text-white"
          >
            Tét hozzáadása
          </button>
          {newTicket.tips && newTicket.tips.length > 0 && (
            <ul className="mt-2 text-black">
              {newTicket.tips.map((tip, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>
                    <strong>{tip.tipName}</strong> - {tip.tipDescription} (Odds:{" "}
                    {tip.oddsValue})
                  </span>
                  <button
                    onClick={() => {
                      setNewTicket((prev) => {
                        const updatedTips = prev.tips?.filter(
                          (_, i) => i !== idx,
                        );
                        return {
                          ...prev,
                          tips: updatedTips,
                          sumOdds: updatedTips
                            ? calculateSumOdds(updatedTips)
                            : "",
                        };
                      });
                    }}
                    className="ml-2 px-2 py-1 border rounded bg-red-500 text-white text-xs"
                  >
                    Törlés
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSaveTicket}
          className="mt-4 px-4 py-2 border rounded bg-green-500 text-white"
        >
          {editingTicketId ? "Ticket módosítása" : "Ticket szelvény mentése"}
        </button>
      </div>
      {ticketSlips.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleBulkUpload}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Feltöltés az adatbázisba
          </button>
        </div>
      )}
    </div>
  );
}
