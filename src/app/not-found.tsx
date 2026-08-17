import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 pt-[72px] pb-12 md:px-10 lg:pt-[64px]">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(3rem,10vw,7rem)]">
            404
          </h1>
          <p className="max-w-md font-body text-sm text-cream/70 md:text-base">
            Halaman yang kamu cari tidak ada — mungkin salah ketik, atau halaman itu sudah dipindah.
          </p>
          <Link
            href="/"
            className="bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-3 text-sm font-bold hover:bg-cream/80"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 z-40 w-full overflow-hidden border-t-2 border-cream/25 bg-[#1A3CDB] py-1.5"
        aria-hidden
      >
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-widest text-cream/40">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  404 • Netchi Sentinel • Lindungi Identitas Digitalmu •
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}