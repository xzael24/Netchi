"use client";

import Link from "next/link";

const exploreLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/breach" },
  { label: "Layanan", href: "/privacy-score" },
  { label: "Artikel", href: "/password" },
  { label: "FAQ", href: "/uu-pdp" },
  { label: "Kontak", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-[#1A3CDB] text-cream">
      {/* -- Desktop: editorial grid rows -- */}
      <div className="hidden lg:flex flex-col w-full min-w-full">
        {/* R1: vertical side label */}
        <div className="grid grid-cols-[3%_1fr] border-b-2 border-cream/25">
          <div className="flex items-center justify-center font-mono text-[9px] text-cream/30 px-1">
            R1C1
          </div>
          <div className="flex items-center p-4 font-mono text-xs tracking-widest uppercase text-cream/40 border-l-2 border-cream/25">
            LAST://FOOTER
          </div>
        </div>

        {/* R2: Explore links + Kontak + data + wordmark */}
        <div className="grid grid-cols-[3%_22%_25%_25%_25%]">
          <div className="flex items-start justify-start p-1 font-mono text-[9px] text-cream/30">
            R2C1
          </div>
          <div className="flex flex-col gap-2 p-4 border-l-2 border-cream/25">
            <span className="font-mono text-[10px] text-cream/40 tracking-widest uppercase">
              Explore
            </span>
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
          <div className="flex flex-col gap-4 p-4 font-mono text-sm border-l-2 border-cream/25">
            <div>
              <span className="text-[10px] text-cream/40 tracking-widest uppercase">
                Kontak
              </span>
              <p className="mt-1 leading-relaxed">hello@netchi.app</p>
            </div>
            <div>
              <span className="text-[10px] text-cream/40 tracking-widest uppercase">
                Tim
              </span>
              <p className="mt-1">Tim Netchi — FTI Fest 2026</p>
            </div>
            <div>
              <span className="text-[10px] text-cream/40 tracking-widest uppercase">
                Lokasi
              </span>
              <p className="mt-1">Yogyakarta, Indonesia</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 border-l-2 border-cream/25">
            <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-none">
              Netchi
            </span>
          </div>
          <div className="flex flex-col justify-center gap-2 p-4 font-mono text-[10px] text-cream/50 tracking-widest uppercase border-l-2 border-cream/25">
            <span>(c) 2026 Netchi</span>
            <Link
              href="/privacy-policy"
              className="hover:text-cream/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>Website by Tim FTI FEST</span>
          </div>
        </div>
      </div>

      {/* -- Mobile: stacked layout -- */}
      <div className="lg:hidden flex flex-col gap-1 px-4 py-6 text-sm">
        <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest mb-3">
          LAST://FOOTER
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 font-display text-sm font-medium mb-4">
          {exploreLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-cream/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t-2 border-cream/25 my-2" />

        <div className="grid grid-cols-1 gap-3 font-mono text-sm mb-4">
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">
              Kontak
            </span>
            <p className="mt-1">hello@netchi.app</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">
              Tim
            </span>
            <p className="mt-1">Tim Netchi — FTI Fest 2026</p>
          </div>
          <div>
            <span className="text-[10px] text-cream/40 tracking-widest uppercase">
              Lokasi
            </span>
            <p className="mt-1">Yogyakarta, Indonesia</p>
          </div>
        </div>

        <div className="font-display text-3xl font-extrabold tracking-[-0.03em] mb-4">
          Netchi
        </div>

        <div className="border-t-2 border-cream/25 my-2" />

        <div className="flex flex-col gap-1 font-mono text-[10px] text-cream/50 tracking-widest uppercase">
          <span>(c) 2026 Netchi</span>
          <Link
            href="/privacy-policy"
            className="hover:text-cream/60 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>Website by Tim FTI FEST</span>
        </div>
      </div>
    </footer>
  );
}