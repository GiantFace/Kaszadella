"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg"
      >
        <motion.span
          className="text-3xl md:text-5xl select-none"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        >
          <Image
            src="/images/kasza.png"
            alt="Kasdzadella kasza"
            height={70}
            width={70}
          />
        </motion.span>
      </motion.div>

      <motion.h2
        className="mt-8 text-center font-bold tracking-wide text-white text-xl md:text-2xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Töltődik Kaszadella világa...
      </motion.h2>
    </div>
  );
}
