"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header-glass my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo3.png" alt="logo" height={70} width={70} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/tips"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/tips" ? "border-l-dark-100" : "text-pink-500",
            )}
          >
            Tippek
          </Link>
        </li>
        <li>
          <Link
            href="/sign-in"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/tips" ? "text-pink-500" : "text-dark-100",
            )}
          >
            Belépés
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
