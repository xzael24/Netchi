"use client";

import { useState } from "react";
import Link from "next/link";
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
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <header className={`grid grid-cols-[2.6%_18.81%_78%_1fr] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center border-r-2 border-cream/25 p-1 font-mono text-[9px] text-cream/30">1</div>
        <Link href="/" className={`flex items-center border-r-2 ${LINE} pl-2 md:pl-4 font-display font-bold tracking-widest`}>
          Netchi Sentinel
        </Link>
        <div className={`flex items-center justify-between border-r-2 ${LINE} px-3 md:px-4`}>
          <span className="font-mono text-xs tracking-widest uppercase text-cream/60">3://CRACK</span>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-white">← Beranda</Link>
        </div>
        <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">PASSWORD</div>
      </header>

      <div className="flex-1 px-6 py-10 md:px-10">
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
        </div>
      </div>
    </main>
  );
}