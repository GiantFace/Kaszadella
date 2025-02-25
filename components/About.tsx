"use client";
import React from "react";
import Header from "@/components/Header"; // vagy a helyes elérési út a fejléchez
import Footer from "@/components/Footer"; // importáld a már létrehozott footert

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-dark-100">
      {/* Fejléc */}
      <Header />

      {/* Fő tartalom */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8">Rólunk</h1>
        <p className="text-lg leading-relaxed text-center mb-12">
          A Tipster csapat egy szenvedélyes, kreatív és innovatív csoport, amely
          elkötelezett a minőségi tartalom és felhasználói élmény biztosítása
          mellett. Küldetésünk, hogy minden tippet és tanácsot olyan formában
          adjunk át, amely inspirál, segít és örömet okoz.
        </p>

        {/* Küldetés és Vízió */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Küldetésünk</h2>
            <p>
              Célunk, hogy az emberek életét egyszerűbbé és színesebbé tegyük a
              legjobb tippek és ötletek megosztásával. Minden nap új
              inspirációkkal állunk elő, hogy segítsünk eligazodni a mindennapi
              kihívásokban.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Víziónk</h2>
            <p>
              Hisszük, hogy a tudás hatalom, és a jó tanácsok megosztása a
              közösség fejlődésének kulcsa. Innovatív megoldásainkkal és kreatív
              ötleteinkkel szeretnénk inspirálni mindenkit, aki találkozik
              munkánkkal.
            </p>
          </div>
        </section>

        {/* Csapat bemutatása */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Csapatunk</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 p-6 bg-white rounded-lg shadow-lg text-center">
              <img
                src="/images/team/member1.jpg"
                alt="Csapattag 1"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Kovács Péter</h3>
              <p className="text-sm text-gray-600">CEO & Alapító</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-lg shadow-lg text-center">
              <img
                src="/images/team/member2.jpg"
                alt="Csapattag 2"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Nagy Anna</h3>
              <p className="text-sm text-gray-600">Marketing Vezető</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-lg shadow-lg text-center">
              <img
                src="/images/team/member3.jpg"
                alt="Csapattag 3"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Szabó István</h3>
              <p className="text-sm text-gray-600">Technikai Vezető</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
