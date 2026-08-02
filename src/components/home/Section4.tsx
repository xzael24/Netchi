"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLUE = "bg-[#1A3CDB]";
const LIGHT = "bg-[#1A3CDB]/25";
const FAINT = "bg-[#1A3CDB]/10";

const ART_TOP: { w: string; c: string }[][] = [
  [{ w: "100%", c: BLUE }],
  [{ w: "22%", c: LIGHT }, { w: "78%", c: BLUE }],
  [{ w: "41%", c: BLUE }, { w: "14%", c: FAINT }, { w: "45%", c: LIGHT }],
  [{ w: "18%", c: LIGHT }, { w: "50%", c: BLUE }, { w: "32%", c: FAINT }],
  [{ w: "100%", c: BLUE }],
  [{ w: "58%", c: FAINT }, { w: "42%", c: BLUE }],
  [{ w: "33%", c: BLUE }, { w: "67%", c: LIGHT }],
  [{ w: "12%", c: LIGHT }, { w: "64%", c: BLUE }, { w: "24%", c: LIGHT }],
];

const ART_BOTTOM: { w: string; c: string }[][] = [
  [{ w: "30%", c: LIGHT }, { w: "70%", c: BLUE }],
  [{ w: "52%", c: BLUE }, { w: "48%", c: FAINT }],
  [{ w: "100%", c: BLUE }],
  [{ w: "26%", c: LIGHT }, { w: "38%", c: FAINT }, { w: "36%", c: BLUE }],
  [{ w: "15%", c: BLUE }, { w: "85%", c: LIGHT }],
  [{ w: "100%", c: BLUE }],
];

export function Section4() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        once: true,
      });

      gsap.fromTo(
        ".s4-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        }
      );

      gsap.fromTo(
        ".s4-label, .s4-link, .s4-foot",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.4,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        }
      );

      gsap.fromTo(
        ".s4-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        }
      );

      return () => st.kill();
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-white text-[#1A3CDB] w-full h-full overflow-hidden flex flex-col"
    >
      <div className="s4-label font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase pt-6 px-6">
        (4)//Kesimpulan
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-14 flex flex-col gap-1 px-6 opacity-90">
        {ART_TOP.map((row, ri) => (
          <div key={`t${ri}`} className="flex gap-1 w-full">
            {row.map((seg, si) => (
              <div
                key={`${ri}-${si}`}
                className={`s4-bar h-2 md:h-2.5 origin-left ${seg.c}`}
                style={{ width: seg.w }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-6 pb-6 opacity-90">
        {ART_BOTTOM.map((row, ri) => (
          <div key={`b${ri}`} className="flex gap-1 w-full">
            {row.map((seg, si) => (
              <div
                key={`${ri}-${si}`}
                className={`s4-bar h-2 md:h-2.5 origin-left ${seg.c}`}
                style={{ width: seg.w }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="s4-label font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase mb-8">
          data yang bocor nggak bisa ditarik kembali
        </p>

        <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,7cqw,5.5rem)] text-[#1A3CDB]">
          <span className="block overflow-hidden py-1">
            <span className="s4-line block">Yang belum bocor,</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="s4-line block">masih milikmu.</span>
          </span>
        </h2>

        <p className="s4-foot mt-8 max-w-md font-mono text-[#1A3CDB]/50 text-xs md:text-sm leading-relaxed">
          Cek, perkuat, dan lindungi identitas digitalmu sekarang —
          sebelum jadi statistik berikutnya.
        </p>

        <a
          href="/breach"
          className="s4-link group mt-10 inline-flex items-center gap-3 px-8 py-4 bg-[#1A3CDB] text-white font-display font-bold text-[clamp(0.9rem,1.6cqw,1.1rem)] rounded-full hover:bg-[#1A3CDB]/90 transition-colors"
        >
          Mulai Lindungi Sekarang
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="s4-foot font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase pb-6 px-6 flex items-center justify-between">
        <span>5://FINAL</span>
        <span>Netchi Privacy Shield</span>
      </div>
    </section>
  );
}
