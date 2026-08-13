"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

const LINE = "border-[#1A3CDB]";

function AnimatedFact() {
  const { t } = useLocale();
  const [phase, setPhase] = useState(0);
  // 0: sweeping up, 1: at top (text1), 2: sweeping down, 3: at bottom (text2)

  useEffect(() => {
    const t = (delay: number) => new Promise((r) => setTimeout(r, delay));

    const loop = async () => {
      while (true) {
        setPhase(0); await t(1200);
        setPhase(1); await t(1500);
        setPhase(2); await t(1200);
        setPhase(3); await t(1500);
      }
    };
    const c = loop();
    return () => { c.then(() => {}); };
  }, []);

  const showFirst = phase === 0 || phase === 1;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 relative overflow-hidden">
      <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono z-10">R4C3</span>

      {/* Wiper line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-[#1A3CDB] z-20"
        animate={{
          top: phase === 0 ? ["100%", "-5%"] : phase === 2 ? ["-5%", "105%"] : phase === 1 ? "-5%" : "105%",
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Text */}
      <AnimatePresence mode="popLayout">
        {showFirst ? (
          <motion.span
            key="phish"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-[#1A3CDB] leading-[0.85] text-[clamp(2rem,10cqw,3.5rem)] tracking-[-0.04em] text-center w-full"
          >
            {t("s2.factOneOfFour")}
          </motion.span>
        ) : (
          <motion.span
            key="bocor"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-[#1A3CDB] leading-[0.85] text-[clamp(2rem,10cqw,3.5rem)] tracking-[-0.04em] text-center w-full"
          >
            {t("s2.factBillion")}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {showFirst ? (
          <motion.span
            key="phish-sub"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-[#1A3CDB]/80 leading-tight text-[clamp(0.55rem,2.5cqw,0.85rem)] uppercase tracking-[0.1em] text-center w-full"
          >
            {t("s2.factPhishSub")}
          </motion.span>
        ) : (
          <motion.span
            key="bocor-sub"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-[#1A3CDB]/80 leading-tight text-[clamp(0.55rem,2.5cqw,0.85rem)] uppercase tracking-[0.1em] text-center w-full"
          >
            {t("s2.factBreachSub")}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedDash({ label, main1 = "-", main2 = "-", sub1 = "-", sub2 = "-" }: { label: string; main1?: string; main2?: string; sub1?: string; sub2?: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = (delay: number) => new Promise((r) => setTimeout(r, delay));
    const loop = async () => {
      while (true) {
        setPhase(0); await t(1200);
        setPhase(1); await t(1500);
        setPhase(2); await t(1200);
        setPhase(3); await t(1500);
      }
    };
    const c = loop();
    return () => { c.then(() => {}); };
  }, []);

  const showFirst = phase === 0 || phase === 1;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 relative overflow-hidden">
      <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono z-10">{label}</span>

      <motion.div
        className="absolute left-0 w-full h-[2px] bg-[#1A3CDB] z-20"
        animate={{
          top: phase === 0 ? ["100%", "-5%"] : phase === 2 ? ["-5%", "105%"] : phase === 1 ? "-5%" : "105%",
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {showFirst ? (
<motion.span
              key="a"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-[#1A3CDB] leading-[0.85] text-[clamp(2rem,10cqw,3.5rem)] tracking-[-0.04em] text-center w-full"
            >
              {main1}
            </motion.span>
          ) : (
            <motion.span
              key="b"
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-[#1A3CDB] leading-[0.85] text-[clamp(2rem,10cqw,3.5rem)] tracking-[-0.04em] text-center w-full"
            >
              {main2}
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {showFirst ? (
            <motion.span
              key="a-sub"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[#1A3CDB]/80 leading-tight text-[clamp(0.55rem,2.5cqw,0.85rem)] uppercase tracking-[0.1em] text-center w-full"
            >
              {sub1}
            </motion.span>
          ) : (
            <motion.span
              key="b-sub"
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[#1A3CDB]/80 leading-tight text-[clamp(0.55rem,2.5cqw,0.85rem)] uppercase tracking-[0.1em] text-center w-full"
            >
              {sub2}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Section2() {
  const { t } = useLocale();
  return (
    <section className="bg-white w-screen min-w-full overflow-hidden">
      {/* Row 1 - 4 kolom */}
      <div className={`grid grid-cols-[25px_65fr_29fr_25px] lg:grid-cols-[2.6%_65%_29.05%_minmax(0,1fr)] grid-rows-[16vh] lg:grid-rows-[28vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R1C1</div>
        <div className={`border-r-2 ${LINE} flex items-end justify-start pt-6 md:pt-8 pl-1 md:pl-2 pr-6 md:pr-8`}>
          <h2 className="font-display font-bold text-[#1A3CDB] leading-[1] tracking-wide uppercase text-[clamp(1.6rem,7.5vw,3.5rem)]">
            {t("s2.title").split("\n").map((l, i) => (
              <span key={i}>
                {l}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
        </div>
        <div className="grid grid-rows-[0.3fr_1fr]">
          <div className={`flex items-start justify-start p-1 text-[8px] text-white/40 font-mono border-b-2 border-r-2 border-cream/25 bg-[#1A3CDB]`}>R1C3-1</div>
          <div className={`flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono border-r-2 ${LINE}`}>R1C3-2</div>
        </div>
        <div className={`grid grid-rows-[0.3fr_1fr]`}>
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
      <div className={`grid grid-cols-[25px_minmax(0,1fr)_25px] lg:grid-cols-[2.6%_minmax(0,1fr)_3.35%] lg:grid-rows-[15vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R2C1</div>
        <div className={`border-r-2 ${LINE} grid grid-cols-2 gap-[2px] bg-[#1A3CDB] lg:grid-cols-5`}>
          {[
            { label: "1://SCAN", title: t("s2.toolScanTitle"), desc: t("s2.toolScanDesc") },
            { label: "2://SCORE", title: t("s2.toolScoreTitle"), desc: t("s2.toolScoreDesc") },
            { label: "3://CRACK", title: t("s2.toolCrackTitle"), desc: t("s2.toolCrackDesc") },
            { label: "2://EDU", title: t("s2.toolEduTitle"), desc: t("s2.toolEduDesc") },
            { label: "5://MASK", title: t("s2.toolMaskTitle"), desc: t("s2.toolMaskDesc") },
          ].map((item, i) => (
            <div key={i} className={`grid grid-rows-[0.12fr_1fr] bg-white container-cell ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
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
        </div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R2C7</div>
      </div>

      {/* Row 3 - 3 kolom */}
      <div className={`grid grid-cols-[25px_minmax(0,1fr)_25px] lg:grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R3C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R3C3</div>
      </div>

      {/* Row 4 - tanpa split */}
      <div className={`grid grid-cols-[25px_minmax(0,1fr)_25px] lg:grid-cols-[2.6%_minmax(0,1fr)_3.35%] lg:grid-rows-[15vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R4C1</div>
        <div className={`border-r-2 ${LINE} grid grid-cols-1 gap-[2px] bg-[#1A3CDB] lg:grid-cols-5`}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono bg-white container-cell`}>
              {i === 0 ? (
                <div className="flex items-end justify-start w-full h-full relative">
                  <span className="absolute top-0 left-0 p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R4C2</span>
                  <h2 className="font-display font-bold text-[#1A3CDB] leading-[1] tracking-wide uppercase text-[clamp(2rem,6.5cqw,2.8rem)]">
                    {t("s2.fakta").split("\n").map((l, i) => (
                      <span key={i}>
                        {l}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>
              ) : i === 1 ? (
                <AnimatedFact />
              ) : i === 2 ? (
                <AnimatedDash label={`R4C${i + 2}`} main1="87%" sub1={t("s2.dash1b")} main2="70%" sub2={t("s2.dash1d")} />
              ) : i === 3 ? (
                <AnimatedDash label={`R4C${i + 2}`} main1={t("s2.dash2a")} sub1={t("s2.dash2b")} main2="&quot;123456&quot;" sub2={t("s2.dash2d")} />
              ) : i === 4 ? (
                <AnimatedDash label={`R4C${i + 2}`} main1="91%" sub1={t("s2.dash3b")} main2="Rp 500/orang" sub2={t("s2.dash3d")} />
              ) : (
                <AnimatedDash label={`R4C${i + 2}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R4C7</div>
      </div>

      {/* Row 5 - 3 kolom kayak row 3 */}
      <div className={`grid grid-cols-[25px_minmax(0,1fr)_25px] lg:grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] w-full min-w-full border-b-2 ${LINE}`}>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R5C1</div>
        <div className={`border-r-2 ${LINE} flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono`}>R5C2</div>
        <div className="flex items-start justify-start p-1 text-[8px] text-[#1A3CDB]/40 font-mono">R5C3</div>
      </div>
    </section>
  );
}