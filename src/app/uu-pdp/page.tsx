"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UU_PDP_ARTICLES, UU_CATEGORIES } from "@/data/uuPdpArticles";
import { FeatureShell } from "@/components/layout/FeatureShell";
import { HeadingReveal } from "@/components/layout/HeadingReveal";

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

  const filteredUU = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UU_PDP_ARTICLES.filter((a) => {
      const matchCat = category === "Semua" || a.chapter === category;
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <FeatureShell label="4://LEARN">
      <div className="mx-auto max-w-4xl">
        <span data-article-reveal className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
          4://LEARN — Pahami hakmu atas data pribadi
        </span>
        <div data-article-reveal>
          <HeadingReveal as="h1" lines={["UU Perlindungan", "Data Pribadi"]} className="mt-2 font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]" />
        </div>
        <p data-article-reveal className="mt-3 text-sm text-cream/70 md:text-base max-w-2xl">
          Penjelasan pasal-pasal UU PDP dalam bahasa manusia — bukan bahasa pengacara.
        </p>

        <div data-article-reveal className={`mt-8 flex flex-col gap-3 border-2 ${LINE} bg-cream/5 p-4 sm:flex-row sm:items-center`}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel..."
            aria-label="Cari artikel"
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

        <div data-article-reveal className="mt-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">Pasal-Pasal UU PDP</span>
          <h2 className="mt-2 font-display font-bold text-[clamp(1.2rem,2.5cqw,2rem)] mb-5">Perlindungan Data Pribadi</h2>

          {filteredUU.length === 0 ? (
            <p className="font-mono text-sm text-cream/50">Tidak ada artikel yang cocok.</p>
          ) : (
            <div className="space-y-3">
              {filteredUU.map((a) => (
                <div key={a.id} data-article-reveal className={`border-2 ${LINE} bg-cream/5 p-4`}>
                  <Link
                    href={`/uu-pdp/${a.id}`}
                    className="flex w-full items-center justify-between gap-4 text-left group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${CHAPTER_COLORS[a.chapter] ?? "border-cream/20 text-cream/50"}`}>
                          {a.chapter}
                        </span>
                      </div>
                      <h2 className="font-display font-semibold leading-snug group-hover:text-[#ff4d4d] transition-colors">
                        {a.title}
                      </h2>
                      <p className="mt-1 text-sm text-cream/70 line-clamp-1">{a.summary}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xl text-cream/40 group-hover:text-[#ff4d4d] transition-colors">→</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FeatureShell>
  );
}