"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
  PRIVACY_QUESTIONS,
  calculateScore,
  scoreCategory,
  ANSWER_SCORE,
  type Answer,
} from "@/data/privacyQuestions";
import { FeatureShell } from "@/components/layout/FeatureShell";
import { HeadingReveal } from "@/components/layout/HeadingReveal";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n";

const LINE = "border-cream/25";

const CATEGORY_LABEL: Record<string, TranslationKey> = {
  password: "ps.cat.password",
  account: "ps.cat.account",
  browsing: "ps.cat.browsing",
  social: "ps.cat.social",
};

const NEVER_TIPS: Record<string, string> = {
  q1: "Kamu masih memakai password yang sama di banyak akun — coba bedakan sekarang, biar satu kebocoran nggak menjalar ke akun lain.",
  q2: "2FA belum aktif di akunmu — ini benteng paling murah buat melindungi email dan e-wallet.",
  q3: "Password yang pernah bocor belum kamu ganti — anggap udah bukan rahasia lagi dan ganti segera.",
  q4: "Kamu masih rentan klik link dari pengirim tak dikenal — jeda dulu sebelum klik, cek alamatnya.",
  q5: "Belum pakai password manager — ini cara termudah bikin password kuat tanpa harus hafal.",
  q6: "Kamu belum cek keaslian situs sebelum isi data — pastikan ada https dan domain yang bener.",
  q7: "Data sensitif masih sering kamu bagikan di medsos — mulai kurangi, terutama tanggal lahir dan alamat.",
  q8: "Software jarang di-update — pembaruan itu nutup lubang yang biasa dimanfaatin peretas.",
  q9: "Kamu masih transaksi di Wi-Fi publik — hindari buka e-wallet atau bank di jaringan terbuka.",
  q10: "Izin aplikasi belum pernah kamu periksa — cabut akses yang nggak relevan sama fungsinya.",
  q11: "Masih tergoda kuis atau tautan yang minta data pribadi — itu jebakan pengumpul data.",
  q12: "Hak-hakmu atas data pribadi belum kamu pahami — cek bagian UU PDP di Netchi.",
};

const SOMETIMES_TIPS: Record<string, string> = {
  q1: "Kamu kadang masih pakai password yang sama — konsistenin, biar satu akun bocor nggak menjalar.",
  q2: "2FA masih sering kelewat — aktifkan di akun penting dan jadikan kebiasaan.",
  q3: "Ganti password baru inget kadang-kadang — rutinkan buat akun penting yang pernah bocor.",
  q4: "Kadang masih klik link mencurigakan — biasakan cek alamatnya dulu sebelum klik.",
  q5: "Password manager kadang dipakai — pakai terus biar semua akun punya password unik.",
  q6: "Cek https masih kadang-kadang — jadikan otomatis sebelum masukin data apa pun.",
  q7: "Kadang masih share data sensitif — batasi detail pribadi di medsos.",
  q8: "Update software masih suka ditunda — biarkan auto-update tetap aktif.",
  q9: "Wi-Fi publik kadang masih dipakai buat hal sensitif — tunggu jaringan yang aman.",
  q10: "Izin aplikasi kadang dilewatin — periksa selalu sebelum install.",
  q11: "Kuis atau tautan data pribadi kadang masih diklik — waspada, itu jebakan.",
  q12: "Hak data pribadi baru paham sedikit — dalami lewat UU PDP di Netchi.",
};

function buildAdvice(answers: Record<string, Answer>, score: number): string {
  const neverIds = PRIVACY_QUESTIONS.filter((q) => answers[q.id] === "never").map((q) => q.id);
  const sometimesIds = PRIVACY_QUESTIONS.filter((q) => answers[q.id] === "sometimes").map((q) => q.id);

  const ids = neverIds.length ? neverIds : sometimesIds;
  const tips = ids
    .slice(0, 2)
    .map((id) => (neverIds.length ? NEVER_TIPS : SOMETIMES_TIPS)[id]);

  if (tips.length === 0) {
    return score <= 70
      ? "Kebiasaanmu udah lumayan solid — tinggal dijaga dan dibiasain terus."
      : "Kebiasaan digitalmu udah bagus banget — pertahankan dan ajak orang sekitar buat ngikutin.";
  }

  const band =
    score <= 40
      ? "Kebiasaan digitalmu masih berisiko."
      : score <= 70
        ? "Lumayan, tapi masih ada celah."
        : "Kamu udah lumayan, tapi ada yang bisa lebih."

  return `${band} ${tips.join(" ")}`;
}

