"use client";

import { useState } from "react";
import { FeatureShell } from "@/components/layout/FeatureShell";
import { checkPasswordPwned } from "@/lib/pwned";
import {
  calculatePasswordEntropy,
  getTimeToCrack,
  getStrengthColor,
  getStrengthLabel,
} from "@/lib/utils";
import { clampInt } from "@/lib/validate";

const LINE = "border-cream/25";

const AMBIGUOUS = new Set(["i", "l", "1", "L", "o", "0", "O"]);
const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

type Options = {
  length: number;
  count: number;
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
};

function generatePassword(opts: Options): string {
  let pool = "";
  if (opts.lower) pool += CHARSETS.lower;
  if (opts.upper) pool += CHARSETS.upper;
  if (opts.numbers) pool += CHARSETS.numbers;
  if (opts.symbols) pool += CHARSETS.symbols;
  if (opts.excludeAmbiguous) pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
  if (pool.length === 0) return "";

  const random = new Uint32Array(opts.length);
  crypto.getRandomValues(random);
  return Array.from(random)
    .map((n) => pool[n % pool.length])
    .join("");
}

export default function PasswordPage() {
  const [opts, setOpts] = useState<Options>({
    length: 16,
    count: 3,
    lower: true,
    upper: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: true,
  });
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [checkInput, setCheckInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{ pwned: boolean; count: number; error?: string } | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInput || checking) return;
    setChecking(true);
    setCheckResult(null);
    const res = await checkPasswordPwned(checkInput);
    setCheckResult(res);
    setChecking(false);
  };

  const anyCharset = opts.lower || opts.upper || opts.numbers || opts.symbols;

  const set = (patch: Partial<Options>) => setOpts((prev) => ({ ...prev, ...patch }));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anyCharset) return;
    const length = clampInt(opts.length, 8, 64);
    const count = clampInt(opts.count, 1, 10);
    const fixed = { ...opts, length, count };
    setOpts(fixed);
    setResults(Array.from({ length: count }, () => generatePassword(fixed)));
    setCopied(null);
  };

  const copy = async (pw: string) => {
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(pw);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <FeatureShell label="3://CRACK">
      <div className="mx-auto max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">3://CRACK — Generator password</span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            Buat password super kuat
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            Password dibuat langsung di perangkatmu — tidak pernah dikirim atau disimpan.
          </p>

          <form onSubmit={handleGenerate} className="mt-8 space-y-6">
            <div className={`border-2 ${LINE} bg-cream/5 p-5`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream/50">Panjang ({opts.length})</span>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    value={opts.length}
                    onChange={(e) => set({ length: Number(e.target.value) })}
                    className="accent-[#f5f0d5]"
                  />
                  <span className="font-mono text-xs text-cream/40">8 – 64 karakter</span>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream/50">Jumlah ({opts.count})</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={opts.count}
                    onChange={(e) => set({ count: Number(e.target.value) })}
                    className="accent-[#f5f0d5]"
                  />
                  <span className="font-mono text-xs text-cream/40">1 – 10 password</span>
                </label>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(
                  [
                    ["lower", "a-z"],
                    ["upper", "A-Z"],
                    ["numbers", "0-9"],
                    ["symbols", "#$%"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 font-mono text-sm">
                    <input
                      type="checkbox"
                      checked={opts[key]}
                      onChange={(e) => set({ [key]: e.target.checked })}
                      className="accent-[#f5f0d5]"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <label className="mt-3 flex items-center gap-2 font-mono text-sm">
                <input
                  type="checkbox"
                  checked={opts.excludeAmbiguous}
                  onChange={(e) => set({ excludeAmbiguous: e.target.checked })}
                  className="accent-[#f5f0d5]"
                />
                Hindari karakter ambigu (il1Lo0O)
              </label>
            </div>

            {!anyCharset && (
              <p className="font-mono text-sm text-[#ff6b6b]">Pilih minimal satu jenis karakter.</p>
            )}

            <button
              type="submit"
              disabled={!anyCharset}
              className="w-full bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-4 text-sm font-bold transition-opacity disabled:opacity-40"
            >
              Generate →
            </button>
          </form>

          {results.length > 0 && (
            <div className="mt-8 space-y-3">
              {results.map((pw, i) => {
                const entropy = calculatePasswordEntropy(pw);
                return (
                  <div key={i} className={`border-2 ${LINE} bg-cream/5 p-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <code className="break-all font-mono text-sm md:text-base">{pw}</code>
                      <button
                        onClick={() => copy(pw)}
                        className="shrink-0 border border-cream/25 px-3 py-1 font-mono text-xs uppercase tracking-widest hover:border-cream/60"
                      >
                        {copied === pw ? "✓ Tersalin" : "Copy"}
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
                      <span className={getStrengthColor(entropy)}>● {getStrengthLabel(entropy)}</span>
                      <span className="text-cream/50">Entropy {entropy.toFixed(1)} bit</span>
                      <span className="text-cream/50">Estimasi crack: {getTimeToCrack(entropy)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className={`mt-12 border-2 ${LINE} bg-cream/5 p-5`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
                Real check — password pernah bocor?
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4cd99b]">● Data real (HIBP)</span>
            </div>
            <p className="mt-2 text-sm text-cream/70">
              Cek apakah password kamu sudah pernah muncul di kebocoran data. Password di-hash SHA-1 di
              perangkatmu — hanya 5 karakter prefix yang dikirim (k-anonymity). Powered by Have I Been Pwned.
            </p>
            <form onSubmit={handleCheck} className="mt-4 flex" noValidate>
              <input
                type="text"
                value={checkInput}
                onChange={(e) => setCheckInput(e.target.value)}
                placeholder="masukkan password untuk dicek"
                aria-label="Password untuk dicek"
                className="flex-1 bg-transparent px-3 py-2 font-mono text-sm text-cream placeholder:text-cream/40 outline-none border border-cream/25"
              />
              <button
                type="submit"
                disabled={checking || !checkInput}
                className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-5 py-2 text-xs font-bold disabled:opacity-50"
              >
                {checking ? "Mengecek…" : "Cek"}
              </button>
            </form>
            {checkResult && (
              <div className="mt-4">
                {checkResult.error ? (
                  <p className="font-mono text-xs text-cream/50">
                    Terhubung ke HIBP gagal ({checkResult.error}) — pakai data offline.
                  </p>
                ) : checkResult.pwned ? (
                  <p className="font-mono text-sm text-[#ff6b6b]">
                    ⚠ Password ini ditemukan {checkResult.count.toLocaleString("id-ID")}× dalam kebocoran data. JANGAN dipakai.
                  </p>
                ) : (
                  <p className="font-mono text-sm text-[#4cd99b]">
                    ✓ Password tidak ditemukan dalam kebocoran data yang diketahui.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
    </FeatureShell>
  );
}