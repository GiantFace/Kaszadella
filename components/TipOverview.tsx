"use client";

import React, { useEffect, useState } from "react";
import SplitText from "@/components/ui/SplitText";
import OverHeader from "@/components/OverHeader";
import TippCard from "@/components/TippCard";
import TipList from "@/components/TipList";
import { sampleTips } from "@/constans/Index";
import TipStats from "@/components/TipStats";
import FeedbackSection from "@/components/FeedbackSection";
import LoadingPage from "@/components/LoadingPage"; // Importáld az új komponenst



export default function TipOverview() {
  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Eltávolított lag okozó animációk

  const [loading, setLoading] = useState(true);

  // Statikus stílusok lag-mentes működéshez

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <section
      className="
        relative
        min-h-[200vh]
        overflow-hidden
        bg-fixed
        md:pt-20
        lg:pt-0
      "
    >
      {/* Statikus dekorációs rétegek - lag-mentes */}
      <div className="hidden xl:block pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-[10vh] left-[5vw] animate-gentle-pulse">
          <img src="morecoins.svg" alt="Coins layer 1" className="w-16 h-16" />
        </div>
        <div className="absolute top-[30vh] left-[20vw] animate-gentle-bounce">
          <img src="morecoins.svg" alt="Coins layer 2" className="w-12 h-12" />
        </div>
        <div className="absolute top-[50vh] right-[25vw] animate-gentle-spin">
          <img src="morecoins.svg" alt="Coins layer 3" className="w-14 h-14" />
        </div>
        <div className="absolute top-[70vh] left-[40vw] animate-gentle-pulse">
          <img src="morecoins.svg" alt="Coins layer 4" className="w-10 h-10" />
        </div>
      </div>

      {/* Tartalom – szöveg, kép és TipList */}
      <div className=" relative flex flex-col">
        {/* Top row: két oszlop */}
        <div className="flex flex-col md:flex-row justify-between w-full mt-20">
          {/* Bal oldal: Szöveg */}
          <div className="flex align-center justify-start br-5 z-[999]">
            <h1 className="text-3xl sm:text-7xl md:text-[8rem] lg:text-[10rem] xl:text-[10rem] 2xl:text-[9rem] text-white leading-none font-black tracking-tight break-words">
              <span className="inline-block">
                {"Üdvözlünk a Kaszadella Világában!"
                  .split(" ")
                  .map((word, wi) => (
                    <span key={wi} className="inline-block mr-2">
                      {word.split("").map((char, ci) => (
                        <span
                          key={`${wi}-${ci}`}
                          className="inline-block opacity-0 translate-y-2 animate-fade-in-char"
                          style={{ animationDelay: `${(wi * 5 + ci) * 60}ms` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </span>
            </h1>
          </div>

          {/* Jobb oldal: Kép OverHeader-rel */}
          <div className="flex-1 flex justify-end pl-4">
            <OverHeader>
              <div className="flex pointer-events-none md:block">
                <img
                  src="/images/Kaszadella_halal_kaszadella_pack.png"
                  alt="Kaszadella"
                  className="object-contain md:block"
                />
              </div>
            </OverHeader>
          </div>
        </div>
        <div className="z-[90]">
          <div className=" justify-center">
            <TipList
              tips={sampleTips}
              containerClassName="mt-20 max-w-full"
              title={""}
            />
          </div>
        </div>
      </div>
      <div className="description-box mt-0 mb-20">
        <p>
          ...ahol az álmok érintkeznek a valósággal. Kaszadella, a siker harcosa
          nap - mint nap azért harcol, hogy bajtársait segítse az Élet rögös
          útján. Története már az ősi időkbe nyúlik vissza, viszont most jött el
          az ideje, hogy felfedje valódi énjét és megmutassa, hogy mire is képes
          igazán.
        </p>
      </div>
      <TipStats />

      <FeedbackSection />
    </section>
  );
}
