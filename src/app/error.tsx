"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-cream/60">0://ERROR</span>
      <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,6vw,4rem)]">
        Terjadi Kesalahan
      </h1>
      <p className="max-w-md font-body text-sm text-cream/70 md:text-base">
        Maaf, halaman ini mengalami gangguan. Silakan muat ulang — atau kembali ke beranda.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-3 text-sm font-bold hover:bg-cream/80"
        >
          Muat Ulang →
        </button>
        <Link
          href="/"
          className="border border-cream/25 px-6 py-3 font-mono text-sm uppercase tracking-widest hover:border-cream/60"
        >
          ← Beranda
        </Link>
      </div>
    </div>
  );
}