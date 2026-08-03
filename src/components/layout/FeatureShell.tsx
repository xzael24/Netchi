"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE = "border-cream/25";

export function FeatureShell({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bodyRef.current) return;
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]",
        bodyRef.current!
      );
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          }
        );
      });
    }, bodyRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <header className={`grid grid-cols-[2.6%_18.81%_78%_1fr] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center border-r-2 border-cream/25 p-1 font-mono text-[9px] text-cream/30">
          {index}
        </div>
        <Link
          href="/"
          className={`flex items-center border-r-2 ${LINE} pl-2 md:pl-4 font-display font-bold tracking-widest transition-colors hover:text-cream/70`}
        >
          Netchi Sentinel
        </Link>
        <div className={`flex items-center justify-between border-r-2 ${LINE} px-3 md:px-4`}>
          <span className="font-mono text-xs tracking-widest uppercase text-cream/60">{label}</span>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-white">
            ← Beranda
          </Link>
        </div>
        <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">
          {label.split("//")[1] ?? "NETHI"}
        </div>
      </header>

      <div ref={bodyRef} className="flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-4xl" data-reveal>
          {children}
        </div>
      </div>

      {/* marquee polish strip */}
      <div className="overflow-hidden border-t-2 border-cream/25 py-1.5" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-widest text-cream/40">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  {label} • Netchi Sentinel • Lindungi Identitas Digitalmu •
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}