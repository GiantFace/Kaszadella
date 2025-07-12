// app/(root)/tutorial/page.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Tutorial() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary-turquoise mb-10 animate-bounce">
        Mindenre is igyekszünk választ adni! 🎥
      </h1>

      <div className="relative w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border-4 border-primary-turquoise animate-pulse-slow">
        <video
          src="/tutorial.mp4" // majd ide a jó videó elérési út
          controls
          className="w-full h-auto rounded-3xl"
        >
          A böngésződ nem támogatja a videó lejátszást.
        </video>
      </div>

      <div className="mt-10 text-center text-gray-300 text-lg max-w-2xl animate-fade-in">
        <p className="mb-6">
          Itt találod az oldal használatához szükséges legfontosabb
          információkat és útmutatókat. Nézd meg az alábbi videót, hogy
          könnyedén eligazodj a rendszerünkben!
        </p>

        <p className="mb-6">
          Ha még mindig kérdésed lenne, csatlakozz hozzánk a{" "}
          <Link
            href="https://www.facebook.com/groups/671403415665322"
            target="_blank"
            className="underline text-primary-turquoise hover:text-white"
          >
            Facebook csoportunkban
          </Link>{" "}
          és tedd fel bátran!
        </p>

        <p>
          Vagy írj nekünk közvetlenül{" "}
          <Link
            href="/contact"
            className="underline text-primary-turquoise hover:text-white"
          >
            a Kapcsolat menüpontban
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
