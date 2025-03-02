"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Kezdőlap", href: "/" },
    { name: "Tippek", href: "/tips" },
    { name: "Előfizetés", href: "/subscription" },
    { name: "Belépés", href: "/auth" },
  ];

  return (
    <header className="header-glass flex justify-between items-center px-6 py-4 shadow-lg relative">
      {/* Logo és márkanév */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/icons/logo3.png" alt="logo" height={70} width={70} />
        <h1 className="text-lg font-semibold text-white">Kaszadella</h1>
      </Link>

      {/* Asztali navigáció: csak md és felett látszik */}
      <ul className="hidden md:flex flex-row items-center gap-6">
        {navLinks.map(({ name, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "header-button",
                pathname === href
                  ? "border-2 border-yellow text-yellow rounded-lg"
                  : "border-2 border-yellow text-yellow rounded-lg",
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobil hamburger ikon: csak kisebb képernyőkön látszik */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobil menü: ha hamburgerre kattintanak */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black/80 text-white md:hidden">
          <ul className="flex flex-col gap-4 p-4">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  onClick={() => setMenuOpen(false)}
                  href={href}
                  className="header-button block"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
