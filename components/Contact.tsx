"use client";
import React from "react";
import Header from "@/components/Header"; // a helyes elérési út
import Footer from "@/components/Footer"; // a helyes elérési út

const ContactPage: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-primary-turquoise text-dark-100"
      style={{
        backgroundImage: "url('/LandingPage.svg')",
        backgroundSize: "cover",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fejléc */}
      {/*<Header session={Session} />*/}

      {/* Fő tartalom */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8">Kapcsolat</h1>
        <p className="text-lg leading-relaxed text-center mb-12">
          Ha kérdésed van, vagy bármilyen észrevételed, itt tudsz kapcsolatba
          lépni velünk.
        </p>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6">
            {/* Név */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark-100"
              >
                Név
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark-100"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Üzenet */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-dark-100"
              >
                Üzenet
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            {/* Gomb */}
            <button
              type="submit"
              className="form-btn w-full bg-primary-turquoise text-dark-100 font-bold py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Küldés
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
