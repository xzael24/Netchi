"use client";

import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { lenis } from "@/components/providers/LenisProvider";
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
  const { t } = useLocale();
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
          className="fixed inset-0 z-[150] flex flex-col bg-[#1A3CDB] text-cream"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* links */}
          <nav className="flex flex-1 flex-col justify-center">
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
                    <span className="font-display font-bold leading-none tracking-[-0.03em] text-[clamp(2rem,7vw,5.5rem)] transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#ff4d4d]">
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