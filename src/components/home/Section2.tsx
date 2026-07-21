"use client";

const LINE = "border-[#1A3CDB]";

export function Section2() {
  return (
    <section className="bg-white w-full min-w-full">
      {/* Row 1 - 4 kolom */}
      <div className={`hidden lg:grid grid-cols-[2.6%_65%_29.05%_1fr] grid-rows-[28vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R1C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R1C2</div>
        <div className="grid grid-rows-[0.3fr_1fr]">
          <div className={`flex items-start justify-start p-1 text-[8px] text-white/40 font-mono border-b-2 border-r-2 border-cream/25 bg-[#1A3CDB]`}>R1C3-1</div>
          <div className={`flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono border-r-2 ${LINE}`}>R1C3-2</div>
        </div>
        <div className={`border-r-2 ${LINE} grid grid-rows-[0.3fr_1fr]`}>
          <div className={`flex items-start justify-start p-1 text-[8px] text-white/40 font-mono border-b-2 ${LINE} bg-[#1A3CDB]`}>R1C4-1</div>
          <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R1C4-2</div>
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
    </section>
  );
}