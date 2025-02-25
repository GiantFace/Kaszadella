"use client";
import React from "react";
import Header from "@/components/Header"; // Győződj meg róla, hogy a helyes elérési út
import Footer from "@/components/Footer"; // Győződj meg róla, hogy a helyes elérési út

const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-dark-100">
      {/* Fejléc */}
      <Header />

      {/* Fő tartalom */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8">Feltételek</h1>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Általános Feltételek</h2>
          <p className="text-lg leading-relaxed">
            Ezek a feltételek szabályozzák a Tipster weboldal használatát. A
            weboldal használatával Ön elfogadja ezeket a feltételeket. Kérjük,
            figyelmesen olvassa el őket, mielőtt bármilyen szolgáltatást igénybe
            venne.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Szellemi Tulajdon</h2>
          <p className="text-lg leading-relaxed">
            Minden tartalom, képek, logók és szoftver a Tipster tulajdonát
            képezi. Ezeket engedély nélkül nem használhatja, másolhatja,
            módosíthatja vagy terjesztheti.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Felelősségkorlátozás</h2>
          <p className="text-lg leading-relaxed">
            A Tipster nem vállal felelősséget semmilyen közvetlen, közvetett,
            véletlenszerű, speciális vagy következményes kárért, amely a
            weboldal használatából ered.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Adatvédelem</h2>
          <p className="text-lg leading-relaxed">
            Az adatvédelmi gyakorlatunkról kérjük, tekintse meg adatvédelmi
            nyilatkozatunkat.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Feltételek Módosítása</h2>
          <p className="text-lg leading-relaxed">
            A Tipster fenntartja a jogot, hogy időről időre módosítsa ezeket a
            feltételeket. A változásokról megfelelően tájékoztatjuk a
            felhasználókat a weboldalon.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsPage;
