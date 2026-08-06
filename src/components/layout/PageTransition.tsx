"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function B({ h, cls = "" }: { h: string; cls?: string }) {
  return <div className={`skeleton rounded-sm ${h} ${cls}`} />;
}

function FeatureShellSkeleton() {
  return (
    <>
      <div className="skeleton h-[35px] w-full border-b border-cream/10" />
      <div className="skeleton h-[62px] w-full border-b border-cream/10 lg:hidden" />
    </>
  );
}

function RouteSkeleton({ path }: { path: string }) {
  const fs = <FeatureShellSkeleton />;

  if (path === "/breach-checker") {
    return (
      <>
        {fs}
        <div className="flex-1 px-6 pt-16 pb-10 md:px-10">
          <div className="mx-auto max-w-xl">
            <B h="h-2.5 w-48 mx-auto" />
            <B h="mt-3 h-36 mx-auto w-full" />
            <B h="mt-4 h-20 max-w-lg mx-auto" />
            <div className="mt-10 flex max-w-xl mx-auto">
              <B h="h-12 flex-1" />
              <B h="ml-3 h-12 w-24 shrink-0" />
            </div>
            <B h="mt-6 h-56" />
            <B h="mt-3 h-28" />
          </div>
        </div>
      </>
    );
  }

  if (path === "/privacy-score") {
    return (
      <>
        {fs}
        <div className="flex-1 px-6 pt-16 pb-10 md:px-10">
          <div className="mx-auto max-w-3xl">
            <B h="h-2 w-56" />
            <B h="mt-2 h-12 w-full" />
            <B h="mt-3 h-14 w-3/4" />
            <div className="mt-8 flex items-center justify-between">
              <B h="h-2 w-16" />
              <B h="h-2 w-12" />
            </div>
            <B h="mt-2 h-1.5 w-full" />
            <div className="mt-8 space-y-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-2 border-cream/15 p-5">
                  <B h="h-2 w-24 mb-3" />
                  <B h="h-5 w-3/4 mb-4" />
                  <div className="flex gap-3">
                    {[0, 1, 2].map((j) => <B key={j} h="h-9 w-24" />)}
                  </div>
                </div>
              ))}
            </div>
            <B h="mt-8 h-12 w-full" />
          </div>
        </div>
      </>
    );
  }

  if (path === "/password") {
    return (
      <>
        {fs}
        <div className="flex-1 px-6 pt-16 pb-10 md:px-10">
          <div className="mx-auto max-w-3xl">
            <B h="h-2 w-52" />
            <B h="mt-2 h-12 w-full" />
            <B h="mt-3 h-10 w-2/3" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <B h="h-16" />
              <B h="h-16" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[0,1,2,3].map(i => <B key={i} h="h-9" />)}
            </div>
            <B h="mt-2 h-12 w-full" />
            <div className="mt-6 space-y-3">
              {[0,1,2].map(i => <B key={i} h="h-24" />)}
            </div>
            <div className="mt-12 p-5 border-2 border-cream/15">
              <B h="h-2 w-64 mb-3" />
              <B h="h-3 w-full mb-3" />
              <div className="flex">
                <B h="h-10 flex-1" />
                <B h="ml-3 h-10 w-20 shrink-0" />
              </div>
              <B h="mt-4 h-5" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (path === "/uu-pdp") {
    return (
      <>
        {fs}
        <div className="flex-1 px-6 pt-16 pb-10 md:px-10">
          <div className="mx-auto max-w-4xl">
            <B h="h-2 w-48" />
            <B h="mt-2 h-12 w-full" />
            <B h="mt-3 h-10 w-3/4" />
            <div className="mt-6 p-4 border-2 border-cream/15">
              <B h="h-10 w-full mb-4" />
              <div className="flex flex-wrap gap-2">
                {[0,1,2,3,4].map(i => <B key={i} h="h-7 w-24" />)}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[0,1,2,3].map(i => (
                <div key={i} className="border-2 border-cream/15 p-4">
                  <B h="h-2 w-32 mb-2" />
                  <B h="h-5 w-2/3 mb-3" />
                  <B h="h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (path === "/dummy-data") {
    return (
      <>
        {fs}
        <div className="flex-1 px-6 pt-16 pb-10 md:px-10">
          <div className="mx-auto max-w-4xl">
            <B h="h-2 w-52" />
            <B h="mt-2 h-12 w-full" />
            <B h="mt-3 h-10 w-3/4" />
            <div className="mt-6 p-5 border-2 border-cream/15">
              <div className="flex flex-wrap gap-2 mb-4">
                {[0,1,2,3,4,5,6].map(i => <B key={i} h="h-9 w-28" />)}
              </div>
              <div className="flex items-center justify-between">
                <B h="h-2 w-16" />
                <B h="h-10 w-24" />
              </div>
              <B h="mt-4 h-11 w-full" />
            </div>
            <B h="mt-6 h-8 w-40" />
            <div className="border-2 border-cream/15 mt-4 overflow-hidden">
              <div className="flex gap-6 px-4 py-3 border-b-2 border-cream/15">
                {[0,1,2,3].map(i => <B key={i} h="h-3 w-24" />)}
              </div>
              {[0,1,2,3,4].map(i => (
                <div key={i} className="flex gap-6 px-4 py-2.5 border-b border-cream/10 last:border-0">
                  {[0,1,2,3].map(j => <B key={j} h="h-3 w-20" />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // home (default)
  return (
    <>
      <div className="skeleton h-[35px] w-full border-b border-cream/10" />
      <div className="skeleton h-[62px] w-full border-b border-cream/10 lg:hidden" />
      <div className="flex-1 flex flex-col gap-3 px-4 py-6 md:px-6">
        <div className="flex items-end gap-4">
          <B h="h-3 w-16" />
          <B h="h-10 w-3/4" />
        </div>
        <B h="h-3 w-2/3" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <B h="h-28" />
          <B h="h-28" />
          <B h="h-28" />
        </div>
        <div className="mt-5 space-y-3">
          <B h="h-12" />
          <B h="h-16" />
          <B h="h-12" />
        </div>
      </div>
      <div className="skeleton h-[28px] w-full" />
    </>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <>
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