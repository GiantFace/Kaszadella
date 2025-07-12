"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";
import { ReactTyped } from "react-typed";
import SplitText from "@/components/ui/SplitText";

const TipOverview = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTip, setSelectedTip] = useState(sampleTips[0]); // Alapértelmezett tipp

  return (
    <section
      className="tipp-overview flex w-screen min-h-screen flex-col md:flex-row items-start justify-start bg-cover bg-center bg-fixed pt-0 md:pt-20 lg:pt-0"
      style={{
        backgroundImage: "url('/homebg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Bal oldal: Szöveg */}
      <div className="flex flex-1 flex-col">
        <h1 className="text-6xl font-extrabold leading-tight text-center whitespace-pre-line max-w-2xl no-warp">
          <SplitText text={"Üdvözöllek, Kaszadella\nVilágában!"} />
        </h1>

        <p className="tipp-description text-black leading-relaxed text-left max-w-3xl">
          Kaszadella, a siker harcosa nap mint nap azért harcol, hogy bajtársait
          segítse az Élet rögös útján. Története már az ősi időkbe nyúlik
          vissza, viszont most jött el az ideje, hogy felfedje valódi énjét és
          megmutassa, mire is képes igazán.
        </p>
      </div>
    </section>
  );
};

export default TipOverview;
