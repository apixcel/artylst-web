"use client";

import clsx from "clsx";
import CheckoutProgressSkeleton from "../shared/CheckoutProgressSkeleton";
import CheckoutPricingTierSkeleton from "./CheckoutPricingTierSkeleton";

const CheckoutSkeleton = ({ stepsLabels }: { stepsLabels: string[] }) => {
  return (
    <div>
      <>
        <div className="py-8">
          <CheckoutProgressSkeleton steps={[...stepsLabels]} className="mx-auto" />
        </div>
        <div className="pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="w-full space-y-6" aria-busy>
            {/* Artist summary */}
            <div className="card p-4 flex items-center gap-4 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-white/10 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-[160px] rounded bg-white/20 animate-pulse" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-5 w-[90px] rounded bg-white/15 border border-white/20 animate-pulse" />
                  <span className="h-5 w-[70px] rounded bg-white/15 border border-white/20 animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-[90px] rounded bg-white/20 animate-pulse" />
            </div>

            {/* Pricing step skeleton */}
            <div className="card p-5 bg-brand-1/10">
              {/* Heading */}
              <div className="h-6 w-40 rounded bg-white/20 animate-pulse mb-5" />

              {/* Grid of tier cards (mirrors the real layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CheckoutPricingTierSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="h-10 w-24 rounded bg-white/10 animate-pulse" />
              <div className="h-10 w-40 rounded bg-white/15 animate-pulse" />
            </div>
          </div>

          {/* RIGHT: summary */}
          <aside className="space-y-3">
            <div className="card p-5 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
              <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
              <div className="mt-3 space-y-2 text-sm" id="summary">
                {[
                  ["Service tier", 80],
                  ["Add-ons", 60],
                  ["Subtotal", 90],
                  ["Fee", 70],
                  ["Total", 100],
                ].map(([_, w], i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex items-center justify-between",
                      i === 2 && "pt-2 border-t border-white/10"
                    )}
                  >
                    <span className="h-3 w-24 bg-white/15 rounded animate-pulse" />
                    <span
                      className="h-3 rounded bg-white/20 animate-pulse"
                      style={{ width: `${w as number}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="h-3 w-64 bg-white/10 rounded mt-3 animate-pulse" />
            </div>

            <div className="card p-4 bg-gradient-to-b from-brand-1/10 to-brand-1/10">
              <div className="h-4 w-40 bg-white/20 rounded animate-pulse" />
              <ul className="mt-3 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="h-3 w-[85%] bg-white/15 rounded animate-pulse" />
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </>

      <style>{`
@keyframes shimmer { 100% { transform: translateX(300%); } }
`}</style>
    </div>
  );
};

export default CheckoutSkeleton;
