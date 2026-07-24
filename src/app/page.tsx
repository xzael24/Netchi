"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { Section2 } from "@/components/home/Section2";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: false });

  const btnRef = useRef<HTMLDivElement>(null);
  const btnInView = useInView(btnRef, { once: false });

  return (
    <>
      <Navbar headlineVisible={!headlineInView} buttonVisible={!btnInView} />
      <Hero headlineRef={headlineRef} buttonRef={btnRef} />
      <Section2 />
    </>
  );
}
