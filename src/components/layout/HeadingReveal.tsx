"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeadingReveal({
  lines,
  className = "",
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-line]"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.06em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}