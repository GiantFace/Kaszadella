"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!token || !emailParam) {
      setStatus("error");
      return;
    }

    setEmail(emailParam);

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(emailParam)}`,
        );
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [searchParams]);

  const handleResend = async () => {
    const res = await fetch("/api/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast({
        title: "Email elküldve",
        front_description: "Új megerősítő email kiküldve.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        front_description: "Nem sikerült újraküldeni az emailt.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {status === "pending" && (
        <p className="text-lg text-gray-700">Ellenőrzés folyamatban...</p>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Sikeres megerősítés!
          </h1>
          <p className="text-gray-700">
            Most már bejelentkezhetsz a fiókoddal.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="mt-6 px-6 py-2 bg-primary text-white rounded"
          >
            Belépés
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Érvénytelen vagy lejárt link
          </h1>
          <p className="text-gray-700 mb-4">Kérj új visszaigazoló emailt.</p>
          <button
            onClick={handleResend}
            className="px-6 py-2 bg-primary text-white rounded"
            disabled={!email}
          >
            Újraküldés
          </button>
        </>
      )}
    </div>
  );
}
