"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { MenuButton } from "@/components/layout/MenuButton";
import { Navbar } from "@/components/layout/Navbar";

const LINE = "border-cream/25";

export type DetailArticle = {
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
  keyTakeaways?: string[];
};

export function ArticleView({
  article,
  label,
  backHref,
  backLabel,
}: {
  article: DetailArticle;
  label: string;
  backHref: string;
  backLabel: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-h-screen flex flex-col">
      <Navbar />

      <div ref={contentRef} className="flex-1 px-6 md:px-10 pt-[88px] pb-16 lg:pt-[64px]">
        <div className="mx-auto max-w-3xl">
          <div data-article-reveal className={`mb-8 flex items-center justify-between border-2 ${LINE} bg-cream/5 px-4 py-2`}>
            <span className="font-mono text-xs tracking-widest uppercase text-cream/60">{label}</span>
            <MenuButton onClick={() => router.push(backHref)} label="Kembali" />
          </div>
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

          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div data-article-reveal className={`mt-10 border-2 ${LINE} p-5`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">
                Yang Perlu Diketahui
              </span>
              <ul className="mt-3 space-y-2">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-cream/85">
                    <span className="text-[#4cd99b]">→</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div data-article-reveal className="mt-12 text-center">
            <Link href={backHref} className={`inline-flex items-center gap-2 border-2 ${LINE} px-6 py-3 font-mono text-sm uppercase tracking-widest hover:bg-cream/5 transition-colors`}>
              ← Kembali ke Daftar {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
