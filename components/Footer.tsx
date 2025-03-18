import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Márkanév és jogi szöveg */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Kaszadella
          </h2>
          <p className="mt-2 text-base md:text-lg">
            &copy; {new Date().getFullYear()} Kaszadella. Minden jog fenntartva.
          </p>
        </div>
        {/* Navigáció */}
        <nav className="grid grid-cols-3 gap-4 md:flex md:space-x-8 justify-center align-center">
          <Link
            href="/about"
            className="text-base md:text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Rólunk
          </Link>
          <Link
            href="/contact"
            className="text-base md:text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Kapcsolat
          </Link>
          <Link
            href="/privacy"
            className="text-base md:text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Adatvédelem
          </Link>
          <Link
            href="/terms"
            className="text-base md:text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Feltételek
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
