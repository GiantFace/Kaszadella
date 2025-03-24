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
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingPage />;
  }

  // Parallax stílusok
  const parallaxStyle1 = {
    transform: `translateY(${scrollY * 0.6}px)`,
  };
  const parallaxStyle2 = {
    transform: `translateY(${scrollY * 0.1}px)`,
  };
  const parallaxStyle3 = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };
  const parallaxStyleBox = {
    transform: `translateY(${scrollY * 0.05}px)`,
  };

  return (
    <section
      className="
        relative
        min-h-[200vh] /* Legyen nagy, hogy legyen mit görgetni */
        overflow-hidden
        bg-fixed
        md:pt-20
        lg:pt-0
      "
    >
      {/* Parallax-rétegek */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0" style={parallaxStyle1}>
          <img src="morecoins.svg" alt="Coins layer 1" />
        </div>
        <div className="absolute top-[30vh] left-[20vw]" style={parallaxStyle2}>
          <img src="morecoins.svg" alt="Coins layer 2" />
        </div>
        <div className="absolute top-[50vh] left-[50vw]" style={parallaxStyle3}>
          <img src="morecoins.svg" alt="Coins layer 3" />
        </div>
        <div className="absolute top-[50vh] left-[50vw]" style={parallaxStyle3}>
          <img src="morecoins.svg" alt="Coins layer 3" />
        </div>
        <div
          className="absolute top-[450vh] left-[10vw]"
          style={parallaxStyle3}
        >
          <img src="morecoins.svg" alt="Coins layer 3" />
        </div>
      </div>

      {/* Tartalom – szöveg, kép és TipList */}
      <div className=" relative flex flex-col">
        {/* Top row: két oszlop */}
        <div className="flex flex-col md:flex-row justify-between w-full mt-20">
          {/* Bal oldal: Szöveg */}
          <div className="flex align-center justify-start br-5  ">
            <h1 className="text-6xl md:text-7xl xl:text-8xl sm:align-middle  sm:justify-items-center text-white whitespace-pre-line max-w-5xl pl-4 ">
              <SplitText text={"Üdvözlünk, Kaszadella Világában!"} />
            </h1>
          </div>
          {/* Jobb oldal: Kép OverHeader-rel */}
          <div className="flex-1 flex justify-end pl-4">
            <OverHeader>
              <div
                className="flex pointer-events-none md:block"
                style={parallaxStyle3}
              >
                <img
                  src="/images/Kaszadella_halal_kaszadella_pack.png"
                  alt="Kaszadella"
                  className="object-contain xl:block"
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
      <div className="description-box mt-0 mb-20" style={parallaxStyleBox}>
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
