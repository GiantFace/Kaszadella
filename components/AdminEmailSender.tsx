"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  subscribed: boolean;
}

export default function AdminEmailSender() {
  const [users, setUsers] = useState<User[]>([]);
  const [customEmails, setCustomEmails] = useState<string>("");
  const [selectedTarget, setSelectedTarget] = useState<string>("all");
  const [subject, setSubject] = useState<string>("Kaszadella tippjei");
  const [message, setMessage] = useState<string>("");
  const [useDefaultMessage, setUseDefaultMessage] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (useDefaultMessage) {
      const today = new Date();
      const dateStr = today.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setMessage(`
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #222;">
    <h2 style="color: #0088cc;">🎯 Üdvözöl a <strong>Kaszadella!</strong> 🎯</h2>
    <p>📅 A mai napi <strong>${dateStr}</strong> tippjeid megérkeztek!</p>

    <p style="margin-top: 20px;">
      🔥 <strong>Ne maradj le a nyereményről</strong> – mert bizalom nélkül nincs nyereség:<br />
      👉 <a href="https://kaszadella.vercel.app/tips" style="color: #0088cc;">https://kaszadella.vercel.app/tips</a>
    </p>

    <p style="margin-top: 30px;">
      📬 Bármilyen kérdés esetén keress minket bizalommal!
    </p>

    <p style="margin-top: 40px;">
      Üdvözlettel,<br />
      <strong>A Kaszadella csapata ⚡</strong>
    </p>
  </div>
`);
    }
  }, [useDefaultMessage]);

  const handleSend = async () => {
    setSending(true);
    setStatus("");

    const payload = {
      selectedTarget,
      customEmails:
        selectedTarget === "custom"
          ? customEmails
              .split(",")
              .map((e) => e.trim())
              .filter((e) => e)
          : [],
      subject,
      message,
    };

    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Sikertelen küldés");

      setStatus("✅ Email(ek) sikeresen elküldve");
    } catch (err) {
      console.error("❌ Email küldési hiba:", err);
      setStatus("❌ Hiba az email küldésekor");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Tipp email küldése</h2>

      <div className="mb-4">
        <label className="block mb-2 text-black font-semibold">Címzettek</label>
        <select
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
          className="border px-2 py-1 w-full mb-2"
        >
          <option value="all">📩 Minden felhasználónak</option>
          <option value="custom">✉️ Egyedi email cím(ek)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id.toString()}>
              {u.name || u.email}
            </option>
          ))}
        </select>
        {selectedTarget === "custom" && (
          <input
            type="text"
            placeholder="email1@example.com, email2@example.com"
            value={customEmails}
            onChange={(e) => setCustomEmails(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black font-semibold">Tárgy</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black font-semibold">
          Üzenet típusa
        </label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              checked={useDefaultMessage}
              onChange={() => setUseDefaultMessage(true)}
            />
            Alapértelmezett sablon
          </label>
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              checked={!useDefaultMessage}
              onChange={() => setUseDefaultMessage(false)}
            />
            Egyedi üzenet
          </label>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="border px-2 py-1 w-full"
          disabled={useDefaultMessage}
        />
      </div>

      <button
        disabled={sending}
        onClick={handleSend}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow"
      >
        {sending ? "Küldés folyamatban..." : "Email küldése"}
      </button>

      {status && <div className="mt-4 text-black">{status}</div>}
    </div>
  );
}
