"use client";

import { useRef, useLayoutEffect } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/home/Hero";
import { Section2 } from "@/components/home/Section2";
import { Section3 } from "@/components/home/Section3";
import { Section4 } from "@/components/home/Section4";
import { Navbar } from "@/components/layout/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: false });

  const btnRef = useRef<HTMLDivElement>(null);
  const btnInView = useInView(btnRef, { once: false });

  const pinRef = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parent = pinRef.current;
    const s4 = s4Ref.current;
    if (!parent || !s4) return;

    const ctx = gsap.context(() => {
      gsap.set(s4, { y: "100%" });

      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-curtain-bar]", parent);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      const starts = [0, 0.04, 0.08, 0.12, 0.22, 0.28, 0.38, 0.44];
      rows.forEach((row, i) => {
        tl.fromTo(row, { y: "100vh" }, { y: 0, duration: 0.1 }, starts[i] ?? 0);
      });

      tl.fromTo(s4, { y: "100%" }, { y: 0, duration: 0.17 }, 0.68);
      tl.fromTo(
        bars,
        { scaleY: 1 },
        { scaleY: 0, duration: 0.15, stagger: 0.02, ease: "power4.inOut", transformOrigin: "top" },
        0.85
      );
    }, parent);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar headlineVisible={!headlineInView} buttonVisible={!btnInView} />
      <Hero headlineRef={headlineRef} buttonRef={btnRef} />
      <Section2 />
      <div ref={pinRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden z-10">
          <Section3 />
          <div ref={s4Ref} className="absolute inset-0 z-60">
            <Section4 />
          </div>
        </div>
      </div>
    </>
  );
}
