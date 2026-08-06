"use client";

import { useMemo, useState, useEffect } from "react";
import { UU_PDP_ARTICLES, UU_CATEGORIES } from "@/data/uuPdpArticles";
import { FeatureShell } from "@/components/layout/FeatureShell";

const LINE = "border-cream/25";

export default function UuPdpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof UU_CATEGORIES)[number]>("Semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const art = params.get("article");
    if (art) {
      setExpandedId(art);
      setTimeout(() => {
        document.getElementById(`article-${art}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UU_PDP_ARTICLES.filter((a) => {
      const matchesCat = category === "Semua" || a.chapter === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.chapter.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <FeatureShell label="4://LEARN">
      <div className="mx-auto max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
            4://LEARN — Pahami hakmu atas data pribadi
          </span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            UU Perlindungan Data Pribadi
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            Penjelasan pasal-pasal UU PDP dalam bahasa manusia — bukan bahasa pengacara.
          </p>

          <div className={`mt-6 flex flex-col gap-3 border-2 ${LINE} bg-cream/5 p-4 sm:flex-row sm:items-center`}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel…"
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

          {filtered.length === 0 ? (
            <p className="mt-8 font-mono text-sm text-cream/50">Tidak ada artikel yang cocok.</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {filtered.map((a) => (
                <li key={a.id} id={`article-${a.id}`} className={`border-2 ${LINE} bg-cream/5 p-4`}>
                  <button
                    type="button"
                    onClick={() => setExpandedId(a.id)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">{a.chapter}</span>
                      <h2 className="mt-1 font-display font-semibold leading-snug">{a.title}</h2>
                      <p className="mt-1 text-sm text-cream/70">{a.summary}</p>
                    </div>
                    <span className={`shrink-0 font-mono text-xl transition-transform ${a.id === expandedId ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {a.id === expandedId && (
                    <ul className="mt-4 space-y-2 border-t-2 border-cream/15 pt-3">
                      {a.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-cream/85">
                          <span className="text-[#4cd99b]">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
    </FeatureShell>
  );
}