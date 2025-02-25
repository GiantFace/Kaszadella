"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";

const TipOverview = () => {
  const [selectedTip, setSelectedTip] = useState(sampleTips[0]); // Alapértelmezett tipp

  return (
    <section className="tipp-overview">
      {/* Bal oldal: Szöveg */}
      <div className="flex flex-1 flex-col gap-5">
        <h1>Magyarország listavezető tippoldala</h1>
        <div className="tipp-info">
          <p>
            A{" "}
            <span className="font-semibold text-gray-700">
              {selectedTip.title}
            </span>
          </p>

          <p>
            nyertes szelvényének száma: {selectedTip.sum_tip_number}
            <span className="font-semibold text-light-200"></span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{selectedTip.rating}</p>
          </div>
        </div>

        <div className="tipp-copies">
          <p>
            Összes nyeremény: <span>{selectedTip.winned_money}</span>
          </p>

          <p>
            Elérhető tippek: <span>{selectedTip.available_tipps} db</span>
          </p>
        </div>
        <p className="tipp-description">{selectedTip.description}</p>

        <Button className="tipp-overview-button">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className={"font-bebas-neue text-xl text-dark-100"}>
            Válassz sportfogadási csomagot!
          </p>
        </Button>
      </div>

      {/* Jobb oldal: Grafikon */}
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <div className="max-sm:hidden">
            {/* TippChart komponens, amely frissíti a kiválasztott tippet */}
            <TippChart
              selectedTip={selectedTip}
              setSelectedTip={setSelectedTip}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipOverview;
