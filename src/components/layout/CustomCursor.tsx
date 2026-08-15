"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 600, damping: 40 });
  const ringY = useSpring(y, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, input, [data-cursor], textarea, select, label")
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4d4d]"
        style={{ x, y }}
      />
      <m.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[199] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/60 transition-colors duration-300 ${
          hovering ? "border-[#ff4d4d] bg-[#ff4d4d]/10" : ""
        }`}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}