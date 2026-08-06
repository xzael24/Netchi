"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Block({ h }: { h: string }) {
  return <div className={`skeleton rounded-sm ${h}`} />;
}

function RouteSkeleton({ path }: { path: string }) {
  const title = (
    <>
      <div className="flex items-end gap-4">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-10 w-3/4" />
      </div>
      <div className="skeleton h-3 w-2/3" />
    </>
  );

  let body: React.ReactNode;
  if (path === "/breach-checker") {
    body = (
      <>
        {title}
        <div className="mt-6 flex">
          <Block h="h-11 flex-1" />
          <Block h="ml-3 h-11 w-24" />
        </div>
        <Block h="mt-6 h-40" />
        <Block h="mt-3 h-24" />
      </>
    );
  } else if (path === "/privacy-score") {
    body = (
      <>
        {title}
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Block key={i} h="h-20" />
          ))}
        </div>
      </>
    );
  } else if (path === "/password") {
    body = (
      <>
        {title}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Block h="h-16" />
          <Block h="h-16" />
        </div>
        <Block h="mt-3 h-11" />
        <div className="mt-5 space-y-2">
          <Block h="h-14" />
          <Block h="h-14" />
        </div>
      </>
    );
  } else if (path === "/uu-pdp") {
    body = (
      <>
        {title}
        <Block h="mt-6 h-10" />
        <div className="mt-5 space-y-2">
          {[0, 1, 2].map((i) => (
            <Block key={i} h="h-16" />
          ))}
        </div>
      </>
    );
  } else if (path === "/dummy-data") {
    body = (
      <>
        {title}
        <Block h="mt-6 h-10" />
        <div className="mt-5 flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Block key={i} h="h-9 w-20" />
          ))}
        </div>
        <Block h="mt-5 h-48" />
      </>
    );
  } else {
    // home / default: editorial sections
    body = (
      <>
        {title}
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Block h="h-28" />
          <Block h="h-28" />
          <Block h="h-28" />
        </div>
        <div className="mt-5 space-y-3">
          <Block h="h-12" />
          <Block h="h-16" />
          <Block h="h-12" />
          <Block h="h-16" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="skeleton h-[35px] w-full border-b border-cream/10" />
      <div className="skeleton h-[62px] w-full border-b border-cream/10 lg:hidden" />
      <div className="flex flex-1 flex-col gap-3 px-4 py-6 md:px-6">{body}</div>
      <div className="skeleton h-[28px] w-full" />
    </>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <>
      {/* skeleton screen — covers old page, shaped like destination content, then lifts */}
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col bg-[#1A3CDB] text-cream"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 0.75, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <RouteSkeleton path={path} />
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