"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 0.7,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    const t = setTimeout(() => setDone(true), 780);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#1A3CDB] text-cream"
        initial={{ y: 0 }}
        animate={{ y: done ? "-100%" : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="font-display font-extrabold tracking-[-0.03em] text-[clamp(2rem,6vw,4rem)]">
          Netchi&nbsp;
          <span className="font-pixel text-[clamp(1rem,3vw,2rem)]">S</span>
          entinel
        </span>
        <span className="mt-3 font-mono text-sm tracking-widest text-cream/50">{count}%</span>
        <div className="mt-4 h-0.5 w-40 overflow-hidden bg-cream/20">
          <div
            className="h-full bg-cream transition-[width] duration-150 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}