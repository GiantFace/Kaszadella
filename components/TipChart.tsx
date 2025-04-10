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
  winned_money?: number;
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
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl gap-10">
      {/* Grafikon konténer */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 p-12 rounded-3xl shadow-2xl">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                grid: { color: "rgba(255,255,255,0.1)" },
                ticks: { color: "#fff", font: { size: 14 } },
              },
              y: {
                grid: { color: "rgba(255,255,255,0.1)" },
                ticks: { color: "#fff", font: { size: 14 } },
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
      <div className="flex flex-wrap justify-center gap-4">
        {sampleTips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setSelectedTip(tip)}
            className={`px-8 py-4 font-bebas-neue rounded-xl transition-all duration-300 transform 
              ${
                selectedTip.id === tip.id
                  ? "bg-gradient-to-r from-primary to-yellow-400 text-black scale-110 shadow-2xl"
                  : "bg-gray-700 text-white hover:bg-gradient-to-r hover:from-primary hover:to-yellow-400 hover:text-black"
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
