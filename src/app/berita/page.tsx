"use client";

import Link from "next/link";
import { BREACH_ARTICLES } from "@/data/breachArticles";
import { FeatureShell } from "@/components/layout/FeatureShell";
import { HeadingReveal } from "@/components/layout/HeadingReveal";
import { useLocale } from "@/components/providers/LocaleProvider";

const LINE = "border-cream/25";

const idDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export default function BeritaPage() {
  const { t } = useLocale();
  return (
    <FeatureShell label="2://BERITA">
      <div className="mx-auto max-w-4xl">
        <span data-article-reveal className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
          {t("bv.label")}
        </span>
        <div data-article-reveal>
          <HeadingReveal as="h1" lines={[t("bv.title1"), t("bv.title2")]} className="mt-2 font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]" />
        </div>
        <p data-article-reveal className="mt-3 text-sm text-cream/70 md:text-base max-w-2xl">
          {t("bv.desc")}
        </p>

        <div data-article-reveal className="mt-10 grid gap-4 md:grid-cols-3">
          {BREACH_ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/berita/${a.slug}`}
              className={`group flex flex-col border-2 ${LINE} bg-cream/5 p-5 hover:border-cream/60 transition-colors`}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4d4d]">{t("bv.tag")}</span>
              <h2 className="mt-2 font-display font-bold leading-snug group-hover:text-[#ff4d4d] transition-colors text-[clamp(1rem,2cqw,1.35rem)]">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed flex-1">{a.summary}</p>
              <div className="mt-4 flex items-center justify-between border-t-2 border-cream/15 pt-3 font-mono text-[10px] uppercase tracking-widest text-cream/40">
                <span>{idDate(a.date)}</span>
                <span className="text-cream/60">
                  {a.pwnCount > 0
                    ? t("bv.accounts", { n: a.pwnCount.toLocaleString("id-ID") })
                    : t("bv.policy")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}