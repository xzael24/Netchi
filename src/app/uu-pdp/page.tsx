"use client";

import { useMemo, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UU_PDP_ARTICLES, UU_CATEGORIES } from "@/data/uuPdpArticles";
import { Navbar } from "@/components/layout/Navbar";
import { HeadingReveal } from "@/components/layout/HeadingReveal";

gsap.registerPlugin(ScrollTrigger);

const LINE = "border-cream/25";

const CHAPTER_COLORS: Record<string, string> = {
  "Hak Subjek Data": "bg-[#4cd99b]/10 text-[#4cd99b] border-[#4cd99b]/30",
  "Kewajiban Pengendali Data": "bg-[#ffd166]/10 text-[#ffd166] border-[#ffd166]/30",
  "Sanksi & Denda": "bg-[#ff6b6b]/10 text-[#ff6b6b] border-[#ff6b6b]/30",
  "Contoh Kasus": "bg-cream/10 text-cream/70 border-cream/20",
};

export default function UuPdpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof UU_CATEGORIES)[number]>("Semua");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredUU = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UU_PDP_ARTICLES.filter((a) => {
      const matchCat = category === "Semua" || a.chapter === category;
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-pasal]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 82%" },
        }
      );
    }, listRef.current);
    return () => ctx.revert();
  }, [filteredUU]);

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-h-screen flex flex-col pt-[88px] lg:pt-[64px]">
      <Navbar />

      {/* R1: hero — editorial grid */}
      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[minmax(26vh,auto)] border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R1C1</div>
        <div className={`border-r-2 ${LINE} container-cell relative flex flex-col items-start justify-end pl-2 md:pl-4 pb-3`}>
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R1C2</span>
          <span className="font-mono font-extrabold uppercase tracking-widest text-cream/60 text-[clamp(0.4rem,2cqw,0.7rem)]">2://EDU</span>
          <HeadingReveal
            as="h1"
            lines={["UU Perlindungan", "Data Pribadi"]}
            className="font-display font-bold text-cream leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,10cqw,5.5rem)]"
          />
          <p className="mt-2 font-display text-cream/70 leading-snug text-[clamp(0.7rem,2cqw,1rem)] max-w-2xl">
            Pasal-pasal UU PDP dijelaskan dalam bahasa manusia — bukan bahasa pengacara. Kamu berhak, dan sekarang kamu tahu.
          </p>
        </div>
        <div className="container-cell relative flex items-end justify-start p-1 pb-2">
          <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R1C3</span>
          <span
            className="font-mono font-extrabold uppercase tracking-widest text-cream whitespace-nowrap"
            style={{ writingMode: "vertical-rl", fontSize: "clamp(0.3rem, 14cqw, 0.5rem)" }}
          >
            2://EDU
          </span>
        </div>
      </div>

      {/* R1 mobile */}
      <div className="lg:hidden flex flex-col px-5 pb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">2://EDU</span>
        <h1 className="mt-2 font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.2rem,8vw,3.2rem)]">
          UU Perlindungan<br />Data Pribadi
        </h1>
        <p className="mt-3 text-sm text-cream/70 leading-relaxed">
          Pasal-pasal UU PDP dijelaskan dalam bahasa manusia — bukan bahasa pengacara.
        </p>
      </div>

      {/* R2: search + filter */}
      <div className={`grid grid-cols-[2.6%_94.05%_3.35%] border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R2C1</div>
        <div className={`border-r-2 ${LINE} p-4 md:p-5`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pasal / kata kunci..."
              aria-label="Cari pasal"
              className="flex-1 bg-transparent font-mono text-sm text-cream placeholder:text-cream/40 outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {UU_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    category === c
                      ? "border-[#f5f0d5] bg-[#f5f0d5] text-[#1D3CDB]"
                      : "border-cream/25 text-cream/70 hover:border-cream/60"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R2C3</div>
      </div>

      {/* R3: list header */}
      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C1</div>
        <div className={`border-r-2 ${LINE} container-cell flex items-center justify-between px-2 md:px-4`}>
          <span className="font-display font-bold uppercase tracking-wide text-cream text-[clamp(1rem,3cqw,1.6rem)]">
            Pasal-Pasal UU PDP
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
            {filteredUU.length} PASAL
          </span>
        </div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R3C3</div>
      </div>
      <div className="lg:hidden flex items-center justify-between border-b-2 border-cream/25 px-5 py-4">
        <span className="font-display font-bold uppercase tracking-wide text-cream text-lg">Pasal-Pasal UU PDP</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">{filteredUU.length} PASAL</span>
      </div>

      {/* Article rows */}
      <div ref={listRef}>
        {filteredUU.length === 0 ? (
          <div className="border-b-2 border-cream/25 px-5 py-16 text-center font-mono text-sm text-cream/50">
            Tidak ada pasal yang cocok.
          </div>
        ) : (
          filteredUU.map((a, i) => (
            <Link
              key={a.id}
              href={`/uu-pdp/${a.id}`}
              data-pasal
              className={`group hidden lg:grid grid-cols-[2.6%_18.81%_75.24%_1fr] border-b-2 ${LINE} transition-colors hover:bg-cream/5`}
            >
              <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>
                R4C1
              </div>
              <div className={`border-r-2 ${LINE} container-cell flex items-start justify-start px-2 py-4`}>
                <span className="font-mono font-extrabold text-cream/30 group-hover:text-[#ff4d4d] transition-colors text-[clamp(1rem,5cqw,1.8rem)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={`border-r-2 ${LINE} px-4 md:px-6 py-6`}>
                <span className={`inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${CHAPTER_COLORS[a.chapter] ?? "border-cream/20 text-cream/50"}`}>
                  {a.chapter}
                </span>
                <h2 className="mt-2 font-display font-bold leading-snug text-[clamp(1rem,3cqw,1.5rem)] group-hover:text-[#ff4d4d] transition-colors">
                  {a.title}
                </h2>
                <p className="mt-1 text-sm text-cream/70 leading-relaxed max-w-3xl">{a.summary}</p>
              </div>
              <div className="flex items-start justify-start p-2 text-cream/40 group-hover:text-[#ff4d4d] group-hover:translate-x-1 transition-all font-mono">
                →
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Mobile article rows */}
      <div className="lg:hidden">
        {filteredUU.map((a, i) => (
          <Link key={a.id} href={`/uu-pdp/${a.id}`} className="group flex gap-4 border-b-2 border-cream/25 px-5 py-5 hover:bg-cream/5 transition-colors">
            <span className="font-mono font-extrabold text-cream/30 group-hover:text-[#ff4d4d] transition-colors">0{i + 1}</span>
            <div className="min-w-0">
              <span className={`inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${CHAPTER_COLORS[a.chapter] ?? "border-cream/20 text-cream/50"}`}>
                {a.chapter}
              </span>
              <h2 className="mt-1 font-display font-bold leading-snug group-hover:text-[#ff4d4d] transition-colors">{a.title}</h2>
              <p className="mt-1 text-sm text-cream/70 line-clamp-2">{a.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* marquee polish strip */}
      <div className="overflow-hidden border-t-2 border-cream/25 py-1.5" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-widest text-cream/40">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  2://EDU • Netchi Sentinel • Lindungi Identitas Digitalmu •
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
