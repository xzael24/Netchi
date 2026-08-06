"use client";

import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* skeleton screen — covers old page, shimmer, then lifts after delay */}
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col bg-[#1A3CDB] text-cream"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 0.75, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* header strip */}
        <div className="skeleton h-[35px] w-full border-b border-cream/10" />
        <div className="skeleton h-[62px] w-full border-b border-cream/10 lg:hidden" />

        {/* body */}
        <div className="flex flex-1 flex-col gap-3 px-4 py-6 md:px-6">
          <div className="flex items-end gap-4">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-10 w-3/4" />
          </div>
          <div className="skeleton h-3 w-2/3" />

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-36 rounded-sm" />
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-5/6" />
          </div>
        </div>

        {/* footer strip */}
        <div className="skeleton h-[28px] w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}