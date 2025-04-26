"use client";
import { useState, useEffect } from "react";

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("isAdult");
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("isAdult", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    window.location.href = "https://google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-[9999]">
      <div className="bg-gradient-to-br from-white to-gray-100 p-10 rounded-3xl shadow-2xl text-center max-w-lg mx-auto border-4 border-yellow-400 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-black mb-8 animate-slide-down">
          Elmúltál már 18 éves?
        </h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleAccept}
            className="group relative overflow-hidden px-8 py-4 bg-yellow-400 text-black rounded-full text-xl font-bold transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-yellow-500 scale-0 group-hover:scale-150 transition-transform duration-500 ease-in-out origin-center"></span>
            <span className="relative z-10 group-hover:text-black">Igen</span>
          </button>
          <button
            onClick={handleDecline}
            className="group relative overflow-hidden px-8 py-4 border-2 border-yellow-400 text-black rounded-full text-xl font-bold transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-yellow-100 scale-0 group-hover:scale-150 transition-transform duration-500 ease-in-out origin-center"></span>
            <span className="relative z-10 group-hover:text-black">Nem</span>
          </button>
        </div>
      </div>
    </div>
  );
}
