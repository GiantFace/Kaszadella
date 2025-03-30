"use client";

import { useRouter } from "next/navigation";
import VerifyWrapper from "@/components/VerifyWrapper";

export default function VerifySuccessPage() {
  const router = useRouter();

  return (
    <VerifyWrapper>
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Sikeres email megerősítés!
      </h1>
      <p className="text-gray-700 text-lg">
        A fiókod aktiválva lett. Most már bejelentkezhetsz.
      </p>
      <button
        onClick={() => router.push("/sign-in")}
        className="mt-6 px-6 py-2 bg-primary text-white rounded"
      >
        Belépés
      </button>
    </VerifyWrapper>
  );
}
