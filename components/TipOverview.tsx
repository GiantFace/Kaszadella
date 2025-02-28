"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";

const TipOverview = () => {
  const [selectedTip, setSelectedTip] = useState(sampleTips[0]); // Alapértelmezett tipp

  return (
    <section className="tipp-overview flex flex-col md:flex-row gap-10">
      {/* Bal oldal: Szöveg */}
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-3xl font-bold text-yellow-500">
          Magyarország listavezető tippoldala
        </h1>
        <p className="tipp-description text-red-900 leading-relaxed">
          Üdv Kaszadella világában, ahol az álmok érintkeznek a valósággal.
          <br />
          Kaszadella, a siker harcosa nap mint nap azért harcol, hogy bajtársait
          segítse az Élet rögös útján. Története már az ősi időkbe nyúlik
          vissza, viszont most jött el az ideje, hogy felfedje valódi énjét és
          megmutassa, mire is képes igazán.
        </p>

        <div className="tipp-info mt-3 text-gray-800">
          <p>
            A{" "}
            <span className="font-semibold text-gray-900">
              {selectedTip.title}
            </span>{" "}
            nyertes szelvényének száma:{" "}
            <span className="font-semibold">{selectedTip.sum_tip_number}</span>
          </p>

          <div className="flex items-center gap-2 ">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p className="font-semibold">{selectedTip.rating}</p>
          </div>
        </div>

        <div className="tipp-copies text-gray-800">
          <p>
            Összes nyeremény:{" "}
            <span className="font-bold">{selectedTip.winned_money}</span>
          </p>
          <p>
            Elérhető tippek:{" "}
            <span className="font-bold">{selectedTip.available_tipps} db</span>
          </p>
        </div>

        <Button className="tipp-overview-button flex items-center gap-2 mt-4 px-5 py-3 text-lg font-medium bg-blue-100 text-white rounded-lg hover:bg-blue-700 transition">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <span>Válassz sportfogadási csomagot!</span>
        </Button>
      </div>

      {/* Jobb oldal: Grafikon */}
      <div className="relative flex flex-2 justify-center">
        <div className="relative w-full max-w-lg">
          <div className="hidden sm:block">
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
