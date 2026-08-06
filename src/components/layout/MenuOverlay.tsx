"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { MenuButton } from "@/components/layout/MenuButton";

const LINE = "border-cream/25";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Cek Password", href: "/breach-checker" },
  { label: "Skor Privasi", href: "/privacy-score" },
  { label: "Password", href: "/password" },
  { label: "Berita", href: "/berita" },
  { label: "UU PDP", href: "/uu-pdp" },
  { label: "Dummy Data", href: "/dummy-data" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col bg-[#1A3CDB] text-cream"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* header */}
          <div className={`grid h-[62px] grid-cols-[2.6%_30%_35%_29.05%_1fr] border-b-2 ${LINE} lg:h-[35px]`}>
            <div className={`flex items-center justify-center border-r-2 ${LINE} p-1 font-mono text-[9px] text-cream/30`}>0</div>
            <div className={`flex items-center border-r-2 ${LINE} pl-2 md:pl-4 font-display font-bold tracking-widest`}>
              Netchi Sentinel
            </div>
            <div className={`flex items-center border-r-2 ${LINE} px-4 font-mono text-xs tracking-widest uppercase text-cream/60`}>
              0://MENU
            </div>
            <div className={`flex items-center justify-end border-r-2 ${LINE}`}>
              <MenuButton onClick={onClose} label="Tutup" />
            </div>
            <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">MENU</div>
          </div>

          {/* links */}
          <nav className="flex flex-1 flex-col justify-center">
            {links.map((link, i) => (
              <div key={link.label} className={`overflow-hidden ${LINE}`}>
                <motion.div
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
                </motion.div>
              </div>
            ))}
          </nav>

          {/* footer */}
          <div className={`flex items-center justify-between border-t-2 ${LINE} px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-cream/50 md:px-8`}>
            <span>Netchi — Privacy Shield</span>
            <span>FTI Fest 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}