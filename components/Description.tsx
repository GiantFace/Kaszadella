"use client";

import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";

interface Tipp {
  title?: string;
  cover?: string;
  sum_tip_number?: number;
  rating?: number;
  winned_money?: number;
  available_tipps?: number;
}
interface TippCardProps {
  tip?: Tipp;
}

const Description: React.FC<TippCardProps> = ({ tip }) => {
  const defaultTip = sampleTips[0];
  const [selectedTip, setSelectedTip] = useState<Tipp>(tip || defaultTip);

  // useTransition animálja a cover kép váltását
  const transitions = useTransition(selectedTip.cover, {
    key: selectedTip.cover,
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: { tension: 300, friction: 20 },
  });

  return (
    <section className="flex flex-col mt-20 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bal oszlop: Tipp információk és grafikon */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="tipp-info text-gray-800 mb-4">
            <p>
              A{" "}
              <span className="font-semibold text-gray-900">
                {selectedTip.title || "Nincs cím"}
              </span>{" "}
              nyertes szelvényének száma:{" "}
              <span className="font-semibold">
                {selectedTip.sum_tip_number ?? 0}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <img src="/icons/star.svg" alt="star" width={22} height={22} />
              <p className="font-semibold">{selectedTip.rating ?? 0}</p>
            </div>
          </div>
          <div className="tipp-copies text-gray-800 mb-4">
            <p>
              Összes nyeremény:{" "}
              <span className="font-bold">{selectedTip.winned_money ?? 0}</span>
            </p>
            <p>
              Elérhető tippek:{" "}
              <span className="font-bold">
                {selectedTip.available_tipps ?? 0} db
              </span>
            </p>
          </div>
          <div className="w-full max-w-lg">
            <TippChart
              selectedTip={selectedTip}
              setSelectedTip={setSelectedTip}
            />
          </div>
        </div>

        {/* Jobb oszlop: Leírás és a cover kép animációval */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h3 className="tipp-description text-gray-700 leading-relaxed mb-4">
            Tarts velünk, hogy közösen örülhessünk a kis kaszás hatalmas
            aratásainak. Légy bármilyen típusú vándor, Ő mindig megfogja a kezed
            és segíti utad, hiszen számára nincs is fontosabb, mint a becsületes
            és testvéries támogatás. Törj a csúcsra a kaszás segítségével.
          </h3>
          <div className="relative flex justify-center w-[530px] h-[530px]">
            {transitions((style, item) => (
              <animated.img
                src={item || "/defaultCover.svg"}
                alt="Kaszadella halal starter pack"
                style={style}
                className="absolute object-contain w-full h-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
