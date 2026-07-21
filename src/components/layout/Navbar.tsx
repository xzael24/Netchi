"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const LINE = "border-cream/25";

export function Navbar() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1A3CDB] text-cream">
      <div className="hidden lg:grid grid-cols-[2.6%_30%_35%_29.05%_1fr] w-full min-w-full border-b-2 border-cream/25">
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>N1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>N2</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>N3</div>
        <div className={`border-r-2 ${LINE} pl-6 md:pl-8 flex items-center justify-end container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">N4</span>
          <Link href="#" className="font-display font-bold uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors cq-hero-nav">
            Menu
          </Link>
        </div>
        <div
          className={`px-2 flex items-center justify-center relative container-cell`}
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">N5</span>
          <button
            type="button"
            aria-label="Language"
            className="p-1.5 transition-colors relative z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 2.5 15.3 0 18c-2.5-2.7-2.5-15.3 0-18z" />
            </svg>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.8, y: -8 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.8, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full right-0 z-10 flex flex-col items-stretch origin-top"
                style={{ minWidth: "100%" }}
              >
                <button className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full whitespace-nowrap">
                  ID
                </button>
                <button className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full whitespace-nowrap">
                  EN
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden flex items-center justify-between border-b-2 border-cream/25 px-4 py-3">
        <button
          type="button"
          aria-label="Language"
          onClick={() => setLangOpen((v) => !v)}
          className="px-2 py-1 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.5 2.7 2.5 15.3 0 18c-2.5-2.7-2.5-15.3 0-18z" />
          </svg>
        </button>
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 z-10 flex flex-col items-stretch origin-top"
              style={{ minWidth: "80px" }}
            >
              <button className="px-3 py-1.5 bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full whitespace-nowrap cq-hero-icon">
                ID
              </button>
              <button className="px-3 py-1.5 bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full whitespace-nowrap cq-hero-icon">
                EN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <Link href="#" className="font-display font-bold uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors cq-hero-nav">
          Menu
        </Link>
      </div>
    </nav>
  );
}
