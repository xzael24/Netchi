"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function B({ h, cls = "" }: { h: string; cls?: string }) {
  return <div className={`skeleton rounded-sm ${h} ${cls}`} />;
}

function FeatureShellSkeleton() {
  return (
    <>
      <div className="skeleton h-[35px] w-full border-b border-cream/10" />
      <div className="skeleton h-[25px] w-full border-b border-cream/10 lg:hidden" />
    </>
  );
}

function FeatureBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 px-6 pt-[72px] pb-12 md:px-10 lg:pt-[64px]">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  );
}

function MarqueeStrip() {
  return <div className="skeleton h-[26px] w-full shrink-0 border-t-2 border-cream/10" />;
}

function HeadSkeleton() {
  return (
    <>
      <B h="h-3 w-24" />
      <B h="mt-3 h-10 w-2/3" />
      <B h="mt-3 h-3 w-full max-w-xl" />
    </>
  );
}

function RouteSkeleton({ path }: { path: string }) {
  const fs = <FeatureShellSkeleton />;

  if (path === "/breach-checker") {
    return (
      <>
        {fs}
        <FeatureBody>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <B h="h-3 w-24" />
            <B h="mt-4 h-11 w-3/4 max-w-lg" />
            <B h="mt-3 h-3 w-full max-w-lg" />
            <B h="mt-1 h-3 w-2/3 max-w-md" />
            <div className="mt-10 flex w-full max-w-xl">
              <B h="h-12 flex-1" />
              <B h="h-12 w-16 border-l border-cream/10" />
              <B h="h-12 w-28" />
            </div>
            <div className="mt-10 w-full max-w-xl border-2 border-cream/10 bg-cream/5 p-5">
              <div className="flex items-center justify-between">
                <B h="h-3 w-32" />
                <B h="h-3 w-20" />
              </div>
              <B h="mt-3 h-5 w-full" />
              <B h="mt-1 h-5 w-3/4" />
              <div className="mt-4 border-2 border-cream/10 p-4">
                <B h="h-3 w-28" />
                <div className="mt-3 space-y-2">
                  <B h="h-3 w-full" />
                  <B h="h-3 w-full" />
                  <B h="h-3 w-2/3" />
                </div>
                <B h="mt-3 h-3 w-24" />
              </div>
            </div>
            <B h="mt-8 h-2.5 w-72" />
          </div>
        </FeatureBody>
        <MarqueeStrip />
      </>
    );
  }

  if (path === "/privacy-score") {
    return (
      <>
        {fs}
        <FeatureBody>
          <div className="mx-auto max-w-3xl">
            <B h="h-3 w-20" />
            <B h="mt-3 h-10 w-3/4" />
            <B h="mt-1 h-10 w-2/3" />
            <B h="mt-3 h-3 w-full max-w-xl" />
            <div className="mt-8 flex items-center justify-between">
              <B h="h-3 w-24" />
              <B h="h-3 w-28" />
            </div>
            <div className="mt-2 h-1.5 w-full bg-cream/10">
              <div className="skeleton h-full w-1/3" />
            </div>
            <div className="mt-8 border-2 border-cream/10 bg-cream/5 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <B h="h-3 w-20" />
                <B h="h-3 w-32" />
              </div>
              <B h="mt-4 h-6 w-3/4" />
              <div className="mt-6 grid gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-2 border-cream/10 px-4 py-3">
                    <B h="h-8 w-8 shrink-0" />
                    <div className="flex-1">
                      <B h="h-3 w-1/2" />
                      <B h="mt-1 h-3 w-3/4" />
                    </div>
                    <B h="h-3 w-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <B h="h-11 w-28" />
              <B h="h-3 w-36" />
            </div>
          </div>
        </FeatureBody>
        <MarqueeStrip />
      </>
    );
  }

  if (path === "/password") {
    return (
      <>
        {fs}
        <FeatureBody>
          <div className="mx-auto max-w-3xl">
            <HeadSkeleton />
            <div className="mt-8 space-y-6">
              <div className="border-2 border-cream/10 bg-cream/5 p-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[0, 1].map((i) => (
                    <div key={i}>
                      <B h="h-3 w-32" />
                      <B h="mt-2 h-2 w-full" />
                      <B h="mt-1 h-3 w-1/3" />
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <B h="h-3 w-40" />
                  <B h="mt-2 h-10 w-full" />
                  <B h="mt-1 h-3 w-2/3" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[0, 1, 2, 3].map((i) => (
                    <B key={i} h="h-4 w-20" />
                  ))}
                </div>
                <B h="mt-4 h-4 w-56" />
              </div>
              <B h="h-12 w-full" />
            </div>
            <div className="mt-8 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border-2 border-cream/10 bg-cream/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <B h="h-5 w-2/3" />
                    <B h="h-7 w-16 shrink-0" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <B h="h-3 w-16" />
                    <B h="h-3 w-24" />
                    <B h="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 border-2 border-cream/10 bg-cream/5 p-5">
              <div className="flex items-center justify-between">
                <B h="h-3 w-36" />
              </div>
              <B h="mt-2 h-3 w-full" />
              <div className="mt-4 flex">
                <B h="h-10 flex-1" />
                <B h="h-10 w-16 border-l border-cream/10" />
                <B h="h-10 w-24" />
              </div>
            </div>
          </div>
        </FeatureBody>
        <MarqueeStrip />
      </>
    );
  }

  if (path === "/uu-pdp") {
    return (
      <>
        {fs}
        <div className="hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[minmax(26vh,auto)] border-b-2 border-cream/10">
          <div className="border-r-2 border-cream/10 p-1">
            <B h="h-2 w-8" />
          </div>
          <div className="border-r-2 border-cream/10 flex flex-col items-start justify-end pl-2 md:pl-4 pb-3">
            <B h="h-3 w-24" />
            <B h="mt-1 h-14 w-3/4 max-w-2xl" />
            <B h="mt-2 h-3 w-full max-w-xl" />
            <B h="mt-1 h-3 w-2/3 max-w-lg" />
          </div>
          <div className="p-1 pb-2">
            <B h="h-24 w-3" />
          </div>
        </div>
        <div className="lg:hidden flex flex-col px-5 pb-8">
          <B h="h-3 w-20" />
          <B h="mt-2 h-9 w-4/5" />
          <B h="mt-1 h-9 w-3/5" />
          <B h="mt-3 h-3 w-full" />
          <B h="mt-1 h-3 w-2/3" />
        </div>
        <div className="grid grid-cols-[25px_minmax(0,1fr)_25px] lg:grid-cols-[2.6%_94.05%_3.35%] border-b-2 border-cream/10">
          <div className="border-r-2 border-cream/10 p-1">
            <B h="h-2 w-8" />
          </div>
          <div className="border-r-2 border-cream/10 p-4 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <B h="h-4 w-full lg:w-1/3" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <B key={i} h="h-6 w-20" />
                ))}
              </div>
            </div>
          </div>
          <div className="p-1">
            <B h="h-2 w-8" />
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-[2.6%_94.05%_3.35%] grid-rows-[10vh] border-b-2 border-cream/10">
          <div className="border-r-2 border-cream/10 p-1">
            <B h="h-2 w-8" />
          </div>
          <div className="border-r-2 border-cream/10 flex items-center justify-between px-2 md:px-4">
            <B h="h-6 w-44" />
            <B h="h-3 w-16" />
          </div>
          <div className="p-1">
            <B h="h-2 w-8" />
          </div>
        </div>
        <div className="lg:hidden flex items-center justify-between border-b-2 border-cream/10 px-5 py-4">
          <B h="h-5 w-36" />
          <B h="h-3 w-14" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={`d${i}`} className="hidden lg:grid grid-cols-[2.6%_18.81%_75.24%_1fr] border-b-2 border-cream/10">
            <div className="border-r-2 border-cream/10 p-1">
              <B h="h-2 w-8" />
            </div>
            <div className="border-r-2 border-cream/10 flex items-start justify-start px-2 py-4">
              <B h="h-6 w-12" />
            </div>
            <div className="border-r-2 border-cream/10 px-4 md:px-6 py-5">
              <B h="h-4 w-28" />
              <B h="mt-2 h-5 w-2/3" />
              <B h="mt-1 h-3 w-full max-w-3xl" />
            </div>
            <div className="p-2">
              <B h="h-4 w-4" />
            </div>
          </div>
        ))}
        {[0, 1, 2].map((i) => (
          <div key={`m${i}`} className="lg:hidden flex gap-4 border-b-2 border-cream/10 px-5 py-5">
            <B h="h-5 w-6 shrink-0" />
            <div className="min-w-0 flex-1">
              <B h="h-4 w-24" />
              <B h="mt-1 h-4 w-3/4" />
              <B h="mt-1 h-3 w-full" />
            </div>
          </div>
        ))}
        <MarqueeStrip />
      </>
    );
  }

  if (path === "/dummy-data") {
    return (
      <>
        {fs}
        <FeatureBody>
          <div className="mx-auto max-w-4xl">
            <HeadSkeleton />
            <div className="mt-6 border-2 border-cream/10 bg-cream/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <B key={i} h="h-4 w-24" />
                  ))}
                </div>
                <B h="h-8 w-24" />
              </div>
              <B h="mt-5 h-12 w-full" />
            </div>
            <div className="mt-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <B h="h-3 w-24" />
                <B h="h-7 w-16" />
                <B h="h-7 w-16" />
              </div>
              <div className="overflow-hidden border-2 border-cream/10">
                <div className="flex gap-6 border-b-2 border-cream/10 px-3 py-2">
                  {[0, 1, 2, 3].map((i) => (
                    <B key={i} h="h-3 w-24" />
                  ))}
                </div>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-6 border-b border-cream/10 px-3 py-2.5 last:border-0">
                    {[0, 1, 2, 3].map((j) => (
                      <B key={j} h="h-3 w-20" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FeatureBody>
        <MarqueeStrip />
      </>
    );
  }

  // home (default)
  return (
    <>
      {/* Hero mirror — grid & rows sama persis dengan Hero.tsx */}
      <div className="grid grid-cols-[25px_32fr_33fr_29fr_25px] lg:grid-cols-[2.6%_30%_35%_29.05%_1fr] grid-rows-[27px_10vh_15vh_auto_auto] lg:grid-rows-[4vh_27vh_22vh_18vh_29vh] w-full lg:h-dvh content-start">
        {/* R1 nav */}
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-r-2 border-b-2 border-cream/10 flex items-center justify-end pr-2 md:pr-4">
          <B h="h-3.5 w-14 md:w-20" />
        </div>
        <div className="border-b-2 border-cream/10 flex items-center justify-end pr-2 md:pr-3">
          <B h="h-3.5 w-7" />
        </div>

        {/* R2 headline */}
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="col-span-3 border-r-2 border-b-2 border-cream/10 flex items-center justify-center lg:justify-start lg:pl-[33px] px-2 overflow-hidden">
          <B h="h-[55%] w-[88%] lg:w-[72%]" />
        </div>
        <div className="border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>

        {/* R3 sub-headline */}
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="col-span-2 border-r-2 border-b-2 border-cream/10 px-4 md:px-10 py-2 md:py-3 flex items-center">
          <B h="h-[45%] w-full" />
        </div>
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-b-2 border-cream/10 flex items-start justify-start p-1">
          <B h="h-12 w-2" />
        </div>

        {/* R4 description */}
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="col-span-2 lg:col-span-1 border-r-2 border-b-2 border-cream/10 px-4 md:px-8 flex items-center">
          <div className="w-full space-y-2">
            <B h="h-3 w-full" />
            <B h="h-3 w-2/3" />
          </div>
        </div>
        <div className="hidden lg:flex border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>

        {/* R5 wave + CTA */}
        <div className="border-r-2 border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
        <div className="col-span-2 border-r-2 border-b-2 border-cream/10 min-h-[120px] md:min-h-[220px] p-3 md:p-4 flex items-end">
          <div className="w-full space-y-1.5 md:space-y-2">
            <B h="h-1 w-[55%]" />
            <B h="h-1 w-[75%]" />
            <B h="h-1 w-[90%]" />
            <B h="h-1 w-full" />
            <B h="h-1 w-[80%]" />
          </div>
        </div>
        <div className="border-r-2 border-b-2 border-cream/10 flex flex-col items-stretch justify-between px-2 py-3 md:px-3 md:py-4">
          <B h="h-8 md:h-10 w-full" />
          <B h="h-4 md:h-5 w-2/3" />
        </div>
        <div className="border-b-2 border-cream/10 p-1"><B h="h-2 w-8" /></div>
      </div>

      {/* Section2 preview */}
      <div className="border-b-2 border-cream/10 p-4 md:p-6">
        <div className="flex items-end gap-3">
          <B h="h-3 w-20" />
          <B h="h-7 w-1/2" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-[2px] lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-cream/10 p-3 md:p-4">
              <B h="h-3 w-3/4" />
              <B h="mt-2 h-2 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex-1 border-t-2 border-cream/10 p-4 md:p-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[0, 1, 2].map((i) => (
            <B key={i} h="h-3 w-24" />
          ))}
        </div>
        <B h="mt-4 h-8 w-1/2 md:w-1/3" />
        <div className="mt-4 h-1.5 w-full bg-cream/10" />
      </div>
    </>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (skeletonRef.current) skeletonRef.current.style.display = "none";
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        ref={skeletonRef}
        className="fixed inset-0 z-[200] flex flex-col bg-[#1A3CDB] text-cream"
      >
        <RouteSkeleton path={path} />
      </div>

      <div>
        {children}
      </div>
    </>
  );
}
