"use client";
import React from "react";
import Header from "@/components/Header"; // a megfelelő elérési út a Header-hez

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-dark-100">
      {/* Fejléc */}
      <Header />

      {/* Fő tartalom */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          Adatvédelmi Nyilatkozat
        </h1>
        <p className="text-lg leading-relaxed text-center mb-12">
          Ebben a nyilatkozatban ismertetjük, hogyan gyűjtjük, használjuk és
          védjük az Ön személyes adatait. Fontos számunkra az átláthatóság és az
          Ön adatainak biztonsága.
        </p>

        {/* Adatgyűjtés */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Adatgyűjtés</h2>
          <p className="text-lg leading-relaxed">
            Weboldalunk használata során bizonyos személyes adatokat gyűjtünk,
            mint például az IP-cím, böngészési adatok, és a kapcsolatfelvételi
            űrlap kitöltése során megadott információk. Ezeket az adatokat
            kizárólag a szolgáltatásaink javítása és az Ön élményének növelése
            érdekében használjuk.
          </p>
        </section>

        {/* Adatfelhasználás */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Adatfelhasználás</h2>
          <p className="text-lg leading-relaxed">
            Az összegyűjtött adatokat a következő célokra használjuk: a weboldal
            működtetése, a szolgáltatások személyre szabása, a felhasználói
            élmény javítása, valamint az esetleges technikai problémák gyors
            elhárítása.
          </p>
        </section>

        {/* Adatbiztonság */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Adatbiztonság</h2>
          <p className="text-lg leading-relaxed">
            Megfelelő technikai és szervezési intézkedéseket alkalmazunk annak
            érdekében, hogy megvédjük az Ön adatait a jogosulatlan
            hozzáféréstől, módosítástól vagy megsemmisítéstől.
          </p>
        </section>

        {/* Kapcsolat */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Kapcsolat</h2>
          <p className="text-lg leading-relaxed">
            Amennyiben kérdése, észrevétele van adatvédelmi gyakorlatunkkal
            kapcsolatban, kérjük, lépjen kapcsolatba velünk a kapcsolatfelvételi
            oldalunkon.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
