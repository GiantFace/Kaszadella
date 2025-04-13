// app/(root)/tips/page.tsx
import React from "react";
import { auth } from "@/auth";
import { getUserSubscription } from "@/database/subscription";
import { weeklyTipsByPackage } from "@/constans/Index";
import WeeklyTipsClient from "@/components/WeeklyTipsClient";

export interface PageProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<any>;
}

type SegmentParams<T extends Object = any> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends string
          ? string | string[] | undefined
          : never;
      }
    : T;

export default async function TipsPage() {
  // Session lekérése
  const session = await auth();
  if (!session || !session.user) {
    return (
      <div className="text-center text-xl text-gray-800">
        Kérlek jelentkezz be a tippek megtekintéséhez!
      </div>
    );
  }
  if (!session.user.id) {
    return (
      <div className="text-center text-xl text-gray-800">
        Hiányzik a felhasználói azonosító. Kérlek, jelentkezz be újra!
      </div>
    );
  }
  // Előfizetés adatainak lekérése
  const subscription = await getUserSubscription(session.user.id);
  if (!subscription || !subscription.package) {
    return (
      <div className="text-center text-xl text-gray-800">
        Nincs aktív csomagod. Vásárolj egy csomagot, hogy tippeket kapj!
      </div>
    );
  }
  const activePackageId: number | null = Number(subscription.package);
  if (Number.isNaN(activePackageId)) {
    return (
      <div className="text-center text-xl text-gray-800">
        Jelenleg nincsen aktív csomagod!
      </div>
    );
  }
  // Tippek lekérése
  const weeklyTips = weeklyTipsByPackage[activePackageId];
  if (!weeklyTips) {
    return (
      <div className="text-center text-xl text-gray-800">
        Nincs elérhető tipp a jelenlegi csomagodhoz.
      </div>
    );
  }
  // Csomag nevek definiálása
  const packageNames: Record<number, string> = {
    1: "Start csomag",
    2: "Kasza csomag",
    3: "Kaszadella csomag",
  };

  return (
    <WeeklyTipsClient
      activePackageId={activePackageId}
      packageNames={packageNames}
      weeklyTips={weeklyTips}
    />
  );
}
