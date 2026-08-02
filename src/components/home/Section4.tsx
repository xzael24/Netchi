"use client";

const BARS = 16;

export function Section4() {
  return (
    <section className="relative bg-white text-[#1A3CDB] w-full h-full overflow-hidden">
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <span className="font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase mb-8">
          (4)//Kesimpulan — data yang bocor nggak bisa ditarik kembali
        </span>

        <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,7cqw,5.5rem)] text-[#1A3CDB]">
          <span className="block overflow-hidden py-1">
            <span className="block">Yang belum bocor,</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="block">masih milikmu.</span>
          </span>
        </h2>

        <p className="mt-8 max-w-md font-mono text-[#1A3CDB]/50 text-xs md:text-sm leading-relaxed">
          Cek, perkuat, dan lindungi identitas digitalmu sekarang —
          sebelum jadi statistik berikutnya.
        </p>

        <a
          href="/breach"
          className="group mt-10 inline-flex items-center gap-3 px-8 py-4 bg-[#1A3CDB] text-white font-display font-bold text-[clamp(0.9rem,1.6cqw,1.1rem)] rounded-full hover:bg-[#1A3CDB]/90 transition-colors"
        >
          Mulai Lindungi Sekarang
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

        <div className="font-mono text-[#1A3CDB]/40 text-xs tracking-widest uppercase mt-10 flex items-center justify-center gap-4">
          <span>5://FINAL</span>
          <span>·</span>
          <span>Netchi Privacy Shield</span>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col" aria-hidden>
        {Array.from({ length: BARS }).map((_, i) => (
          <div
            key={i}
            data-curtain-bar
            className={`w-full origin-top ${i % 2 ? "bg-[#1530B8]" : "bg-[#1A3CDB]"}`}
            style={{ height: `${100 / BARS}%` }}
          />
        ))}
      </div>
    </section>
  );
}
