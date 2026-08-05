"use client";

import { useState } from "react";
import Link from "next/link";
import { validateEmail } from "@/lib/validate";
import { formatNumber } from "@/lib/utils";
import { DATASET_STATS, type BreachMatch } from "@/lib/breachEngine";
import { FeatureShell } from "@/components/layout/FeatureShell";
import type { Breach } from "@/types";

const LINE = "border-cream/25";

type EmailIoData = {
  reputation: string | null;
  leaked: boolean;
  breachCount: number;
  whyBad: string | null;
  breachEmails: string[];
};

type Result =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "aman"; source: "emailio" | "hibp" | "self" }
  | { status: "bocor"; source: "emailio" | "hibp" | "self"; matches: BreachMatch[]; real?: EmailIoData }
  | { status: "bocor-hibp"; breaches: Breach[] };

export default function BreachCheckerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateEmail(input);
    if (!v.ok) {
      setResult({ status: "error", message: v.error });
      return;
    }
    setResult({ status: "loading" });
    try {
      const res = await fetch(`/api/email-check?account=${encodeURIComponent(v.value)}`);
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setResult({ status: "error", message: body?.error ?? "Terjadi kesalahan" });
        return;
      }
      const data = (await res.json()) as { source: "emailio" | "hibp" | "self" } & Partial<EmailIoData> & {
        matches?: BreachMatch[];
        breaches?: Breach[];
      };

      if (data.source === "hibp") {
        const breaches = data.breaches ?? [];
        setResult(
          breaches.length > 0
            ? { status: "bocor-hibp", breaches }
            : { status: "aman", source: "hibp" }
        );
        return;
      }

      if (data.source === "emailio") {
        const real: EmailIoData = {
          reputation: data.reputation ?? null,
          leaked: data.leaked ?? false,
          breachCount: data.breachCount ?? 0,
          whyBad: data.whyBad ?? null,
          breachEmails: data.breachEmails ?? [],
        };
        setResult(
          real.leaked || real.breachCount > 0
            ? { status: "bocor", source: "emailio", matches: [], real }
            : { status: "aman", source: "emailio" }
        );
        return;
      }

      const matches = data.matches ?? [];
      setResult(
        matches.length > 0
          ? { status: "bocor", source: "self", matches }
          : { status: "aman", source: "self" }
      );
    } catch {
      setResult({ status: "error", message: "Gagal terhubung. Coba lagi." });
    }
  };

  return (
    <FeatureShell index="1" label="1://SCAN">
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-4">
          1://SCAN — Cek kebocoran data
        </span>
        <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2.2rem,6vw,4.5rem)] text-center">
          Apakah emailmu pernah bocor?
        </h1>
        <p className="mt-4 max-w-lg text-center font-body text-cream/70 text-sm md:text-base">
          Email kamu dicek terhadap database kebocoran real — dan dibandingkan juga
          dengan sistem Netchi Breach Intelligence yang berjalan lokal & offline.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xl" noValidate>
          <div className={`flex border-2 ${LINE}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="kamu@email.com"
              aria-label="Email"
              className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-cream placeholder:text-cream/40 outline-none"
            />
            <button
              type="submit"
              disabled={result.status === "loading"}
              className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-3 text-sm font-bold hover:bg-cream/80 disabled:opacity-60"
            >
              {result.status === "loading" ? "Mengecek…" : "Cek →"}
            </button>
          </div>

          {result.status === "error" && (
            <p className="mt-3 font-mono text-sm text-[#ff6b6b]">⚠ {result.message}</p>
          )}
        </form>

        {result.status === "bocor-hibp" && (
          <div className="mt-10 w-full max-w-2xl text-left">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">⚠ Kebocoran terdeteksi</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4cd99b]">● Data real (HIBP)</span>
            </div>
            <div className="mt-3 space-y-4">
              {result.breaches.map((b) => (
                <div key={b.Name} className={`border-2 ${LINE} bg-cream/5 p-5`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl">{b.Name}</h3>
                    <span className="font-mono text-[10px] text-cream/50">{formatNumber(b.PwnCount)} akun</span>
                  </div>
                  <p className="mt-2 text-sm text-cream/80 leading-relaxed">{b.Description}</p>
                  {b.DataClasses?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {b.DataClasses.map((c) => (
                        <span key={c} className="border border-cream/25 px-2 py-1 font-mono text-[11px] text-cream/70">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={`mt-4 border-2 ${LINE} p-4`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">Saran tindakan</span>
              <ul className="mt-2 list-inside list-disc text-sm text-cream/80">
                <li>Ganti password akun ini sekarang, dan jangan ulangi di akun lain.</li>
                <li>Aktifkan 2FA lewat aplikasi authenticator.</li>
              </ul>
            </div>
          </div>
        )}

        {result.status === "bocor" && result.source === "emailio" && result.real && (
          <div className="mt-10 w-full max-w-2xl text-left">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">⚠ Kebocoran terdeteksi</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4cd99b]">● Data real (email.io)</span>
            </div>
            <div className={`mt-3 border-2 ${LINE} bg-cream/5 p-5`}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm">
                <span className="text-cream/80">Reputasi: <b className="text-[#ff6b6b]">{result.real.reputation ?? "rendah"}</b></span>
                {result.real.breachCount > 0 && (
                  <span className="text-cream/80">Ditemukan di <b className="text-[#ff6b6b]">{result.real.breachCount} kebocoran</b></span>
                )}
              </div>
              {result.real.breachEmails.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.real.breachEmails.map((name) => (
                    <span key={name} className="border border-cream/25 px-2 py-1 font-mono text-[11px] text-cream/70">
                      {name}
                    </span>
                  ))}
                </div>
              )}
              {result.real.whyBad && (
                <p className="mt-4 text-sm text-cream/70">{result.real.whyBad}</p>
              )}
            </div>
            <div className={`mt-4 border-2 ${LINE} p-4`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">Saran tindakan</span>
              <ul className="mt-2 list-inside list-disc text-sm text-cream/80">
                <li>Ganti password akun ini sekarang, dan jangan ulangi di akun lain.</li>
                <li>Aktifkan 2FA lewat aplikasi authenticator.</li>
                <li>Gunakan Password Generator untuk password unik per akun.</li>
              </ul>
              <Link href="/password" className="mt-3 inline-block font-mono uppercase tracking-widest text-[#ff4d4d]">
                Generate password aman →
              </Link>
            </div>
          </div>
        )}

        {result.status === "bocor" && result.source === "self" && (
          <div className="mt-10 w-full max-w-2xl text-left">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">⚠ Kebocoran terdeteksi</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4cd99b]">● Netchi Breach DB</span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-cream/40">
              {result.matches.length} pencocokan di {formatNumber(DATASET_STATS.totalRecords)}+ record.
            </p>
            <div className="mt-3 space-y-4">
              {result.matches.map((m) => (
                <div key={m.breach.Name + m.matchType} className={`border-2 ${LINE} bg-cream/5 p-5`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl">{m.breach.Name}</h3>
                    <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${
                      m.matchType === "exact" ? "border-[#4cd99b]/50 text-[#4cd99b]" : "border-cream/30 text-cream/50"
                    }`}>
                      {m.matchType === "exact" ? "pencocokan akun" : "pencocokan domain"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-cream/80 leading-relaxed">{m.breach.Description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.breach.DataClasses.map((c) => (
                      <span key={c} className="border border-cream/25 px-2 py-1 font-mono text-[11px] text-cream/70">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[11px] text-cream/50">
                    Bocor pada {new Date(m.breach.BreachDate).getFullYear()} · {formatNumber(m.breach.PwnCount)} akun terdampak
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-4 border-2 ${LINE} p-4`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">Saran tindakan</span>
              <ul className="mt-2 list-inside list-disc text-sm text-cream/80">
                <li>Ganti password akun ini sekarang, dan jangan ulangi di akun lain.</li>
                <li>Aktifkan 2FA lewat aplikasi authenticator.</li>
                <li>Gunakan Password Generator untuk password unik per akun.</li>
              </ul>
              <Link href="/password" className="mt-3 inline-block font-mono uppercase tracking-widest text-[#ff4d4d]">
                Generate password aman →
              </Link>
            </div>
          </div>
        )}

        {result.status === "aman" && (
          <div className="mt-10 w-full max-w-xl border-2 border-cream/25 bg-cream/5 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#4cd99b]">✓ Tidak ditemukan kebocoran</span>
              <span className={`font-mono text-[10px] uppercase tracking-widest ${result.source !== "self" ? "text-[#4cd99b]" : "text-cream/40"}`}>
                {result.source === "emailio" ? "● Data real (email.io)" : result.source === "hibp" ? "● Data real (HIBP)" : "● Netchi Breach DB"}
              </span>
            </div>
            <p className="mt-2 text-sm text-cream/80">
              {result.source === "emailio"
                ? "Email kamu tidak ditemukan dalam database kebocoran real."
                : `Tidak ada kecocokan di ${formatNumber(DATASET_STATS.totalRecords)} record breach kami.`}
            </p>
            {result.source === "self" && (
              <p className="mt-3 font-mono text-[11px] text-cream/40">
                Coba akun demo: andi.tokopedia@example.com / sari.bpjs@example.com
              </p>
            )}
          </div>
        )}
      </div>
    </FeatureShell>
  );
}