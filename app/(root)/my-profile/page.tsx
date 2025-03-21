// app/(root)/my-profile/page.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { getUserSubscription } from "@/database/subscription"; // A te saját DB logikád

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

export default async function Page({ params, searchParams }: PageProps) {
  // 1) Lekérjük a session-t
  const session = await auth();

  // 2) Ha nincs session vagy nincs user objektum, jeleníts meg egy üzenetet
  if (!session || !session.user) {
    return (
      <div className="text-center text-xl text-gray-800">
        Kérlek jelentkezz be a profil megtekintéséhez!
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

  // 4) Lekérjük az előfizetés adatait
  // (Feltételezzük, hogy a subscription-ben lehet null is, ha nincs előfizetés)
  const subscription = await getUserSubscription(session.user.id);

  // 5) Ha nincs subscription, vagy inaktív (példa: status !== "Active"), jelezzük
  if (!subscription || subscription.status !== "Approved") {
    return (
      <div className="text-center text-xl text-white">
        Nincs aktív csomagod. Vásárolj egy csomagot, hogy tippeket kapj!
      </div>
    );
  }

  // 6) Mivel a subscription mezők is lehetnek undefined (ha a DB logika így hozza vissza),
  // érdemes ellenőrizni őket, mielőtt new Date(...) hívást végzünk.
  const expirationDateString = subscription.expirationDate ?? "";
  const lastActivityString = subscription.lastActivityDate ?? "";
  const createdAtString = subscription.createdAt ?? "";

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profilom</h1>

      {/* Üdvözlés */}
      <div className="mb-10">
        <p className="text-lg">
          Üdvözöllek, <strong>{session.user.name}</strong>!
        </p>
        <p className="text-md text-gray-600">
          Email: <strong>{session.user.email}</strong>
        </p>
      </div>

      {/* Előfizetés adatai */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">Előfizetés adatai</h2>
        <p>
          <strong>Csomag neve:</strong> {subscription.packageName ?? "N/A"}
        </p>
        <p>
          <strong>Lejárati dátum:</strong>{" "}
          {expirationDateString
            ? new Date(expirationDateString).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Státusz:</strong> {subscription.status ?? "N/A"}
        </p>
        <p>
          <strong>Utolsó aktivitás:</strong>{" "}
          {lastActivityString
            ? new Date(lastActivityString).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Előfizetés kezdete:</strong>{" "}
          {createdAtString
            ? new Date(createdAtString).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      {/* Logout gomb */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
    </section>
  );
}
