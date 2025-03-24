"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Session } from "next-auth";

interface HeaderProps {
  session: Session;
}

const About: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen  text-white"
      style={{
        backgroundImage: "url('/LandingPage.svg')",
        backgroundSize: "cover",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fő tartalom */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Cím és bemutatkozás */}
        <section className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
            Rólunk
          </h1>
          <p className="mt-4 text-xl text-white max-w-3xl mx-auto">
            A Tipster csapat egy szenvedélyes, kreatív és innovatív csoport,
            amely elkötelezett a minőségi tartalom és felhasználói élmény
            biztosítása mellett. Küldetésünk, hogy minden tippet és tanácsot
            olyan formában adjunk át, amely inspirál, segít és örömet okoz.
          </p>
        </section>

        {/* Küldetés és Vízió */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="p-8 bg-white/90 rounded-xl shadow-2xl transition transform hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">
              Küldetésünk
            </h2>
            <p className="text-gray-700">
              Célunk, hogy az emberek életét egyszerűbbé és színesebbé tegyük a
              legjobb tippek és ötletek megosztásával. Minden nap új
              inspirációkkal állunk elő, hogy segítsünk eligazodni a mindennapi
              kihívásokban.
            </p>
          </div>
          <div className="p-8 bg-white/90 rounded-xl shadow-2xl transition transform hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">Víziónk</h2>
            <p className="text-gray-700">
              Hisszük, hogy a tudás hatalom, és a jó tanácsok megosztása a
              közösség fejlődésének kulcsa. Innovatív megoldásainkkal és kreatív
              ötleteinkkel szeretnénk inspirálni mindenkit, aki találkozik
              munkánkkal.
            </p>
          </div>
        </section>

        {/* Csapat bemutatása */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Csapatunk
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-64 p-6 bg-white rounded-xl shadow-xl text-center transition transform hover:scale-105">
              <img
                src="/images/Kaszadella_halal_kaszadella_pack.png"
                alt="Csapattag 1"
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-teal-800">Név 1</h3>
              <p className="text-md text-gray-600">CEO & Alapító</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-xl shadow-xl text-center transition transform hover:scale-105">
              <img
                src="/images/team/member2.jpg"
                alt="Csapattag 2"
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-teal-800">Név 2</h3>
              <p className="text-md text-gray-600">Marketing Vezető</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-xl shadow-xl text-center transition transform hover:scale-105">
              <img
                src="/images/team/member3.jpg"
                alt="Csapattag 3"
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-teal-800">Név 3</h3>
              <p className="text-md text-gray-600">Technikai Vezető</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
