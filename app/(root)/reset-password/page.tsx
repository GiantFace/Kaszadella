"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast({
        variant: "destructive",
        title: "A jelszavak nem egyeznek",
      });
      return;
    }

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      toast({
        title: "Sikeres jelszóváltoztatás",
        front_description: "Most már bejelentkezhetsz az új jelszavaddal.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        front_description: "A token érvénytelen vagy lejárt.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Új jelszó megadása</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Új jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Jelszó megerősítése"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Jelszó mentése
        </button>
      </form>
    </div>
  );
}
