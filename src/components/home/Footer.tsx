"use client";

import Link from "next/link";

const LINE = "border-cream/25";

const exploreLinks = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/privacy-score" },
  { label: "Artikel", href: "/password" },
  { label: "FAQ", href: "/uu-pdp" },
  { label: "Kontak", href: "/contact" },
];

const ART: { w: string; c: string }[][] = [
  [{ w: "100%", c: "bg-cream/20" }],
  [{ w: "28%", c: "bg-cream/40" }, { w: "72%", c: "bg-cream/10" }],
  [{ w: "55%", c: "bg-cream/10" }, { w: "45%", c: "bg-cream/30" }],
  [{ w: "100%", c: "bg-cream/20" }],
  [{ w: "18%", c: "bg-cream/40" }, { w: "52%", c: "bg-cream/10" }, { w: "30%", c: "bg-cream/30" }],
  [{ w: "62%", c: "bg-cream/10" }, { w: "38%", c: "bg-cream/40" }],
  [{ w: "100%", c: "bg-cream/20" }],
];

export function Footer() {
  return (
    <footer className="relative w-full bg-[#1A3CDB] text-cream min-h-screen flex flex-col">
      {/* R1: vertical side label */}
      <div className={`grid grid-cols-[3%_97%] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center font-mono text-[9px] text-cream/30 px-1 border-r-2 border-cream/25">
          R1C1
        </div>
        <div className="flex items-center p-3 font-mono text-xs tracking-widest uppercase text-cream/40">
          LAST://FOOTER
        </div>
      </div>

      {/* R2: menu + data row (desktop grid) */}
      <div className={`hidden lg:grid grid-cols-[3%_22%_25%_25%_25%] border-b-2 ${LINE}`}>
        <div className="flex items-start justify-start p-1 font-mono text-[9px] text-cream/30">
          R2C1
        </div>
        <div className="flex flex-col gap-2 p-5 border-l-2 border-cream/25">
          <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">Explore</span>
          <ul className="flex flex-col gap-1.5 font-display text-sm font-medium tracking-wide">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-cream/60 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 p-5 font-mono text-sm border-l-2 border-cream/25">
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Kontak</span>
            <p className="mt-1 leading-relaxed">hello@netchi.app</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Tim</span>
            <p className="mt-1">Tim Netchi — FTI Fest 2026</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Lokasi</span>
            <p className="mt-1">Yogyakarta, Indonesia</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 font-mono text-sm border-l-2 border-cream/25">
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Fokus</span>
            <p className="mt-1 leading-relaxed">Cek kebocoran, password, & skor privasi</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Model</span>
            <p className="mt-1">100% client-side, open source</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-5 font-mono text-[10px] text-cream/50 tracking-widest uppercase border-l-2 border-cream/25">
          <span>(c) 2026 Netchi</span>
          <Link href="/privacy-policy" className="hover:text-cream/60 transition-colors">
            Privacy Policy
          </Link>
          <span>Website by Tim FTI FEST</span>
        </div>
      </div>

      {/* Mobile menu + data */}
      <div className={`lg:hidden flex flex-col gap-4 px-5 pt-6 pb-2 text-sm border-b-2 ${LINE}`}>
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-display text-sm font-medium">
          {exploreLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-cream/60 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 font-mono text-sm">
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Kontak</span>
            <p className="mt-1">hello@netchi.app</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Tim</span>
            <p className="mt-1">Tim Netchi — FTI Fest 2026</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Lokasi</span>
            <p className="mt-1">Yogyakarta</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">Model</span>
            <p className="mt-1">Client-side, open source</p>
          </div>
        </div>
      </div>

      {/* Art bars */}
      <div className="flex flex-col gap-1 px-3 md:px-5 py-4 opacity-80" aria-hidden>
        {ART.map((row, ri) => (
          <div key={ri} className="flex gap-1 w-full">
            {row.map((seg, si) => (
              <div key={`${ri}-${si}`} className={`h-1.5 md:h-2 ${seg.c}`} style={{ width: seg.w }} />
            ))}
          </div>
        ))}
      </div>

      {/* Huge logo */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-hidden">
        <span className="font-display font-extrabold leading-[0.85] tracking-[-0.04em] text-cream whitespace-nowrap text-[clamp(4rem,18vw,13rem)]">
          Netchi
        </span>
      </div>

      {/* Copyright */}
      <div className={`flex items-center justify-between px-3 md:px-5 py-3 border-t-2 ${LINE} font-mono text-[10px] text-cream/50 tracking-widest uppercase`}>
        <span>(c) 2026 Netchi</span>
        <span className="hidden sm:inline">Privacy Policy</span>
        <span>Website by Tim FTI FEST</span>
      </div>
    </footer>
  );
}
