"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LINE = "border-cream/25";

export function Hero() {
  return (
    <section className="min-h-screen bg-[#1A3CDB] text-cream">
      <div className="min-h-screen grid grid-cols-[2.6%_30%_35%_29.05%_1fr] grid-rows-[44px_250px_150px_auto_auto]">
        {/* ── ROW 1: NAV (5 cells) ── */}
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE} px-6 md:px-8 flex items-center justify-end`}>
          <Link href="#" className="font-display font-bold text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors">
            Menu
          </Link>
        </div>
        <div className={`border-b-2 ${LINE} px-3 md:px-4 flex items-center justify-center`}>
          <button type="button" aria-label="Language" className="p-1.5 hover:bg-[#EF4444] transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="md:w-5 md:h-5">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 2.5 15.3 0 18c-2.5-2.7-2.5-15.3 0-18z" />
            </svg>
          </button>
        </div>

        {/* ── ROW 2: HEADLINE (5 cells, garis 2 & 3 hidden) ── */}
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE} px-6 md:px-10 flex items-end pb-3 md:pb-4`}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[0.82] tracking-[-0.03em] text-[18vw] md:text-[13vw] flex items-center ml-[-2vw]"
          >
            Netchi&nbsp;
            <span className="flex items-center ml-[2.5vw]">
              <span className="font-pixel text-[0.78em] md:text-[0.7em] mt-[0.15em]">S</span>
              <span>entinel</span>
            </span>
          </motion.h1>
        </div>
        <div className={`border-b-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE}`} />

        {/* ── ROW 3: SUB-HEADLINE (5 cells, garis 2 hidden) ── */}
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE} px-6 md:px-10 py-2 md:py-3`}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display font-bold text-sm md:text-xl lg:text-2xl xl:text-3xl uppercase leading-snug"
          >
            Privasi Data &amp; Proteksi Identitas Digital yang Melawan Kompleksitas
          </motion.p>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE}`} />

        {/* ── ROW 4: DESCRIPTION (5 cells) ── */}
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE} px-6 md:px-8 py-2 md:py-3`}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[10px] md:text-xs leading-relaxed text-cream/80 max-w-md"
          >
            Data pribadimu adalah aset berharga — namun sering kali rentan.
            Netchi hadir membantumu memahami, memeriksa, dan melindungi
            identitas digital dari anancaman kebocoran data.
          </motion.p>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE}`} />

        {/* ── ROW 5: BARS + CTA (5 cells) ── */}
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 border-r-2 ${LINE} flex items-center px-6 md:px-10 overflow-hidden min-h-[160px] md:min-h-[220px]`}>
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewBox="0 0 500 110"
            className="w-full h-20 md:h-28"
            preserveAspectRatio="none"
          >
            {[
              { x: 0, w: 420, o: 1 },
              { x: 100, w: 300, o: 0.35 },
              { x: 0, w: 500, o: 1 },
              { x: 180, w: 220, o: 0.3 },
              { x: 0, w: 380, o: 1 },
              { x: 60, w: 380, o: 0.45 },
              { x: 0, w: 460, o: 1 },
              { x: 140, w: 280, o: 0.3 },
            ].map((bar, i) => (
              <rect key={i} x={bar.x} y={i * 13} width={bar.w} height={9} fill="#f5f0d5" opacity={bar.o} />
            ))}
          </motion.svg>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE} px-4 md:px-6 flex flex-col items-end justify-between py-5`}>
          <Link
            href="/breach"
            className="bg-[#EF4444] text-cream font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-5 py-2.5 md:py-3 hover:bg-[#DC2626] transition-colors"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/privacy-score"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/60 hover:text-cream transition-colors"
          >
            Jelajahi
            <span className="group-hover:translate-y-[2px] transition-transform">↓</span>
          </Link>
        </div>
        <div className={`border-b-2 border-r-2 ${LINE}`} />
        <div className={`border-b-2 ${LINE}`} />
      </div>
    </section>
  );
}
