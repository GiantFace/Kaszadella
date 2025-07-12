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

// Dátum formázó függvény (év-hónap-nap formátum)
function formatDateHungarian(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return "N/A";
  }
}

// Állapot fordító függvény
function translateStatus(status: string): string {
  const statusTranslations: { [key: string]: string } = {
    'Pending': 'Függőben',
    'Approved': 'Jóváhagyott',
    'Customer': 'Ügyfél'
  };
  return statusTranslations[status] || status;
}

// Jogosultság fordító függvény
function translateRole(role: string): string {
  const roleTranslations: { [key: string]: string } = {
    'USER': 'Felhasználó',
    'ADMIN': 'Adminisztrátor'
  };
  return roleTranslations[role] || role;
}

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/50 backdrop-blur text-white text-center text-xl">
        Kérlek jelentkezz be a profil megtekintéséhez!
      </div>
    );
  }

  if (!session.user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/50 backdrop-blur text-white text-center text-xl">
        Hiányzik a felhasználói azonosító. Kérlek, jelentkezz be újra!
      </div>
    );
  }

  const subscription = await getUserSubscription(session.user.id);

  if (!subscription) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black/50 backdrop-blur text-white text-center text-xl space-y-6">
        <p>Nincs aktív csomagod. Vásárolj egy csomagot, hogy tippeket kapj!</p>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className="font-bold">Kijelentkezés</Button>
        </form>
      </div>
    );
  }

  const createdAtString = subscription.createdAt ?? "";
  const expirationDateString = subscription.expirationDate ?? "";

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Profilom</h1>
        <div className="mb-6 space-y-1">
          <p className="text-lg text-gray-800">
            Üdvözöllek, <strong>{session.user.name}</strong>!
          </p>
          <p className="text-md text-gray-700">
            E-mail cím: <strong>{session.user.email}</strong>
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow mb-6 text-left">
          <h2 className="text-2xl font-bold mb-4">Előfizetés adatai</h2>
          <p>
            <strong>Csomag neve:</strong> {subscription.packageName ?? "Nincs adat"}
          </p>
          <p>
            <strong>Létrehozva:</strong>{" "}
            {formatDateHungarian(createdAtString)}
          </p>
          <p>
            <strong>Lejárati dátum:</strong>{" "}
            {formatDateHungarian(expirationDateString)}
          </p>
          <p>
            <strong>Állapot:</strong> {subscription.status ? translateStatus(subscription.status) : "Nincs adat"}
          </p>
          <p>
            <strong>Jogosultság:</strong> {session.user.role ? translateRole(session.user.role) : "Nincs adat"}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className="font-bold w-full">Kijelentkezés</Button>
        </form>
      </div>
    </section>
  );
}
