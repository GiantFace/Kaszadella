"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippChart from "@/components/TipChart";
import { sampleTips } from "@/constans/Index";

const Description = () => {
  return (
    <section className="flex flex-1 flex-col gap-5">
      <div>
        <h3 className="tipp-description text-gray-700 leading-relaxed">
          Tarts velünk, hogy közösen örülhessünk a kis kaszás hatalmas
          aratásainak. Légy bármilyen típusú vándor, Ő mindig megfogja a kezed
          és segíti utad, hiszen számára nincs is fontosabb, mint a becsületes
          és testvéries támogatás. Törj a csúcsra a kaszás segítségével.
        </h3>
        <div className="flex flex-2  flex-row">
          <img
            src="/images/Kaszadella_halal_starter_pack.png"
            alt="Kaszadella halal starter pack"
            width={330}
            height={330}
          />
        </div>
      </div>
    </section>
  );
};
export default Description;
