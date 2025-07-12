"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import Image from "next/image";
//import config from "@/lib/config";
import coverImage from "next/image";
import TipChart from "@/components/TipChart";

type TipCoverVariant = "exraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<TipCoverVariant, string> = {
  exraSmall: "book-cover_extra-small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};
interface Props {
  className?: string;
  variant?: TipCoverVariant;
  coverColor: string;
  coverUrl: string;
}
const TipCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      ></div>
    </div>
  );
};
export default TipCover;
