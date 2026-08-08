"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";

export function FeatureShell({
  label,
  children,
}: {
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
            delay: 0.8,
          }
        );
      });
    }, bodyRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <Navbar />

      <div ref={bodyRef} className="flex-1 px-6 pt-[88px] pb-12 md:px-10 lg:pt-[64px]">
        <div className="mx-auto max-w-4xl" data-reveal>
          {children}
        </div>
      </div>

      {/* marquee polish strip — fixed to viewport bottom */}
      <div className="fixed bottom-0 left-0 z-40 w-full overflow-hidden border-t-2 border-cream/25 bg-[#1A3CDB] py-1.5" aria-hidden>
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