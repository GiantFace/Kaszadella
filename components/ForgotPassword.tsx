"use client";

import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast({
        variant: "default",
        title: "Email elküldve!",
        front_description:
          "Kérjük, ellenőrizd az email fiókodat a jelszó visszaállításhoz.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        front_description: "Próbáld meg újra később.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Elfelejtettem a jelszavamat</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Add meg az email címed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Küldés
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
