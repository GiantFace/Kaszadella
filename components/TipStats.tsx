"use client";

import React, { useState } from "react";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

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
    <section className="relative mt-20 px-4  bg-gradient-to-t from-white/10 to-black/10 ">
      <div className="absolute inset-0 backdrop-blur-xl mask-gradient pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* Bal oszlop: Tipp információk és grafikon */}
        <div className="flex-1 flex flex-col items-center justify-center mt-6">
          <div className="tipp-info text-white mb-4">
            <p>
              A{" "}
              <span className="font-semibold text-primary-turquoise">
                {selectedTip.title + " nyertes" || "Nincs cím"}
              </span>{" "}
              szelvényének száma:{" "}
              <span className="font-semibold text-primary-turquoise">
                {selectedTip.sum_tip_number ?? 0}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <img src="/icons/star.svg" alt="star" width={22} height={22} />
              <p className="font-semibold">{selectedTip.rating ?? 0}</p>
            </div>
          </div>
          <div className="tipp-copies mb-4 t">
            <p className="text-white">
              Összes nyeremény:{" "}
              <span className="font-bold text-primary-turquoise">
                {selectedTip.winned_unity ?? 0} egység
              </span>
            </p>
            <p className="text-white">
              Elérhető tippek:{" "}
              <span className="font-bold text-primary-turquoise">
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

        {/* Jobb oszlop: Leírás és kép */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <FadeInOnScroll>
            <h3 className="tipp-description text-white text-xl mb-4">
              Tarts velünk, hogy közösen örülhessünk a kis kaszás hatalmas
              aratásainak. Légy bármilyen típusú vándor, Ő mindig megfogja a
              kezed és segíti utad, hiszen számára nincs is fontosabb, mint a
              becsületes és testvéries támogatás. Törj a csúcsra a kaszás
              segítségével.
            </h3>
          </FadeInOnScroll>
          <div className="relative flex justify-center w-[500px] h-[500px]">
            <img
              key={selectedTip.cover}
              src={selectedTip.cover || "/defaultCover.svg"}
              alt="Kaszadella halal starter pack"
              className="absolute object-contain slide-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipStats;
