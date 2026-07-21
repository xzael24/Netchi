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
          <div className="flex items-end justify-start p-1">
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
      <div className={`hidden lg:grid grid-cols-[2.6%_repeat(5,18.81%)_1fr] grid-rows-[22vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R2C1</div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`border-r-2 ${LINE} grid grid-rows-[0.3fr_1fr]`}>
            <div className={`border-b-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R2C{i+2}-1</div>
            <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R2C{i+2}-2</div>
          </div>
        ))}
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R2C7</div>
      </div>

      {/* Row 3 - 3 kolom */}
      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[22vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R3C3</div>
      </div>
    </section>
  );
}