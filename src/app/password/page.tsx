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
import { useLocale } from "@/components/providers/LocaleProvider";

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

const LEET: Record<string, string[]> = {
  a: ["@", "4"], i: ["1", "!"], o: ["0"], e: ["3"], s: ["$", "5"], b: ["8"], t: ["7"], g: ["9"],
};

function generateFromWord(word: string, opts: Options): string {
  const r = crypto.getRandomValues(new Uint32Array(64));
  let ri = 0;
  const rand = () => r[ri++] / 4294967296;
  const symbols = CHARSETS.symbols.split("");
  const pick = (arr: string[]) => arr[Math.floor(rand() * arr.length)];

  const clean = word.replace(/[^a-zA-Z0-9]/g, "");
  const core = (clean || "kata")
    .split("")
    .map((c) => {
      const lower = c.toLowerCase();
      const leets = LEET[lower];
      if (leets && rand() < 0.6) return pick(leets);
      if (opts.upper && rand() < 0.5) return lower.toUpperCase();
      if (opts.lower && rand() < 0.3) return lower;
      return c;
    })
    .join("");

  const cap = core.charAt(0).toUpperCase() + core.slice(1);
  const pre = opts.symbols && rand() < 0.7 ? pick(symbols) : "";
  const digits = opts.numbers ? String(Math.floor(rand() * 9000) + 1000) : "";
  const post = opts.symbols ? pick(symbols) : "";
  let pw = pre + cap + digits + post;
  const needs = Math.max(0, 8 - pw.length);
  if (needs > 0) pw += "xK#7".repeat(Math.ceil(needs / 4)).slice(0, needs);
  return pw;
}

export default function PasswordPage() {
  const { locale, t } = useLocale();
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
  const [word, setWord] = useState("");

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
    const base = word.trim();
    setResults(Array.from({ length: count }, () => (base ? generateFromWord(base, fixed) : generatePassword(fixed))));
    setCopied(null);
  };

  const copy = async (pw: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pw);
      } else {
        const ta = document.createElement("textarea");
        ta.value = pw;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(pw);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <FeatureShell label="3://CRACK">
      <div className="mx-auto max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">{t("pg.label")}</span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            {t("pg.title")}
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            {t("pg.desc")}
          </p>

          <form onSubmit={handleGenerate} className="mt-8 space-y-6">
            <div className={`border-2 ${LINE} bg-cream/5 p-5`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream/50">{t("pg.length")} ({opts.length})</span>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    value={opts.length}
                    onChange={(e) => set({ length: Number(e.target.value) })}
                    className="accent-[#f5f0d5]"
                  />
                  <span className="font-mono text-xs text-cream/40">{t("pg.charRange")}</span>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream/50">{t("pg.count")} ({opts.count})</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={opts.count}
                    onChange={(e) => set({ count: Number(e.target.value) })}
                    className="accent-[#f5f0d5]"
                  />
                  <span className="font-mono text-xs text-cream/40">{t("pg.countRange")}</span>
                </label>
              </div>

              <div className="mt-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream/50">{t("pg.wordLabel")}</span>
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder={t("pg.wordPlaceholder")}
                    aria-label={t("pg.wordAria")}
                    className="border border-cream/25 bg-transparent px-3 py-2 font-mono text-sm text-cream placeholder:text-cream/40 outline-none"
                  />
                  <span className="font-mono text-xs text-cream/40">Contoh: &quot;John Doe&quot; → &quot;@J0hnDoe24!&quot;</span>
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
                {t("pg.ambiguous")}
              </label>
            </div>

            {!anyCharset && (
              <p className="font-mono text-sm text-[#ff6b6b]">{t("pg.noCharset")}</p>
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
                        {copied === pw ? t("pg.copied") : "Copy"}
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
                      <span className={getStrengthColor(entropy)}>● {getStrengthLabel(entropy, locale)}</span>
                      <span className="text-cream/50">{t("pg.entropy", { n: entropy.toFixed(1) })}</span>
                      <span className="text-cream/50">{t("pg.crackLabel", { time: getTimeToCrack(entropy, locale) })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className={`mt-12 border-2 ${LINE} bg-cream/5 p-5`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
                {t("pg.checkTitle")}
              </span>
            </div>
            <p className="mt-2 text-sm text-cream/70">
              {t("pg.checkDesc")}
            </p>
            <form onSubmit={handleCheck} className="mt-4 flex" noValidate>
              <input
                type="text"
                value={checkInput}
                onChange={(e) => setCheckInput(e.target.value)}
                placeholder={t("pg.checkPlaceholder")}
                aria-label="Password untuk dicek"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-sm text-cream placeholder:text-cream/40 outline-none border border-cream/25"
              />
              <button
                type="submit"
                disabled={checking || !checkInput}
                className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-5 py-2 text-xs font-bold disabled:opacity-50"
              >
                {checking ? t("pg.checking") : t("pg.checkBtn")}
              </button>
            </form>
            {checkResult && (
              <div className="mt-4">
                {checkResult.error ? (
                  <p className="font-mono text-xs text-cream/50">
                    {t("pg.checkErr", { err: checkResult.error })}
                  </p>
                ) : checkResult.pwned ? (
                  <p className="font-mono text-sm text-[#ff6b6b]">
                    {t("pg.checkPwned", { count: checkResult.count.toLocaleString("id-ID") })}
                  </p>
                ) : (
                  <p className="font-mono text-sm text-[#4cd99b]">
                    {t("pg.checkSafe")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
    </FeatureShell>
  );
}