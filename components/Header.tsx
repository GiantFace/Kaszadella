"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";

interface HeaderProps {
  session?: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Kezdőlap", href: "/" },
    { name: "Tippek", href: "/tips" },
    { name: "Előfizetés", href: "/subscription" },
    { name: "Belépés", href: "/sign-up" },
  ];

  // A "Belépés" helyett, ha be van jelentkezve, profil linket jelenítünk meg
  const renderLink = (name: string, href: string, extraProps = {}) => {
    if (name === "Belépés" && session && session.user) {
      return (
        <Link href="/my-profile" {...extraProps} className="bg-zinc-950">
          <Avatar>
            {session.user.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name || "User"}
              />
            ) : (
              <AvatarFallback>
                {getInitials(session.user.name || "User")}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      );
    }
    return (
      <Link href={href} {...extraProps}>
        {name}
      </Link>
    );
  };

  return (
    <header className="header-glass relative flex justify-between items-center px-6 py-2 shadow-lg">
      {/* Logo és márkanév */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/moneyBag.svg" alt="logo" height={100} width={100} />
        <h1 className="text-lg font-semibold text-white">Kaszadella</h1>
      </Link>

      {/* Asztali navigáció: csak md és felett látszik */}
      <ul className="hidden md:flex flex-row items-center gap-6">
        {navLinks.map(({ name, href }) => (
          <li key={href}>
            {renderLink(name, href, {
              className: cn(
                "header-button",
                pathname === href
                  ? "text-yellow rounded-lg"
                  : "text-yellow rounded-lg",
              ),
            })}
          </li>
        ))}
      </ul>

      {/* Mobil hamburger ikon: csak kisebb képernyőkön látszik */}
      <div className="md:hidden flex flex-row items-center">
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
          <ul className="flex flexrow gap-2 p-4">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                {renderLink(name, href, {
                  onClick: () => setMenuOpen(false),
                  className: "header-button block",
                })}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
