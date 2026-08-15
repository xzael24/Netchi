"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({
  children,
  strength = 0.3,
  pull = 1,
}: {
  children: React.ReactNode;
  strength?: number;
  pull?: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength * pull);
    y.set((e.clientY - (r.top + r.height / 2)) * strength * pull);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="block"
    >
      {children}
    </m.div>
  );
}