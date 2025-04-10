"use client";

import React, { useEffect, useState } from "react";
import SplitText from "@/components/ui/SplitText";
import OverHeader from "@/components/OverHeader";
import TippCard from "@/components/TippCard";
import TipList from "@/components/TipList";
import { sampleTips } from "@/constans/Index";

export default function TipOverview() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="relative flex flex-col">
        {/* Top row: két oszlop */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-20">
          {/* Bal oldal: Szöveg */}
          <div className="flex-1 flex justify-start pl-4">
            <h1 className="text-7xl font-extrabold leading-tight text-white whitespace-pre-line max-w-2xl">
              <SplitText text={"Üdvözölünk, Kaszadella\nVilágában!"} />
            </h1>
          </div>
          {/* Jobb oldal: Kép OverHeader-rel */}
          <div className="flex-1 flex justify-end pl-4">
            <OverHeader>
              <div
                className="flex pointer-events-none md:block mt-[-5px]"
                style={parallaxStyle3}
              >
                <img
                  src="/images/Kaszadella_halal_kaszadella_pack.png"
                  alt="Kaszadella"
                  className="object-contain"
                />
              </div>
            </OverHeader>
          </div>
        </div>
        <div className="z-[90]">
          <div className=" justify-center">
            <TipList tips={sampleTips} containerClassName="mt-30 max-w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
