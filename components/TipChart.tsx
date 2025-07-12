"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { sampleTips } from "@/constans/Index";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Tipp {
  id: number;
  title?: string;
  cover?: string;
  sum_tip_number?: number;
  rating?: number;
  winned_tip?: number;
  winned_money?: string;
  available_tipps?: number;
  color?: string;
}
interface TippChartProps {
  selectedTip: Tipp;
  setSelectedTip: React.Dispatch<React.SetStateAction<Tipp>>;
}

const TipChart: React.FC<TippChartProps> = ({
  selectedTip,
  setSelectedTip,
}) => {
  // Számold ki a globális maximumot az összes sampleTip-ből.
  // Minden tipp esetén az adott három érték közül veszi a legnagyobbat,
  // majd az összes tip közül a legnagyobbat.
  const globalMax = Math.max(
    ...sampleTips.map((tip) =>
      Math.max(
        tip.winned_tip ?? 0,
        tip.available_tipps ?? 0,
        tip.sum_tip_number ?? 0,
      ),
    ),
  );

  const chartData = {
    labels: ["Nyerő tippek", "Elérhető tippek", "Összes szelvény"],
    datasets: [
      {
        label: selectedTip.title,
        data: [
          selectedTip.winned_tip,
          selectedTip.available_tipps,
          selectedTip.sum_tip_number,
        ],
        backgroundColor: selectedTip.color,
        borderColor: selectedTip.color,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-primary-turquoise to-gray-900 p-12 rounded-3xl gap-10">
      {/* Grafikon konténer */}
      <div className="w-full max-w-4xl p-2 rounded-3xl shadow-2xl ">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                grid: { color: "rgba(255,255,255,0.1)" },
                ticks: { color: "#fff", font: { size: 12 } },
              },
              y: {
                grid: { color: "rgba(255,255,255,0.1)" },
                ticks: { color: "#fff", font: { size: 14 } },
                // Állítsd be a y-tengely maximumát a globális maximum 120%-ára
                max: globalMax > 0 ? globalMax * 1.2 : undefined,
              },
            },
            plugins: {
              legend: {
                labels: { color: "#fff", font: { size: 16 } },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                cornerRadius: 8,
              },
            },
          }}
        />
      </div>

      {/* Tip gombok */}
      <div className="flex flex-wrap justify-center gap-4 text-center">
        {sampleTips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setSelectedTip(tip)}
            className={`px-8 py-4 font-bebas-neue rounded-xl transition-all duration-300 transform 
              ${
                selectedTip.id === tip.id
                  ? "bg-gradient-to-r from-primary-turquoise to-yellow-400 text-black scale-110 shadow-2xl"
                  : "bg-gray-700 text-white hover:bg-gradient-to-r hover:from-primary-turquoise hover:to-yellow-400 hover:text-black"
              }`}
          >
            {tip.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TipChart;
