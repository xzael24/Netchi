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
  const stickyRef = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parent = pinRef.current;
    const sticky = stickyRef.current;
    const s4 = s4Ref.current;
    if (!parent || !sticky || !s4) return;

    const ctx = gsap.context(() => {
      gsap.ticker.lagSmoothing(0);
      gsap.set(s4, { y: "100%" });

      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-curtain-bar]", parent);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          pin: sticky,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          anticipatePin: 1,
          pinSpacing: false,
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
        { scaleY: 0, duration: 0.15, stagger: 0.02, ease: "power4.inOut", transformOrigin: "top", force3D: true },
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
        <div ref={stickyRef} className="relative h-screen overflow-hidden z-10">
          <Section3 />
          <div ref={s4Ref} className="absolute inset-0 z-60">
            <Section4 />
          </div>
        </div>
      </div>
    </>
  );
}
