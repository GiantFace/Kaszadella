import React from "react";
import { auth } from "@/auth";
import { getUserSubscription } from "@/database/subscription";
import { weeklyTipsByPackage } from "@/constans/Index";

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
  // 1) Lekérjük a session-t
  const session = await auth();

  // 2) Ha nincs session vagy nincs user objektum, megjelenítünk egy üzenetet
  if (!session || !session.user) {
    return (
      <div className="text-center text-xl text-gray-800">
        Kérlek jelentkezz be a tippek megtekintéséhez!
      </div>
    );
  }

  // 3) Ellenőrizzük, hogy a usernek van-e ID-je
  if (!session.user.id) {
    return (
      <div className="text-center text-xl text-gray-800">
        Hiányzik a felhasználói azonosító. Kérlek, jelentkezz be újra!
      </div>
    );
  }

  // 4) Lekérjük az előfizetés adatait az adatbázisból (subscription)
  const subscription = await getUserSubscription(session.user.id);

  // 5) Ha nincs subscription vagy nincs csomag, jelezzük, hogy nincs aktív csomag
  if (!subscription || !subscription.package) {
    return (
      <div className="text-center text-xl text-gray-800">
        Nincs aktív csomagod. Vásárolj egy csomagot, hogy tippeket kapj!
      </div>
    );
  }

  // 6) Állítsuk be a csomag ID-t a subscription.package értékéből
  const activePackageId: number | null = Number(subscription.package);
  if (Number.isNaN(activePackageId)) {
    // Ha valamilyen hiba folytán nem szám, akkor is jelezzük
    return (
      <div className="text-center text-xl text-gray-800">
        Hibás csomag ID. Vedd fel a kapcsolatot az ügyfélszolgálattal!
      </div>
    );
  }

  // 7) Lekérjük a tippeket a weeklyTipsByPackage objektumból
  const weeklyTips = weeklyTipsByPackage[activePackageId];
  if (!weeklyTips) {
    return (
      <div className="text-center text-xl text-gray-800">
        Nincs elérhető tipp a jelenlegi csomagodhoz.
      </div>
    );
  }

  // 8) Ha szükséges, megjelenítjük a csomag nevet is
  const packageNames: Record<number, string> = {
    1: "Start csomag",
    2: "Kasza csomag",
    3: "Kaszadella csomag",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Heti tippek a {packageNames[activePackageId]}hoz
      </h2>
      <div className="space-y-8">
        {Object.entries(weeklyTips).map(([day, tips]) => (
          <div key={day} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">{day}</h3>
            <ul className="list-disc list-inside space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="text-lg text-gray-700">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
