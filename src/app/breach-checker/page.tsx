"use client";

import { useState } from "react";
import Link from "next/link";
import { validateEmail } from "@/lib/validate";
import { formatNumber } from "@/lib/utils";
import { FeatureShell } from "@/components/layout/FeatureShell";
import type { Breach } from "@/types";

const LINE = "border-cream/25";

type Result =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "aman"; source: "hibp" | "mock" }
  | { status: "bocor"; breach: Breach; source: "hibp" | "mock" };

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
      const res = await fetch(`/api/check?account=${encodeURIComponent(v.value)}`);
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setResult({ status: "error", message: body?.error ?? "Terjadi kesalahan" });
        return;
      }
      const data = (await res.json()) as { source: "hibp" | "mock"; breaches: Breach[] };
      if (data.breaches.length > 0) {
        setResult({ status: "bocor", breach: data.breaches[0], source: data.source });
      } else {
        setResult({ status: "aman", source: data.source });
      }
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
          Masukkan email kamu. Kamu aman — query diperiksa langsung di perangkatmu,
          tidak pernah dikirim ke server mana pun.
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

        {result.status === "bocor" && (
          <div className="mt-10 w-full max-w-2xl">
            <div className={`border-2 ${LINE} bg-cream/5 p-5`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">⚠ Kebocoran terdeteksi</span>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${result.source === "hibp" ? "text-[#4cd99b]" : "text-cream/40"}`}>
                  {result.source === "hibp" ? "● Data real (HIBP)" : "● Data demo"}
                </span>
              </div>
              <h2 className="mt-3 font-display font-bold text-xl">{result.breach.Domain}</h2>
              <p className="mt-2 text-sm text-cream/80 leading-relaxed">{result.breach.Description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.breach.DataClasses.map((c) => (
                  <span key={c} className="border border-cream/25 px-2 py-1 font-mono text-[11px] text-cream/70">
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-cream/50">
                Bocor pada {new Date(result.breach.BreachDate).getFullYear()} · {formatNumber(result.breach.PwnCount)} akun terdampak
              </p>
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
              <span className={`font-mono text-[10px] uppercase tracking-widest ${result.source === "hibp" ? "text-[#4cd99b]" : "text-cream/40"}`}>
                {result.source === "hibp" ? "● Data real (HIBP)" : "● Data demo"}
              </span>
            </div>
            <p className="mt-2 text-sm text-cream/80">
              Bagus! Tidak ada kecocokan. Tetap waspada — cek rutin
              dan jangan pakai satu password untuk semua akun.
            </p>
          </div>
        )}
      </div>
    </FeatureShell>
  );
}