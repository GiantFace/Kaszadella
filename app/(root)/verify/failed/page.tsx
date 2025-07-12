"use client";

import { useRouter } from "next/navigation";
import VerifyWrapper from "@/components/VerifyWrapper";

export default function VerifyFailedPage() {
  const router = useRouter();

  return (
    <VerifyWrapper>
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        A megerősítés sikertelen
      </h1>
      <p className="text-gray-700 text-lg">
        A link érvénytelen vagy lejárt. Kérj új megerősítő emailt.
      </p>
      <button
        onClick={() => router.push("/sign-in")}
        className="mt-6 px-6 py-2 bg-primary text-white rounded"
      >
        Vissza a bejelentkezéshez
      </button>
    </VerifyWrapper>
  );
}
