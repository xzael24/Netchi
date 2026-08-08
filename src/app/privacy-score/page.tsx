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

const LINE = "border-cream/25";

const OPTIONS: { value: Answer; label: string; letter: string; note: string }[] = [
  { value: "always", label: "Selalu", letter: "A", note: "Kebiasaan sudah jadi otomatis" },
  { value: "sometimes", label: "Kadang", letter: "B", note: "Kadang lupa, kadang ingat" },
  { value: "never", label: "Tidak Pernah", letter: "C", note: "Belum jadi kebiasaan" },
];

const CATEGORY_LABEL: Record<string, string> = {
  password: "Kata Sandi",
  account: "Keamanan Akun",
  browsing: "Kebiasaan Browsing",
  social: "Media Sosial",
};

function categoryBreakdown(answers: Record<string, Answer>) {
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
    label: CATEGORY_LABEL[cat] ?? cat,
    score: v.w > 0 ? Math.round((v.s / v.w) * 100) : 0,
  }));
}

export default function PrivacyScorePage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [score, setScore] = useState<number | null>(null);
  const [disp, setDisp] = useState(0);

  const total = PRIVACY_QUESTIONS.length;
  const question = PRIVACY_QUESTIONS[current];
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
    if (current < total - 1) setCurrent((i) => i + 1);
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
          2://SCORE — Ukur kebiasaan digitalmu
        </span>
        <div data-article-reveal>
          <HeadingReveal
            as="h1"
            lines={["Seberapa aman", "kebiasaanmu?"]}
            className="mt-2 font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]"
          />
        </div>
        <p data-article-reveal className="mt-3 text-sm text-cream/70 md:text-base">
          {score === null
            ? `${total} pertanyaan cepat, satu per satu. Jujur aja — hasilnya untuk kamu.`
            : `Skor 0–100 menunjukkan seberapa kuat perlindungan identitas digitalmu.`}
        </p>

        {score === null ? (
          <div className="mt-8">
            {/* progress */}
            <div data-article-reveal className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-cream/50">
              <span>
                Q{String(current + 1).padStart(2, "0")} / {total}
              </span>
              <span className="text-[#4cd99b]">{answeredCount}/{total} terjawab</span>
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
                    {CATEGORY_LABEL[question.category] ?? question.category}
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
                            {opt.label}
                          </span>
                          <span className={`block text-xs ${active ? "text-[#1D3CDB]/60" : "text-cream/50"}`}>
                            {opt.note}
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
                ← Sebelumnya
              </button>
              {current === total - 1 && answers[question.id] !== undefined ? (
                <button
                  type="button"
                  onClick={finish}
                  className="bg-[#f5f0d5] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#1D3CDB]"
                >
                  Lihat Skor →
                </button>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  Pilih jawaban untuk lanjut
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
              <span className="font-mono text-xs uppercase tracking-widest text-cream/50">Skor Privasimu</span>
              <div className="mt-2 font-display font-extrabold leading-none text-[clamp(4rem,14vw,8rem)] tabular-nums">
                {disp}
              </div>
              <div className="mt-2">
                {(() => {
                  const c = scoreCategory(score);
                  return (
                    <span className={`font-display font-bold text-2xl ${c.color}`}>
                      {c.emoji} {c.label}
                    </span>
                  );
                })()}
              </div>
              <p className="mx-auto mt-4 max-w-md text-sm text-cream/80 leading-relaxed">
                {scoreCategory(score).advice}
              </p>
            </div>

            {/* per-category breakdown */}
            <div className={`mt-4 border-2 ${LINE} bg-cream/5 p-6`}>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
                Rincian Per Kategori
              </span>
              <div className="mt-4 space-y-4">
                {categoryBreakdown(answers).map((row) => (
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
                Ulangi
              </button>
              <Link
                href="/password"
                className="flex-1 bg-[#f5f0d5] px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-widest text-[#1D3CDB]"
              >
                Buat Password Kuat →
              </Link>
              <Link
                href="/breach-checker"
                className="flex-1 border-2 border-cream/25 px-6 py-3 text-center font-mono text-sm uppercase tracking-widest hover:border-cream/60"
              >
                Cek Password Bocor
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </FeatureShell>
  );
}
