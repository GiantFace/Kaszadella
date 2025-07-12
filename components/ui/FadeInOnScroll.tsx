"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

type FadeInOnScrollProps = {
  children: ReactNode;
};

export function FadeInOnScroll({ children }: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1) rotate(0deg)"
          : "translateY(30px) scale(0.9) rotate(3deg)",
        transition:
          "opacity 1s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      {children}
    </div>
  );
}
