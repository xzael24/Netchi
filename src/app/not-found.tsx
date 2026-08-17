import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-cream/60">4://NOT_FOUND</span>
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
  );
}