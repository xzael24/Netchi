"use client";

import React from "react";
import Link from "next/link";
import { BREACH_ARTICLES } from "@/data/breachArticles";
import { ArticleView } from "@/components/layout/ArticleView";

export default function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const article = BREACH_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="bg-[#1A3CDB] text-cream min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Berita tidak ditemukan.</p>
        <Link href="/berita" className="mt-4 font-mono text-sm uppercase tracking-widest text-[#ff4d4d]">
          ← Kembali ke Berita
        </Link>
      </main>
    );
  }

  return (
    <ArticleView
      article={{ ...article, chapter: "Berita" }}
      label="2://EDU"
      backHref="/berita"
      backLabel="Berita"
    />
  );
}
