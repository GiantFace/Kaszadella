// components/AdminEmailSender.tsx
"use client";

import React, { useState } from "react";

export default function EmailSender() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    alert(`Email elküldve:\nTárgy: ${subject}\nÜzenet: ${message}`);
    setSubject("");
    setMessage("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Email küldése a felhasználóknak
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tárgy"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border px-2 py-1 w-full mb-2"
        />
        <textarea
          placeholder="Üzenet"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-2 py-1 w-full mb-2"
          rows={4}
        ></textarea>
      </div>
      <button
        onClick={handleSendEmail}
        className="px-4 py-2 border rounded bg-blue-500 text-white"
      >
        Email küldése
      </button>
    </div>
  );
}
