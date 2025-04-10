"use client";

import { useState } from "react";

export default function AdminAddTipForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    package: "START",
    day: "Hétfő",
    tip: "",
    oddsSummary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/add-tip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSuccess();
      setForm({ package: "START", day: "Hétfő", tip: "", oddsSummary: "" });
    } else {
      alert("Hiba a mentés közben.");
    }
  };

  return (
    <form className="space-y-4 bg-white shadow p-4 rounded mb-6">
      <select
        name="package"
        value={form.package}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="START">Start</option>
        <option value="KASZA">Kasza</option>
        <option value="KASZADELLA">Kaszadella</option>
      </select>
      <select
        name="day"
        value={form.day}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="Hétfő">Hétfő</option>
        <option value="Kedd">Kedd</option>
        <option value="Szerda">Szerda</option>
        <option value="CSütörtök">Csütörtök</option>
        <option value="Péntek">Péntek</option>
        <option value="Szombat">Szombat</option>
        <option value="Vasárnap">Vasárnap</option>
      </select>
      <input
        type="text"
        name="tip"
        placeholder="Tipp szöveg"
        value={form.tip}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        name="oddsSummary"
        placeholder="Összesített odds (opcionális)"
        value={form.oddsSummary}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Mentés
      </button>
    </form>
  );
}
