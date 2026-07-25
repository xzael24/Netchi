"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE = "border-cream/25";

export function Section3() {
  const pinRef = useRef<HTMLDivElement>(null);
  const r6Ref = useRef<HTMLDivElement>(null);
  const r7Ref = useRef<HTMLDivElement>(null);
  const r9Ref = useRef<HTMLDivElement>(null);
  const r10Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top+=-80",
      end: () => "+=" + Math.max(el.offsetHeight * 4, window.innerHeight),
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = r6Ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top+=202",
      end: "+=1000",
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = r7Ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top+=284",
      end: "+=1000",
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = r9Ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top+=284",
      end: "+=1000",
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = r10Ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "top top+=366",
      end: "+=1000",
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  return (
    <section className="bg-white w-screen min-w-full">
      <div className="bg-[#1A3CDB]">
      <div className={`hidden lg:grid grid-cols-[2.6%_18.81%_75.24%_1fr] grid-rows-[0.5fr] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        {[
          { id: "R1C1" },
          { id: "R1C2" },
          { id: "R1C3" },
          { id: "R1C4" },
        ].map((cell, i) => (
          <div key={`r1-${i}`} className={`${i < 2 ? `border-r-2 ${LINE}` : i === 2 ? "border-r-2 border-r-[#1A3CDB]" : ""} ${i >= 2 ? "bg-white text-[#1A3CDB]/40" : "text-cream/30"} flex items-start justify-start p-1 text-[8px] font-mono`}>
            {cell.id}
          </div>
        ))}
      </div>
      <div ref={pinRef} className="z-10">
      <div className={`hidden lg:grid grid-cols-[2.6%_18.81%_75.24%_1fr] grid-rows-[4fr] min-h-[25vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        {[
          { id: "R2C1" },
          { id: "R2C2" },
          { id: "R2C3" },
].map((cell, i) => {
          if (i === 1) return (
            <div key={`r2-${i}`} className="col-span-2 border-r-2 border-cream/25 flex flex-col items-start justify-end pl-1 md:pl-2 relative">
              <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R2C2</span>
              <h2 className="font-display font-bold text-cream leading-[1] tracking-[-0.03em] text-[clamp(2rem,5cqw,4rem)]">
                Artikel Kami
              </h2>
            </div>
          );
          if (i === 2) return (
            <div key={`r2-${i}`} className="flex items-end justify-start p-1 relative">
              <span className="absolute top-0 left-0 p-1 text-[8px] text-cream/30 font-mono">R2C3</span>
              <span
                className="font-mono font-extrabold uppercase tracking-widest text-cream whitespace-nowrap"
                style={{ writingMode: "vertical-rl", fontSize: "clamp(0.3rem, 14cqw, 0.5rem)" }}
              >
                2://EDU
              </span>
            </div>
          );
          return (
            <div key={`r2-${i}`} className="border-r-2 border-cream/25 flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">
              {cell.id}
            </div>
          );
        })}
      </div>

      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R3C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R3C3</div>
      </div>

      <div className={`hidden lg:grid grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C2</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C3</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R4C4</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R4C5</div>
      </div>
      </div>

      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[20vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R5C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R5C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R5C3</div>
      </div>

      <div ref={r6Ref} className={`hidden lg:grid z-20 relative grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R6C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R6C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R6C3</div>
      </div>

      <div ref={r7Ref} className={`hidden lg:grid z-30 relative grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R7C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R7C2</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R7C3</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R7C4</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R7C5</div>
      </div>

      <div className={`hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[20vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R8C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R8C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R8C3</div>
      </div>

      <div ref={r9Ref} className={`hidden lg:grid z-40 relative grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R9C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R9C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R9C3</div>
      </div>

      <div ref={r10Ref} className={`hidden lg:grid z-50 relative grid-cols-[2.6%_31.35%_31.35%_31.35%_3.35%] grid-rows-[20vh] w-full min-w-full bg-[#1A3CDB] text-cream border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R10C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R10C2</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R10C3</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono`}>R10C4</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-cream/30 font-mono">R10C5</div>
      </div>
    </div>
    </section>
  );
}