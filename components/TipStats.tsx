"use client";

import React, { useState } from "react";
import SplitText from "@/components/ui/SplitText";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";

interface Tipp {
  id: number;
  title?: string;
  cover?: string;
  sum_tip_number?: number;
  rating?: number;
  winned_unity?: number;
  available_tipps?: number;
}
interface TippCardProps {
  tip?: Tipp;
}

const TipStats: React.FC<TippCardProps> = ({ tip }) => {
  const defaultTip = sampleTips[0];
  const [selectedTip, setSelectedTip] = useState<Tipp>(tip || defaultTip);

  return (
    <section className="flex flex-col mt-20 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bal oszlop: Tipp információk és grafikon */}
        <div className="flex-1 flex flex-col items-center justify-center mt-6">
          <div className="tipp-info text-gray-800 mb-4">
            <p>
              A{" "}
              <span className="font-semibold text-white">
                {selectedTip.title + " nyertes" || "Nincs cím"}
              </span>{" "}
              szelvényének száma:{" "}
              <span className="font-semibold text-white">
                {selectedTip.sum_tip_number ?? 0}
              </span>
            </p>
            <div className="flex items-center gap-2 ">
              <img src="/icons/star.svg" alt="star" width={22} height={22} />
              <p className="font-semibold">{selectedTip.rating ?? 0}</p>
            </div>
          </div>
          <div className="tipp-copies mb-4">
            <p className="text-white">
              Összes nyeremény:{" "}
              <span className="font-bold">
                {selectedTip.winned_unity ?? 0} egység
              </span>
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
          <h3 className="tipp-description text-white text-xl leading-relaxed mb-4">
            Tarts velünk, hogy közösen örülhessünk a kis kaszás hatalmas
            aratásainak. Légy bármilyen típusú vándor, Ő mindig megfogja a kezed
            és segíti utad, hiszen számára nincs is fontosabb, mint a becsületes
            és testvéries támogatás. Törj a csúcsra a kaszás segítségével.
          </h3>
          <div className="relative flex justify-center w-[530px] h-[530px]">
            {/* A key attribútum miatt, ha a selectedTip.cover megváltozik, az újra renderelődik és az animáció lefut */}
            <img
              key={selectedTip.cover}
              src={selectedTip.cover || "/defaultCover.svg"}
              alt="Kaszadella halal starter pack"
              className="absolute object-contain w-full h-full slide-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipStats;
