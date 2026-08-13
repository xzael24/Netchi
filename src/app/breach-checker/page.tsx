"use client";

import { useState } from "react";
import Link from "next/link";
import { checkPasswordPwned } from "@/lib/pwned";
import { isCommonPassword } from "@/data/commonPasswords";
import { FeatureShell } from "@/components/layout/FeatureShell";
import { useLocale } from "@/components/providers/LocaleProvider";

const LINE = "border-cream/25";

type Result =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "error"; message: string }
  | { status: "common" }
  | { status: "pwned"; count: number; offline: boolean }
  | { status: "safe"; offline: boolean };

export default function BreachCheckerPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pw = input.trim();
    if (!pw) {
      setResult({ status: "error", message: t("breach.errEmpty") });
      return;
    }
    if (isCommonPassword(pw)) {
      setResult({ status: "common" });
      return;
    }
    setResult({ status: "checking" });
    const res = await checkPasswordPwned(pw);
    if (res.error) {
      setResult({ status: "error", message: t("breach.errConn", { err: res.error }) });
      return;
    }
    setResult(res.pwned ? { status: "pwned", count: res.count, offline: false } : { status: "safe", offline: false });
  };

  return (
    <FeatureShell label="1://SCAN">
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-4">
          {t("breach.label")}
        </span>
        <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2.2rem,6vw,4.5rem)] text-center">
          {t("breach.title")}
        </h1>
        <p className="mt-4 max-w-lg text-center font-body text-cream/70 text-sm md:text-base">
          {t("breach.desc")}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xl" noValidate>
          <div className={`flex border-2 ${LINE}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("breach.placeholder")}
              aria-label="Password untuk dicek"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm text-cream placeholder:text-cream/40 outline-none"
            />
            <button
              type="submit"
              disabled={result.status === "checking"}
              className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-3 text-sm font-bold hover:bg-cream/80 disabled:opacity-60"
            >
              {result.status === "checking" ? t("breach.checking") : t("breach.check")}
            </button>
          </div>

          {result.status === "error" && (
            <p className="mt-3 font-mono text-sm text-[#ff6b6b]">⚠ {result.message}</p>
          )}
        </form>

        {result.status === "common" && (
          <div className="mt-10 w-full max-w-xl border-2 border-[#ff6b6b]/50 bg-cream/5 p-5 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">{t("breach.commonTitle")}</span>
            <p className="mt-2 text-sm text-cream/80">
              {t("breach.commonBody")}
            </p>
            <Link href="/password" className="mt-3 inline-block font-mono uppercase tracking-widest text-[#ff4d4d]">
              {t("breach.strongLink")}
            </Link>
          </div>
        )}

        {result.status === "pwned" && (
          <div className="mt-10 w-full max-w-xl border-2 border-[#ff6b6b]/50 bg-cream/5 p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b6b]">{t("breach.pwnedTitle")}</span>
            </div>
            <p className="mt-3 text-sm text-cream/80 leading-relaxed">
              {t("breach.pwnedLead")} <b className="text-[#ff6b6b]">{result.count.toLocaleString("id-ID")}×</b>{" "}
              {t("breach.pwnedTail")}
            </p>
            <div className={`mt-4 border-2 ${LINE} p-4`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-cream/50">{t("breach.adviceTitle")}</span>
              <ul className="mt-2 list-inside list-disc text-sm text-cream/80">
                <li>{t("breach.advice1")}</li>
                <li>{t("breach.advice2")}</li>
                <li>{t("breach.advice3")}</li>
              </ul>
              <Link href="/password" className="mt-3 inline-block font-mono uppercase tracking-widest text-[#ff4d4d]">
                {t("breach.strongLink")}
              </Link>
            </div>
          </div>
        )}

        {result.status === "safe" && (
          <div className="mt-10 w-full max-w-xl border-2 border-cream/25 bg-cream/5 p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#4cd99b]">{t("breach.safeTitle")}</span>
            </div>
            <p className="mt-2 text-sm text-cream/80">
              {t("breach.safeBody")}
            </p>
          </div>
        )}

        <p className="mt-8 font-mono text-[10px] text-cream/40">
          Powered by Have I Been Pwned — Pwned Passwords (data kebocoran password terbesar di dunia)
        </p>
      </div>
    </FeatureShell>
  );
}