function categoryBreakdown(answers: Record<string, Answer>, t: (k: TranslationKey) => string) {
  const acc: Record<string, { w: number; s: number }> = {};
  for (const q of PRIVACY_QUESTIONS) {
    const a = answers[q.id];
    if (a === undefined) continue;
    const cur = acc[q.category] ?? { w: 0, s: 0 };
    cur.w += q.weight;
    cur.s += ANSWER_SCORE[a] * q.weight;
    acc[q.category] = cur;
  }
  return Object.entries(acc).map(([cat, v]) => ({
    cat,
    label: t(CATEGORY_LABEL[cat] ?? (cat as TranslationKey)),
    score: v.w > 0 ? Math.round((v.s / v.w) * 100) : 0,
  }));
}

const OPTIONS: { value: Answer; label: TranslationKey; letter: string; note: TranslationKey }[] = [
  { value: "always", label: "ps.always", letter: "A", note: "ps.alwaysNote" },
  { value: "sometimes", label: "ps.sometimes", letter: "B", note: "ps.sometimesNote" },
  { value: "never", label: "ps.never", letter: "C", note: "ps.neverNote" },
];

export default function PrivacyScorePage() {
  const { t } = useLocale();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [score, setScore] = useState<number | null>(null);
  const [disp, setDisp] = useState(0);

  const total = PRIVACY_QUESTIONS.length;
  const question = PRIVACY_QUESTIONS[current] ?? PRIVACY_QUESTIONS[total - 1];
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (score === null) return;
    const controls = animate(0, score, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisp(Math.round(v)),
    });
    return () => controls.stop();
  }, [score]);

  const select = (v: Answer) => {
    setAnswers((prev) => ({ ...prev, [question.id]: v }));
    setCurrent((i) => (i === current && i < total - 1 ? i + 1 : i));
  };

  const back = () => setCurrent((i) => Math.max(0, i - 1));

  const finish = () => setScore(calculateScore(answers));

  const reset = () => {
    setAnswers({});
    setScore(null);
    setCurrent(0);
  };

  return (
    <FeatureShell label="2://SCORE">
      <div className="mx-auto max-w-3xl">
        <span data-article-reveal className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
          {t("ps.label")}
        </span>
        <div data-article-reveal>
          <HeadingReveal
            as="h1"
            lines={[t("ps.title1"), t("ps.title2")]}
            className="mt-2 font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]"
          />
        </div>
        <p data-article-reveal className="mt-3 text-sm text-cream/70 md:text-base">
          {score === null
            ? t("ps.intro", { n: total })
            : t("ps.resultIntro")}
        </p>

        {score === null ? (
          <div className="mt-8">
            {/* progress */}
            <div data-article-reveal className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-cream/50">
              <span>
                Q{String(current + 1).padStart(2, "0")} / {total}
              </span>
              <span className="text-[#4cd99b]">{t("ps.answered", { n: answeredCount, total })}</span>
            </div>
            <div data-article-reveal className="mb-8 h-1.5 w-full bg-cream/15">
              <div
                className="h-full bg-[#f5f0d5] transition-all duration-500"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>

            {/* question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ x: 48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -48, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`border-2 ${LINE} bg-cream/5 p-6 md:p-8`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] text-cream/40">
                    {question.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-cream/40">
                    {t(CATEGORY_LABEL[question.category] ?? question.category)}
                  </span>
                </div>

                <h2 className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(1.4rem,4vw,2.4rem)]">
                  {question.question}
                </h2>

                <div className="mt-6 grid gap-3">
                  {OPTIONS.map((opt) => {
                    const active = answers[question.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => select(opt.value)}
                        aria-pressed={active}
                        className={`group flex w-full items-center gap-4 border-2 px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-[#f5f0d5] bg-[#f5f0d5] text-[#1D3CDB]"
                            : `${LINE} hover:border-cream/60`
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 font-mono text-xs font-bold ${
                            active ? "border-[#1D3CDB] text-[#1D3CDB]" : `${LINE} text-cream/50`
                          }`}
                        >
                          {opt.letter}
                        </span>
                        <span className="flex-1">
                          <span className="block font-display font-bold uppercase tracking-wide text-[clamp(0.9rem,2.5cqw,1.1rem)]">
                            {t(opt.label)}
                          </span>
                          <span className={`block text-xs ${active ? "text-[#1D3CDB]/60" : "text-cream/50"}`}>
                            {t(opt.note)}
                          </span>
                        </span>
                        <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={current === 0}
                className="border-2 border-cream/25 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-cream/60 disabled:opacity-30 disabled:hover:border-cream/25"
              >
                {t("ps.back")}
              </button>
              {current === total - 1 && answers[question.id] !== undefined ? (
                <button
                  type="button"
                  onClick={finish}
                  className="bg-[#f5f0d5] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#1D3CDB]"
                >
                  {t("ps.finish")}
                </button>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  {t("ps.pickHint")}
                </span>
              )}
            </div>
          </div>
        ) : (
          /* ---------- result ---------- */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <div className={`border-2 ${LINE} bg-cream/5 p-6 md:p-10 text-center`}>
              <span className="font-mono text-xs uppercase tracking-widest text-cream/50">{t("ps.scoreTitle")}</span>
              <div className="mt-2 font-display font-extrabold leading-none text-[clamp(4rem,14vw,8rem)] tabular-nums">
                {disp}
              </div>
              <div className="mt-2">
                {(() => {
                  const c = scoreCategory(score);
                  return (
                    <span className={`font-display font-bold text-2xl ${c.color}`}>
                      {c.label === "Rendah" ? t("ps.catRendah") : c.label === "Sedang" ? t("ps.catSedang") : t("ps.catTinggi")}
                    </span>
                  );
                })()}
              </div>
              <p className="mx-auto mt-4 max-w-md text-sm text-cream/80 leading-relaxed">
                {buildAdvice(answers, score)}
              </p>
            </div>

            {/* per-category breakdown */}
            <div className={`mt-4 border-2 ${LINE} bg-cream/5 p-6`}>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
                {t("ps.breakdown")}
              </span>
              <div className="mt-4 space-y-4">
                {categoryBreakdown(answers, t).map((row) => (
                  <div key={row.cat}>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                      <span className="text-cream/80">{row.label}</span>
                      <span className={row.score >= 70 ? "text-[#4cd99b]" : row.score >= 40 ? "text-[#ffd166]" : "text-[#ff6b6b]"}>
                        {row.score}/100
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full bg-cream/15">
                      <div
                        className={`h-full transition-all duration-700 ${
                          row.score >= 70 ? "bg-[#4cd99b]" : row.score >= 40 ? "bg-[#ffd166]" : "bg-[#ff6b6b]"
                        }`}
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="flex-1 border-2 border-cream/25 px-6 py-3 font-mono text-sm uppercase tracking-widest hover:border-cream/60"
              >
                {t("ps.retake")}
              </button>
              <Link
                href="/password"
                className="flex-1 bg-[#f5f0d5] px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-widest text-[#1D3CDB]"
              >
                {t("ps.strongCta")}
              </Link>
              <Link
                href="/breach-checker"
                className="flex-1 border-2 border-cream/25 px-6 py-3 text-center font-mono text-sm uppercase tracking-widest hover:border-cream/60"
              >
                {t("ps.checkCta")}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </FeatureShell>
  );
}
