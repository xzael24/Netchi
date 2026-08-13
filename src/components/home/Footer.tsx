"use client";

import Link from "next/link";
import { Magnetic } from "@/components/layout/Magnetic";
import { Tilt } from "@/components/layout/Tilt";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n";

const LINE = "border-cream/25";

const NAV_LINKS: { key: TranslationKey; href: string }[] = [
  { key: "menu.home", href: "/" },
  { key: "menu.breach", href: "/breach-checker" },
  { key: "menu.score", href: "/privacy-score" },
  { key: "menu.password", href: "/password" },
  { key: "menu.news", href: "/berita" },
  { key: "menu.uu", href: "/uu-pdp" },
  { key: "menu.dummy", href: "/dummy-data" },
];

export function Footer() {
  const { t } = useLocale();
  const labels = NAV_LINKS.map((l) => ({ ...l, label: t(l.key) }));
  return (
    <footer className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-[#1A3CDB] text-cream w-screen min-w-full pt-[25px] lg:pt-[35px]">
      {/* R1: editorial label row */}
      <div className={`grid grid-cols-[25px_minmax(0,1fr)] lg:grid-cols-[3%_97%] border-b-2 ${LINE}`}>
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
      {labels.map((link, i) => (
          <div key={link.label} className={`border-b-2 ${LINE}`}>
            <Magnetic strength={0.15} pull={-1}>
              <Link
                href={link.href}
                className="group flex items-center justify-between px-3 py-1 md:px-6 md:py-2"
              >
                <span className="font-display font-bold leading-none tracking-[-0.03em] text-[clamp(1.3rem,4vw,3rem)] md:text-[clamp(1.25rem,3vw,3rem)] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#ff4d4d]">
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
        <div>Tim ICHI — FTI Fest 2026</div>
        <div>Tegal, Indonesia</div>
        <div className="text-cream/40">100% client-side · open source</div>
      </div>

      {/* R4: marquee ticker */}
      <div className="overflow-hidden border-y-2 border-cream/25 py-1" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-sm uppercase tracking-widest text-cream/60">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  {t("footer.marquee")}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* R5: massive wordmark */}
      <div className="flex items-center justify-center px-4 py-4 md:px-6 md:py-6 lg:flex-1">
        <Tilt max={10} perspective={700}>
          <span className="inline-flex items-baseline font-display font-extrabold leading-[0.85] tracking-[-0.04em] text-cream whitespace-nowrap text-[clamp(2.4rem,13vw,20rem)] lg:text-[clamp(2.5rem,14vw,20rem)] translate-y-[0px]">
            Netchi&nbsp;
            <span className="font-pixel translate-y-[0.12em] text-[clamp(1.5rem,10vw,18rem)] lg:text-[clamp(1.6rem,12vw,18rem)]">S</span>
            entinel
          </span>
        </Tilt>
      </div>

      {/* R6: copyright */}
      <div className={`grid grid-cols-3 items-center gap-2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-cream/50 md:px-6 md:py-3 border-t-2 ${LINE}`}>
        <span className="text-left">© 2026 Netchi</span>
        <Link href="/uu-pdp" className="text-center hover:text-cream/80">
          Privacy Policy
        </Link>
        <span className="text-right">Website by Tim ICHI</span>
      </div>
    </footer>
  );
}
