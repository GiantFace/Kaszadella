"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface OverHeaderProps {
  children: ReactNode;
}

const OverHeader: React.FC<OverHeaderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR alatt nincs 'document', ezért csak akkor rendereljük, ha már a kliens oldalon vagyunk
  if (!mounted) return null;

  return createPortal(
    <div className=" absolute right-10 top-12">{children}</div>,
    document.body,
  );
};

export default OverHeader;
