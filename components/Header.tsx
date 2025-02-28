"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header-glass flex justify-between items-center px-6 py-4 shadow-lg">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/icons/logo3.png" alt="logo" height={70} width={70} />
        <h1 className="text-lg font-semibold text-white">Kaszadella</h1>
      </Link>
      <ul className="flex flex-row items-center gap-6">
        {[
          { name: "Kezdőlap", href: "/" },
          { name: "Tippek", href: "/tips" },
          { name: "Előfizetés", href: "/subscription" },
          { name: "Belépés", href: "/auth" },
        ].map(({ name, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "header-button",
                pathname === href
                  ? "border-2  border-yellow text-yellow rounded-lg"
                  : "border-2  border-yellow text-yellow rounded-lg",
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
