"use client";

import Link from "next/link";
import { Magnetic } from "@/components/layout/Magnetic";

const LINE = "border-cream/25";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Cek Password", href: "/breach-checker" },
  { label: "Skor Privasi", href: "/privacy-score" },
  { label: "Password", href: "/password" },
  { label: "UU PDP", href: "/uu-pdp" },
  { label: "Dummy Data", href: "/dummy-data" },
];

export function Footer() {
  return (
    <footer className="relative flex min-h-screen flex-col overflow-hidden bg-[#1A3CDB] text-cream w-screen min-w-full">
      {/* R1: editorial label row */}
      <div className={`grid grid-cols-[3%_97%] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center border-r-2 border-cream/25 px-1 font-mono text-[9px] text-cream/30">
          R1C1
        </div>
        <div className="flex items-center justify-between p-3 font-mono text-xs tracking-widest uppercase text-cream/40">
          <span>5://FOOTER</span>
          <span className="hidden md:inline">© 2026</span>
        </div>
      </div>

      {/* R2: big awwwards nav links */}
      <nav className="flex flex-col">
        {navLinks.map((link, i) => (
          <div key={link.label} className={`border-b-2 ${LINE}`}>
            <Magnetic strength={0.15} pull={-1}>
              <Link
                href={link.href}
                className="group flex items-center justify-between px-3 py-1.5 md:px-6 md:py-2"
              >
                <span className="font-display font-bold leading-none tracking-[-0.03em] text-[clamp(1.25rem,3vw,3rem)] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#ff4d4d]">
                  {link.label}
                </span>
                <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream/40">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#ff4d4d]">
                    →
                  </span>
                </span>
              </Link>
            </Magnetic>
          </div>
        ))}
      </nav>

      {/* R3: contact / data row */}
      <div className="flex flex-col justify-between gap-2 px-3 py-2.5 font-mono text-sm text-cream/70 md:flex-row md:px-6">
        <div>hello@netchi.app</div>
        <div>Tim Netchi — FTI Fest 2026</div>
        <div>Yogyakarta, Indonesia</div>
        <div className="text-cream/40">100% client-side · open source</div>
      </div>

      {/* R4: marquee ticker */}
      <div className="overflow-hidden border-y-2 border-cream/25 py-1" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-sm uppercase tracking-widest text-cream/60">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  Netchi • Privasi Data • Lindungi Identitas Digital •
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* R5: massive wordmark */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-2 py-4 md:py-6">
        <span className="inline-flex items-baseline font-display font-extrabold leading-[0.85] tracking-[-0.04em] text-cream whitespace-nowrap text-[clamp(2.5rem,14vw,20rem)] translate-y-[0px]">
          Netchi&nbsp;
          <span className="font-pixel translate-y-[0.12em] text-[clamp(1.6rem,12vw,18rem)]">S</span>
          entinel
        </span>
      </div>

      {/* R6: copyright */}
      <div className={`flex items-center justify-between px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-cream/50 md:px-6 border-t-2 ${LINE}`}>
        <span>© 2026 Netchi</span>
        <Link href="/uu-pdp" className="hover:text-cream/80">
          Privacy Policy
        </Link>
        <span>Website by Tim FTI FEST</span>
      </div>
    </footer>
  );
}
