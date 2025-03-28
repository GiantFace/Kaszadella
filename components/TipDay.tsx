"use client";

import React, { useState } from "react";

interface TipDayProps {
  day: string;
  tips: string[];
  isEditable: boolean;
}

const TipDay: React.FC<TipDayProps> = ({ day, tips, isEditable }) => {
  // Állapot, amely az aktuális tippeket tartalmazza (szerkeszthető mód)
  const [editTips, setEditTips] = useState(tips);

  // Save gombhoz (itt kell majd API hívást implementálni az adatbázis frissítéséhez)
  const handleSave = () => {
    // Példa: console.log az új tippek
    console.log(`Saving changes for ${day}:`, editTips);
    // Itt hívhatod meg az API-t, hogy frissítsd a tippeket az adatbázisban
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">{day}</h3>
      <ul className="list-disc list-inside space-y-2">
        {editTips.map((tip, index) =>
          isEditable ? (
            <li key={index}>
              <textarea
                className="w-full border p-2 rounded"
                value={tip}
                onChange={(e) => {
                  const newTips = [...editTips];
                  newTips[index] = e.target.value;
                  setEditTips(newTips);
                }}
              />
            </li>
          ) : (
            <li key={index} className="text-lg text-gray-700">
              {tip}
            </li>
          ),
        )}
      </ul>
      {isEditable && (
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default TipDay;
