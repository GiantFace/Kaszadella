"use client";

import { motion } from "framer-motion";

export default function VerifyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full w-full px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
