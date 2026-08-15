"use client";

import { m, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

const LINE = "border-cream/25";

export function Hero({ headlineRef, buttonRef }: { headlineRef?: React.RefObject<HTMLDivElement>; buttonRef?: React.RefObject<HTMLDivElement> }) {
  const { setLocale, t } = useLocale();
  const arrowControls = useAnimation();
  const [langOpen, setLangOpen] = useState(false);
  const waveRef = useRef<HTMLDivElement>(null);
  const [waveVisible, setWaveVisible] = useState(true);

  useEffect(() => {
    const el = waveRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setWaveVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white w-screen min-w-full">
      <div className="bg-[#1A3CDB] text-cream grid grid-cols-[25px_32fr_33fr_29fr_25px] lg:grid-cols-[2.6%_30%_35%_29.05%_1fr] grid-rows-[27px_10vh_15vh_auto_auto] lg:grid-rows-[4vh_27vh_22vh_18vh_29vh] w-full min-w-full lg:h-dvh overflow-hidden content-start">
        {/* ── ROW 1: NAV (5 cells) ── */}
        <div className={`flex border-r-2 ${LINE} items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R1C1</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R1C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R1C3</div>
        <div className={`flex border-r-2 ${LINE} pl-2 md:pl-8 items-center justify-end container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R1C4</span>
          <Link href="/" className="font-display font-bold uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors cq-hero-nav">
            Menu
          </Link>
        </div>
        <div
          className={`flex pr-2 items-center justify-end relative container-cell`}
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R1C5</span>
          <button
            type="button"
            aria-label="Language"
            className="px-3 py-1.5 transition-colors relative z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 2.5 15.3 0 18c-2.5-2.7-2.5-15.3 0-18z" />
            </svg>
          </button>
          <AnimatePresence>
            {langOpen && (
              <m.div
                initial={{ opacity: 0, scaleY: 0.8, y: -8 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.8, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full right-0 z-10 flex flex-col items-stretch origin-top"
                style={{ minWidth: "100%" }}
              >
                <button onClick={() => { setLocale("id"); setLangOpen(false); }} className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full whitespace-nowrap">
                  ID
                </button>
                <button onClick={() => { setLocale("en"); setLangOpen(false); }} className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full whitespace-nowrap">
                  EN
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── ROW 2: HEADLINE (cols 2-4 span) ── */}
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R2C1</div>
        <div className={`col-span-3 border-b-2 border-r-2 ${LINE} flex items-stretch overflow-hidden container-cell relative`} ref={headlineRef}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R2C2</span>
          <h1 className="font-display font-bold leading-[0.82] tracking-[-0.03em] flex items-center justify-center lg:justify-start lg:ps-[33px] cq-hero-text w-full hero-rise">
            Netchi&nbsp;
            <span className="flex items-center">
              <span className="font-pixel mt-[0.15em] cq-hero-pixel">S</span>
              <span className="cq-hero-text">entinel</span>
            </span>
          </h1>
        </div>
        <div className={`border-b-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R2C5</div>

        {/* ── ROW 3: SUB-HEADLINE (col 2-3) ── */}
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C1</div>
        <div className={`col-span-2 border-b-2 border-r-2 ${LINE} px-4 md:px-10 py-2 md:py-3 container-cell overflow-hidden relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R3C2</span>
          <p
            className="font-display font-bold uppercase leading-[1.1] cq-hero-sub hero-rise-sub"
          >
            {t("hero.sub")}
          </p>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C4</div>
        <div className={`border-b-2 ${LINE} flex items-start justify-start container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R3C5</span>
          <span
            className="font-mono font-extrabold uppercase tracking-widest text-cream whitespace-nowrap cq-hero-label"
            style={{ writingMode: "vertical-rl" }}
          >
            0://HERO
          </span>
        </div>

        {/* ── ROW 4: DESCRIPTION (5 cells) ── */}
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C1</div>
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C2</div>
        <div className={`col-span-2 lg:col-span-1 border-b-2 border-r-2 ${LINE} px-4 md:px-8 flex items-center container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R4C3</span>
          <p
            className="font-display font-bold leading-relaxed text-cream/90 w-full cq-hero-desc hero-fade"
          >
            {t("hero.desc")}
          </p>
        </div>
        <div className={`hidden lg:flex border-b-2 border-r-2 ${LINE} items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C4</div>
        <div className={`border-b-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C5</div>

        {/* ── ROW 5: BARS + CTA (5 cells) ── */}
        <div className={`border-b-2 border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R5C1</div>
        <div ref={waveRef} className={`col-span-2 border-b-2 border-r-2 ${LINE} flex items-stretch overflow-hidden min-h-[120px] md:min-h-[220px] container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R5C2</span>
          <svg
            viewBox="0 0 500 230"
            className="wave-svg w-full h-full hero-wave"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f5f0d5" stopOpacity="0" />
                <stop offset="35%" stopColor="#f5f0d5" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f5f0d5" stopOpacity="0.25" />
              </linearGradient>
              <radialGradient id="waveGlow" cx="50%" cy="115%" r="75%">
                <stop offset="0%" stopColor="#f5f0d5" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#f5f0d5" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="500" height="230" fill="url(#waveGlow)" />
            {[
              { a: "M0,205 Q60,180 120,195 Q180,140 240,180 Q300,120 360,190 Q420,150 480,205", b: "M0,205 Q60,220 120,185 Q180,210 240,170 Q300,210 360,170 Q420,200 480,195", s: 1.4 },
              { a: "M0,180 Q80,150 160,175 Q240,110 320,165 Q380,200 440,180", b: "M0,180 Q80,200 160,160 Q240,200 320,150 Q380,160 440,170", s: 0.9 },
              { a: "M0,155 Q70,130 140,150 Q200,180 260,140 Q320,100 380,155 Q430,180 480,155", b: "M0,155 Q70,170 140,140 Q200,140 260,170 Q320,170 380,140 Q430,140 480,145", s: 1.1 },
              { a: "M0,130 Q90,160 180,120 Q260,80 340,135 Q400,170 460,130", b: "M0,130 Q90,110 180,150 Q260,170 340,115 Q400,100 460,140", s: 0.7 },
              { a: "M0,105 Q60,80 120,100 Q180,50 240,95 Q300,130 360,85 Q420,60 480,105", b: "M0,105 Q60,120 120,90 Q180,130 240,80 Q300,90 360,110 Q420,130 480,95", s: 1.2 },
              { a: "M0,80 Q80,110 160,85 Q240,60 320,100 Q380,130 440,80", b: "M0,80 Q80,60 160,110 Q240,120 320,80 Q380,90 440,90", s: 0.8 },
              { a: "M0,55 Q70,40 140,55 Q200,90 260,45 Q320,20 380,60 Q430,90 480,55", b: "M0,55 Q70,70 140,45 Q200,50 260,70 Q320,80 380,45 Q430,50 480,65", s: 1 },
              { a: "M0,30 Q80,10 160,35 Q240,60 320,20 Q380,5 440,30", b: "M0,30 Q80,50 160,20 Q240,20 320,40 Q380,50 440,20", s: 0.85 },
            ].map((line, i) =>
              waveVisible ? (
                <m.path
                  key={i}
                  className="wave-path"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth={line.s}
                  opacity={0}
                  style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                  initial={{ d: line.a }}
                  animate={{ d: [line.a, line.b, line.a] }}
                  transition={{
                    duration: 3 + i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6 + i * 0.2,
                  }}
                />
              ) : (
                <path
                  key={i}
                  className="wave-path"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth={line.s}
                  opacity={0}
                  style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                  d={line.a}
                />
              )
            )}
          </svg>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE} flex flex-col items-stretch justify-between container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R5C4-1</span>
          <div className="flex border-b-2 border-cream/25" ref={buttonRef}>
            <Link
              href="/breach-checker"
              className="flex w-full items-center justify-center bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest px-2 py-2.5 md:px-5 md:py-3 hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors font-bold cq-hero-cta text-center"
            >
              {t("nav.start")}
            </Link>
          </div>
          <div className="flex flex-col justify-start pl-1 pr-2 md:pr-6 pb-5 pt-2 md:pt-12 relative">
            <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R5C4-2</span>
            <div
              onMouseEnter={() =>
                arrowControls.start({
                  y: [0, 12, 12, -12, -12, 0],
                  opacity: [1, 0, 0, 0, 1, 1],
                  transition: { duration: 0.7, repeat: Infinity, ease: "linear" },
                })
              }
              onMouseLeave={() => {
                arrowControls.stop();
                arrowControls.set({ y: 0, opacity: 1 });
              }}
            >
              <span
                className="group flex items-center gap-2 font-mono uppercase tracking-widest text-cream font-bold px-3 py-2 rounded transition-colors cq-hero-cta cursor-default whitespace-nowrap"
              >
                {t("hero.explore")}
                <m.span
                  animate={arrowControls}
                  className="inline-block"
                >
                  ↓
                </m.span>
              </span>
            </div>
          </div>
        </div>
        <div className={`border-b-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R5C5</div>
      </div>
    </section>
  );
}