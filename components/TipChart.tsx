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
interface TipChartProps {
  selectedTip: Tipp;
  setSelectedTip: React.Dispatch<React.SetStateAction<Tipp>>;
}

const TipChart: React.FC<TipChartProps> = ({ selectedTip, setSelectedTip }) => {
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-dark-300 p-6 rounded-lg gap-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <Bar data={chartData} />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {sampleTips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setSelectedTip(tip)}
            className={`px-4 py-2 font-bebas-neue rounded-lg text-white transition-all ${
              selectedTip.id === tip.id
                ? "bg-primary text-black transform scale-110 shadow-lg"
                : "bg-secondary-foreground hover:bg-primary hover:text-black hover"
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
