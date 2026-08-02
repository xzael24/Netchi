"use client";

import { useRef, useLayoutEffect } from "react";

const BARS = 16;

export function Section4() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = curtainRef.current;
    if (!el) return;
    const setHeights = () => {
      const total = window.innerHeight;
      const h = Math.floor(total / BARS);
      Array.from(el.children).forEach((c, i) => {
        (c as HTMLElement).style.height =
          i === BARS - 1 ? `${total - h * (BARS - 1)}px` : `${h}px`;
      });
    };
    setHeights();
    window.addEventListener("resize", setHeights);
    return () => window.removeEventListener("resize", setHeights);
  }, []);

  return (
    <section className="relative bg-white text-[#1A3CDB] w-full h-full overflow-hidden">
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-16 text-center">
        <span className="font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase mb-8">
          (3)//Kutipan
        </span>

        <blockquote className="max-w-4xl">
          <p className="font-display font-bold leading-[1.08] tracking-[-0.02em] text-[#1A3CDB] text-[clamp(1.25rem,3.2vw,2.6rem)]">
            “Privacy is not an option, and it shouldn't be the price we accept for
            just getting on the internet.”
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col items-center">
          <span className="font-mono text-[#1A3CDB]/70 text-sm md:text-base tracking-widest uppercase">
            — Gary Kovacs
          </span>
          <span className="font-mono text-[#1A3CDB]/40 text-xs md:text-sm mt-2">
            mantan CEO Mozilla
          </span>
        </div>
      </div>

      <div ref={curtainRef} className="absolute inset-0 z-20 flex flex-col will-change-transform" aria-hidden>
        {Array.from({ length: BARS }).map((_, i) => (
          <div
            key={i}
            data-curtain-bar
            className={`w-full origin-top will-change-transform backface-hidden ${i % 2 ? "bg-[#1530B8]" : "bg-[#1A3CDB]"}`}
            style={{ height: `${100 / BARS}%` }}
          />
        ))}
      </div>
    </section>
  );
}
