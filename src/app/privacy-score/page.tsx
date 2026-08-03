"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PRIVACY_QUESTIONS,
  calculateScore,
  scoreCategory,
  type Answer,
} from "@/data/privacyQuestions";

const LINE = "border-cream/25";

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "always", label: "Selalu" },
  { value: "sometimes", label: "Kadang" },
  { value: "never", label: "Tidak Pernah" },
];

export default function PrivacyScorePage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [score, setScore] = useState<number | null>(null);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === PRIVACY_QUESTIONS.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) return;
    setScore(calculateScore(answers));
  };

  const reset = () => {
    setAnswers({});
    setScore(null);
  };

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <header className={`grid grid-cols-[2.6%_18.81%_78%_1fr] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center border-r-2 border-cream/25 p-1 font-mono text-[9px] text-cream/30">1</div>
        <Link href="/" className={`flex items-center border-r-2 ${LINE} pl-2 md:pl-4 font-display font-bold tracking-widest`}>
          Netchi Sentinel
        </Link>
        <div className={`flex items-center justify-between border-r-2 ${LINE} px-3 md:px-4`}>
          <span className="font-mono text-xs tracking-widest uppercase text-cream/60">2://SCORE</span>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-white">← Beranda</Link>
        </div>
        <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">SCORE</div>
      </header>

      <div className="flex-1 px-6 py-10 md:px-10">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
            2://SCORE — Ukur kebiasaan digitalmu
          </span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            Seberapa aman kebiasaan digitalmu?
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            Jawab 12 pertanyaan dengan jujur. Skor 0–100 menunjukkan seberapa kuat
            perlindungan identitas digitalmu.
          </p>

          {score === null ? (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-cream/50">
                <span>Progress</span>
                <span>{answeredCount}/{PRIVACY_QUESTIONS.length}</span>
              </div>
              <div className="mb-8 h-1.5 w-full bg-cream/15">
                <div
                  className="h-full bg-[#f5f0d5] transition-all duration-300"
                  style={{ width: `${(answeredCount / PRIVACY_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <ol className="space-y-4">
                {PRIVACY_QUESTIONS.map((q, i) => (
                  <li key={q.id} className={`border-2 ${LINE} bg-cream/5 p-4 md:p-5`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] text-cream/40">Q{i + 1} · {q.category}</span>
                    </div>
                    <p className="mt-1 font-display font-semibold leading-snug">{q.question}</p>
                    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={q.question}>
                      {OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                          aria-pressed={answers[q.id] === opt.value}
                          className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                            answers[q.id] === opt.value
                              ? "border-[#f5f0d5] bg-[#f5f0d5] text-[#1D3CDB]"
                              : "border-cream/25 text-cream/70 hover:border-cream/60"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>

              <button
                type="submit"
                disabled={!allAnswered}
                className="mt-8 w-full bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-4 text-sm font-bold transition-opacity disabled:opacity-40"
              >
                {allAnswered ? "Hitung Skor →" : `Jawab ${PRIVACY_QUESTIONS.length - answeredCount} pertanyaan lagi`}
              </button>
            </form>
          ) : (
            <div className="mt-8">
              <div className={`border-2 ${LINE} bg-cream/5 p-6 text-center`}>
                <span className="font-mono text-xs uppercase tracking-widest text-cream/50">Skor Privasimu</span>
                <div className="mt-3 font-display font-extrabold text-[clamp(4rem,12vw,8rem)] leading-none">
                  {score}
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

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={reset}
                  className="flex-1 border-2 border-cream/25 px-6 py-3 font-mono text-sm uppercase tracking-widest hover:border-cream/60"
                >
                  Ulangi
                </button>
                <Link
                  href="/password"
                  className="flex-1 bg-[#f5f0d5] text-[#1D3CDB] px-6 py-3 text-center font-mono text-sm uppercase tracking-widest font-bold"
                >
                  Buat Password Kuat →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}