"use client";

import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { MenuButton } from "@/components/ui/MenuButton";
import { useLocale } from "@/components/providers/LocaleProvider";

const LINE = "border-cream/25";

export function Navbar({ headlineVisible = true, buttonVisible = false }: { headlineVisible?: boolean; buttonVisible?: boolean }) {
  const { setLocale, t } = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[160] bg-[#1A3CDB] text-cream">
      <div className="hidden lg:grid h-[35px] grid-cols-[2.6%_30%_35%_29.05%_1fr] w-full min-w-full border-b-2 border-cream/25">
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>N1</div>
        <div className={`border-r-2 ${LINE} flex items-center justify-start pl-2 md:pl-4 font-display font-bold tracking-widest cq-hero-nav relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">N2</span>
          <div className="overflow-hidden">
            <AnimatePresence>
              {headlineVisible && (
                <m.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center text-[1.1em]"
                >
                  Netchi&nbsp;
                  <span className="font-pixel mt-[0.10em] text-[0.80em]" style={{ textRendering: "optimizeSpeed" }}>S</span>
                  entinel
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>N3</div>
        <div className={`border-r-2 ${LINE} flex items-center justify-end container-cell relative`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">N4</span>
          <div className="overflow-hidden mr-auto h-full">
            <AnimatePresence>
              {buttonVisible && (
                <m.div
                  key="btn-start"
                  className="h-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                <Link
                  href="/breach-checker"
                  className="h-full flex items-center justify-center bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest px-3 md:px-4 text-[clamp(0.5rem,3.5cqw,0.85rem)] font-bold whitespace-nowrap hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors"
                >
                  {t("nav.start")}
                </Link>
                </m.div>
              )}
            </AnimatePresence>
          </div>
          <MenuButton onClick={() => setMenuOpen(v => !v)} label={menuOpen ? t("menu.close") : "Menu"} />
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
              <m.div
                initial={{ opacity: 0, scaleY: 0.8, y: -8 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.8, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full right-0 z-10 flex flex-col items-stretch origin-top"
                style={{ minWidth: "100%" }}
              >
                <button onClick={() => { setLocale("id"); setLangOpen(false); }} className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full whitespace-nowrap">
                  ID
                </button>
                <button onClick={() => { setLocale("en"); setLangOpen(false); }} className="px-3 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full whitespace-nowrap">
                  EN
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden grid h-[25px] grid-cols-[25px_minmax(0,65fr)_minmax(0,29fr)_25px] border-b-2 border-cream/25">
        <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center justify-center p-1 font-mono text-[8px] text-cream/30`}>N1</div>
        <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center pl-2 font-display font-bold tracking-widest container-cell overflow-hidden`}>
          <span className="text-[1rem] leading-none whitespace-nowrap">
            Netchi&nbsp;
            <span className="font-pixel relative top-[0.15em] text-[0.8em]">S</span>
            entinel
          </span>
        </div>
        <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center justify-end`}>
          <MenuButton onClick={() => setMenuOpen(v => !v)} label={menuOpen ? t("menu.close") : "Menu"} compact />
        </div>
        <div className="self-start h-[23px] flex items-center justify-center p-1 relative">
          <button
            type="button"
            aria-label="Language"
            onClick={() => setLangOpen((v) => !v)}
            className="p-0.5 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 2.5 15.3 0 18c-2.5-2.7-2.5-15.3 0-18z" />
            </svg>
          </button>
          <AnimatePresence>
            {langOpen && (
              <m.div
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full right-0 z-10 flex flex-col items-stretch origin-top"
                style={{ minWidth: "25px" }}
              >
                <button onClick={() => { setLocale("id"); setLangOpen(false); }} className="px-0.5 py-0.5 bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full whitespace-nowrap text-[0.5rem] leading-none">
                  ID
                </button>
                <button onClick={() => { setLocale("en"); setLangOpen(false); }} className="px-0.5 py-0.5 bg-[#EF4444] text-[#1A3CDB] font-mono uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full whitespace-nowrap text-[0.5rem] leading-none">
                  EN
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>

    <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
  </>
);
}
