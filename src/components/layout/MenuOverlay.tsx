"use client";

import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { lenis } from "@/components/providers/LenisProvider";
import { MenuButton } from "@/components/ui/MenuButton";
import type { TranslationKey } from "@/lib/i18n";

const LINE = "border-cream/25";

const LINKS: { key: TranslationKey; href: string }[] = [
  { key: "menu.home", href: "/" },
  { key: "menu.breach", href: "/breach-checker" },
  { key: "menu.score", href: "/privacy-score" },
  { key: "menu.password", href: "/password" },
  { key: "menu.news", href: "/berita" },
  { key: "menu.uu", href: "/uu-pdp" },
  { key: "menu.dummy", href: "/dummy-data" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setLocale, t } = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const links = LINKS.map((l) => ({ label: t(l.key), ...l }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[170] flex flex-col bg-[#1A3CDB] text-cream"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* navbar inside overlay */}
          <nav className="w-full shrink-0">
            {/* desktop navbar */}
            <div className="hidden lg:grid h-[35px] grid-cols-[2.6%_30%_35%_29.05%_1fr] w-full min-w-full border-b-2 border-cream/25">
              <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}></div>
              <div className={`border-r-2 ${LINE} flex items-center justify-start pl-2 md:pl-4 font-display font-bold tracking-widest cq-hero-nav`}>
                Netchi&nbsp;
                <span className="font-pixel mt-[0.10em] text-[0.80em]" style={{ textRendering: "optimizeSpeed" }}>S</span>
                entinel
              </div>
              <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}></div>
              <div className={`border-r-2 ${LINE} flex items-center justify-end`}>
                <MenuButton onClick={onClose} label={t("menu.close")} />
              </div>
              <div
                className={`px-2 flex items-center justify-center relative container-cell`}
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button type="button" aria-label="Language" className="p-1.5 transition-colors relative z-20">
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
                      className="absolute top-full right-0 z-10 flex flex-col items-stretch origin-top w-full"
                    >
                      <button onClick={() => { setLocale("id"); setLangOpen(false); }} className="px-1 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors w-full text-center">
                        ID
                      </button>
                      <button onClick={() => { setLocale("en"); setLangOpen(false); }} className="px-1 py-2 bg-[#EF4444] text-[#1A3CDB] font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-colors border-t border-cream/25 w-full text-center">
                        EN
                      </button>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* mobile navbar */}
            <div className="lg:hidden grid h-[25px] grid-cols-[25px_minmax(0,65fr)_minmax(0,29fr)_25px] border-b-2 border-cream/25">
              <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center justify-center p-1 font-mono text-[8px] text-cream/30`}></div>
              <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center pl-2 font-display font-bold tracking-widest container-cell overflow-hidden`}>
                <span className="text-[1rem] leading-none whitespace-nowrap">
                  Netchi&nbsp;
                  <span className="font-pixel relative top-[0.15em] text-[0.8em]">S</span>
                  entinel
                </span>
              </div>
              <div className={`self-start h-[23px] border-r-2 ${LINE} flex items-center justify-end`}>
                <MenuButton onClick={onClose} label={t("menu.close")} compact />
              </div>
              <div className="self-start h-[23px] flex items-center justify-center p-1 relative">
                <button type="button" aria-label="Language" onClick={() => setLangOpen((v) => !v)} className="p-0.5 transition-colors">
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

          {/* links */}
          <nav className="flex flex-1 flex-col justify-center overflow-y-auto min-h-0">
            {links.map((link, i) => (
              <div key={link.label} className={`overflow-hidden ${LINE}`}>
                <m.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "110%", transition: { duration: 0.4, delay: (links.length - i) * 0.03 } }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b-2 border-cream/25 px-4 py-3 md:px-8 md:py-4"
                  >
                    <span className="font-display font-bold leading-none tracking-[-0.03em] text-[clamp(1.5rem,min(7vw,8vh),5.5rem)] transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#ff4d4d]">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream/40">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#ff4d4d]">→</span>
                    </span>
                  </Link>
                </m.div>
              </div>
            ))}
          </nav>

          {/* footer */}
          <div className={`flex items-center justify-between border-t-2 ${LINE} px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-cream/50 md:px-8`}>
            <span>Netchi — Privacy Shield</span>
            <span>FTI Fest 2026</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}