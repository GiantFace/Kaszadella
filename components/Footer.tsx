import React from "react";
import Link from "next/link";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white py-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight">Kaszadella</h2>
          <p className="mt-2 text-lg">
            &copy; {new Date().getFullYear()} Kaszadella. Minden jog fenntartva.
          </p>
        </div>
        <nav className="flex space-x-8">
          <a
            href="/about"
            className="text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Rólunk
          </a>
          <a
            href="/contact"
            className="text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Kapcsolat
          </a>
          <a
            href="/privacy"
            className="text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Adatvédelem
          </a>
          <a
            href="/terms"
            className="text-lg font-medium hover:text-gray-200 transition-colors"
          >
            Feltételek
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
