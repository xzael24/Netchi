"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export function RevealBlocks({
  children,
  delay = 1.45,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-article-reveal]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, delay }
      );
    }, ref.current);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}