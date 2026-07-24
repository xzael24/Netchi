"use client";

const LINE = "border-[#1A3CDB]";

export function Section2() {
  return (
    <section className="bg-white w-full min-w-full">
      {/* Row 1 - 4 kolom */}
      <div className={`hidden lg:grid grid-cols-[2.6%_65%_29.05%_1fr] grid-rows-[28vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R1C1</div>
        <div className={`border-r-2 ${LINE} flex items-end justify-start p-6 md:p-8`}>
          <h2 className="font-display font-bold text-[#1A3CDB] leading-[1] tracking-wide uppercase text-[3.5vw]">
            Yang Bisa Kamu<br />Lakukan
          </h2>
        </div>
        <div className="grid grid-rows-[0.3fr_1fr]">
          <div className={`flex items-start justify-start p-1 text-[8px] text-white/40 font-mono border-b-2 border-r-2 border-cream/25 bg-[#1A3CDB]`}>R1C3-1</div>
          <div className={`flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono border-r-2 ${LINE}`}>R1C3-2</div>
        </div>
        <div className={`border-r-2 ${LINE} grid grid-rows-[0.3fr_1fr]`}>
          <div className={`flex items-start justify-start p-1 text-[8px] text-white/40 font-mono border-b-2 ${LINE} bg-[#1A3CDB]`}>R1C4-1</div>
          <div className="relative flex items-end justify-start p-1">
            <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R1C4-2</span>
            <span
              className="font-mono font-extrabold uppercase tracking-widest text-[#1A3CDB] whitespace-nowrap"
              style={{ writingMode: "vertical-rl", fontSize: "clamp(0.3rem, 14cqw, 0.5rem)" }}
            >
              1://TOOLS
            </span>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className={`hidden lg:grid grid-cols-[2.6%_repeat(5,18.81%)_1fr] grid-rows-[15vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R2C1</div>
        {[
          { label: "1://SCAN", title: "Lacak Kebocoran\nData", desc: "Cek apakah email & datamu\npernah bocor" },
          { label: "2://SCORE", title: "Ukur Skor\nPrivasi", desc: "Evaluasi seberapa aman\nkebiasaan digitalmu" },
          { label: "3://CRACK", title: "Buat Password\nKuat", desc: "Generate password rumit\nanti-crack" },
          { label: "4://LEARN", title: "Pahami UU\nPDP", desc: "Kenali hak-hakmu\natas data pribadi" },
          { label: "5://MASK", title: "Lindungi Identitas\nAsli", desc: "Pakai data palsu buat daftar\ndi tempat abal-abal" },
        ].map((item, i) => (
          <div key={i} className={`border-r-2 ${LINE} grid grid-rows-[0.08fr_1fr]`}>
            <div className={`border-b-2 ${LINE} flex items-center justify-start p-1`}>
              <span className="font-mono font-extrabold uppercase tracking-widest text-[#1A3CDB] text-[clamp(0.5rem,10cqw,0.75rem)]">{item.label}</span>
              <span className="ml-2 text-[8px] text-[#1A3CDB]/40 font-mono">R2C{i+2}-1</span>
            </div>
            <div className="flex flex-col items-start justify-center p-3 whitespace-pre-line">
              <span className="font-display font-bold text-[#1A3CDB] leading-tight uppercase text-[clamp(0.7rem,4cqw,1.1rem)]">{item.title}</span>
              <span className="font-display text-[#1A3CDB]/70 leading-snug text-[clamp(0.55rem,2.5cqw,0.8rem)] mt-1">{item.desc}</span>
            </div>
          </div>
        ))}
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R2C7</div>
      </div>

      {/* Row 3 - 3 kolom */}
      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R3C3</div>
      </div>

      {/* Row 4 - tanpa split */}
      <div className={`hidden lg:grid grid-cols-[2.6%_repeat(5,18.81%)_1fr] grid-rows-[15vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R4C1</div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>
            {i === 0 ? (
              <div className="flex items-end justify-start w-full h-full relative">
                <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R4C2</span>
                <h2 className="font-display font-bold text-[#1A3CDB] leading-[1] tracking-wide uppercase text-[clamp(0.8rem,4cqw,1.2rem)]">
                  Fakta<br />Privasi
                </h2>
              </div>
            ) : i === 1 ? (
              <div className="flex flex-col items-center justify-center w-full h-full p-2 relative">
                <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R4C3</span>
                <span className="font-display font-black text-[#1A3CDB] leading-[0.85] text-[clamp(2rem,10cqw,3.5rem)] tracking-[-0.04em]">
                  1,2 MILIAR
                </span>
                <span className="font-display font-bold text-[#1A3CDB]/80 leading-tight text-[clamp(0.55rem,2.5cqw,0.85rem)] uppercase tracking-[0.1em]">
                  akun bocor dalam 5 tahun
                </span>
              </div>
            ) : (
              `R4C${i + 2}`
            )}
          </div>
        ))}
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R4C7</div>
      </div>

      {/* Row 5 - 3 kolom kayak row 3 */}
      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R5C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R5C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R5C3</div>
      </div>
    </section>
  );
}