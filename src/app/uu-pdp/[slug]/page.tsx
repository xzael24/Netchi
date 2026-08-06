"use client";

import { useRef, useLayoutEffect } from "react";
import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREACH_ARTICLES } from "@/data/breachArticles";
import { UU_PDP_ARTICLES_EXTENDED } from "@/data/uPdpArticlesExtended";

gsap.registerPlugin(ScrollTrigger);

type Unified = {
  slug: string;
  title: string;
  summary: string;
  chapter: string;
  source?: string;
  date?: string;
  pwnCount?: number;
  dataClasses?: string[];
  body?: string[];
  points?: string[];
};

const ALL = [
  ...BREACH_ARTICLES.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    chapter: "Berita",
    source: a.source,
    date: a.date,
    pwnCount: a.pwnCount,
    dataClasses: a.dataClasses,
    body: a.body,
    points: [] as string[],
  })),
  ...UU_PDP_ARTICLES_EXTENDED.map((a) => ({
    slug: a.id,
    title: a.title,
    summary: a.summary,
    chapter: a.chapter,
    body: [] as string[],
    points: a.points,
    source: undefined,
    date: undefined,
    pwnCount: undefined,
    dataClasses: undefined,
  })),
];

function getArticle(slug: string): Unified | null {
  return ALL.find((a) => a.slug === slug) ?? null;
}

const LINE = "border-cream/25";

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const article = getArticle(slug);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-article-reveal]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.3 }
      );
    }, contentRef.current);
    return () => ctx.revert();
  }, []);

  if (!article) {
    return (
      <main className="bg-[#1A3CDB] text-cream min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Artikel tidak ditemukan.</p>
        <Link href="/uu-pdp" className="mt-4 font-mono text-sm uppercase tracking-widest text-[#ff4d4d]">
          ← Kembali ke UU PDP
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-h-screen flex flex-col">
      {/* header bar */}
      <div className={`grid grid-cols-[2.6%_18.81%_78%_1fr] border-b-2 ${LINE} h-[62px] lg:h-[35px]`}>
        <div className="border-r-2 border-cream/25 p-1 text-[8px] text-cream/30 font-mono flex items-center justify-center">1</div>
        <Link href="/" className="flex items-center border-r-2 border-cream/25 pl-2 md:pl-4 font-display font-bold tracking-widest text-cream hover:text-cream/70">
          Netchi Sentinel
        </Link>
        <div className={`flex items-center justify-between border-r-2 border-cream/25 px-3 md:px-4`}>
          <span className="font-mono text-xs tracking-widest uppercase text-cream/60">4://LEARN</span>
          <Link href="/uu-pdp" className="font-mono text-xs uppercase tracking-widest hover:text-white">← Kembali</Link>
        </div>
        <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">
          ARTICLE
        </div>
      </div>

      <div ref={contentRef} className="flex-1 px-6 md:px-10 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div data-article-reveal className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
              {article.chapter}
            </span>
            <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(1.8rem,5vw,3.5rem)]">
              {article.title}
            </h1>
            <p className="mt-3 text-cream/70 text-sm md:text-base leading-relaxed max-w-2xl">
              {article.summary}
            </p>
          </div>

          <div data-article-reveal className={`mb-8 flex flex-wrap gap-3 border-2 ${LINE} p-4 bg-cream/5`}>
            {article.date && (
              <span className="font-mono text-[11px] text-cream/70">
                {new Date(article.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {article.source && (
              <>
                <span className="text-cream/30">·</span>
                <span className="font-mono text-[11px] text-cream/70">{article.source}</span>
              </>
            )}
            {article.pwnCount != null && article.pwnCount > 0 && (
              <>
                <span className="text-cream/30">·</span>
                <span className="font-mono text-[11px] text-cream/70">{article.pwnCount.toLocaleString("id-ID")} akun terdampak</span>
              </>
            )}
          </div>

          {article.dataClasses && article.dataClasses.length > 0 && (
            <div data-article-reveal className="mb-8 flex flex-wrap gap-2">
              {article.dataClasses.map((dc) => (
                <span key={dc} className={`border ${LINE} px-2 py-1 font-mono text-[11px] text-cream/70`}>
                  {dc}
                </span>
              ))}
            </div>
          )}

          <div data-article-reveal className="space-y-5">
            {(article.body && article.body.length > 0 ? article.body : article.points ?? []).map((p, i) => (
              <p key={i} className="text-cream/85 text-[clamp(0.875rem,1.5cqw,1rem)] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {article.body && article.body.length > 0 && (
            <div data-article-reveal className={`mt-10 border-2 ${LINE} p-5`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                Yang Perlu Diketahui
              </span>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-2 text-sm text-cream/85">
                  <span className="text-[#4cd99b]">→</span>
                  <span>Ganti password segera kalau terdampak</span>
                </li>
                <li className="flex gap-2 text-sm text-cream/85">
                  <span className="text-[#4cd99b]">→</span>
                  <span>Aktifkan 2FA di semua akun penting</span>
                </li>
                <li className="flex gap-2 text-sm text-cream/85">
                  <span className="text-[#4cd99b]">→</span>
                  <span>Gunakan password unik untuk tiap layanan</span>
                </li>
              </ul>
            </div>
          )}

          <div data-article-reveal className="mt-12 text-center">
            <Link href="/uu-pdp" className={`inline-flex items-center gap-2 border-2 ${LINE} px-6 py-3 font-mono text-sm uppercase tracking-widest hover:bg-cream/5 transition-colors`}>
              ← Kembali ke Daftar Artikel
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}