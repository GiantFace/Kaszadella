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
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl gap-8">
      {/* Chart konténer: Gradient háttér, nagyobb lekerekítés és árnyék */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-2xl shadow-2xl">
        <Bar data={chartData} />
      </div>

      {/* Tip gombok */}
      <div className="flex flex-wrap justify-center gap-4">
        {sampleTips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setSelectedTip(tip)}
            className={`px-6 py-3 font-bebas-neue rounded-xl transition-all duration-300 transform 
              ${
                selectedTip.id === tip.id
                  ? "bg-gradient-to-r from-primary to-yellow-400 text-black scale-110 shadow-xl"
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
