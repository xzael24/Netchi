"use client";

import React from "react";
import Link from "next/link";
import { UU_PDP_ARTICLES_EXTENDED } from "@/data/uPdpArticlesExtended";
import { ArticleView } from "@/components/layout/ArticleView";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function UuPdpDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLocale();
  const { slug } = React.use(params);
  const article = UU_PDP_ARTICLES_EXTENDED.find((a) => a.id === slug);

  if (!article) {
    return (
      <main className="bg-[#1A3CDB] text-cream min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">{t("uu.notFound")}</p>
        <Link href="/uu-pdp" className="mt-4 font-mono text-sm uppercase tracking-widest text-[#ff4d4d]">
          {t("uu.back")}
        </Link>
      </main>
    );
  }

  return (
    <ArticleView
      article={{ slug: article.id, title: article.title, summary: article.summary, chapter: article.chapter, points: article.points }}
      label="2://EDU"
      backHref="/uu-pdp"
      backLabel="UU PDP"
    />
  );
}
