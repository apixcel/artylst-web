"use client";
import clsx from "clsx";
import { cn } from "@/utils";

type CheckoutProgressSkeletonProps = {
  steps: string[];
  className?: string;
};

export default function CheckoutProgressSkeleton({
  steps,
  className,
}: CheckoutProgressSkeletonProps) {
  return (
    <nav
      aria-label="Order progress (loading)"
      aria-busy
      className={cn("w-full select-none", className)}
    >
      <ol className="flex items-center gap-3">
        {steps.map((label, idx) => {
          const isLast = idx === steps.length - 1;

          // Pick a plausible width for the label skeleton based on the label length
          // (clamped to a tasteful min/max so layout remains steady).
          const labelChars = Math.max(6, Math.min(18, label?.length || 10));
          const labelWidthCh = `${labelChars}ch`;

          return (
            <li
              key={`${label}-${idx}`}
              className={cn("flex items-center gap-3 flex-1", isLast && "flex-none")}
            >
              {/* Node + Label group */}
              <div className="flex items-center sm:flex-row flex-col gap-2">
                {/* Node circle */}
                <div
                  className={clsx(
                    "size-8 rounded-full border flex items-center justify-center",
                    // Muted neutral look with a subtle pulse to indicate loading
                    "border-white/15 bg-white/10 animate-pulse"
                  )}
                />

                {/* Label skeleton */}
                <span
                  className="inline-block h-3 rounded bg-white/20 animate-pulse"
                  style={{ width: labelWidthCh }}
                />
              </div>

              {/* Connector (skip after last) */}
              {!isLast && (
                <div className="flex-1 h-[2px] relative sm:block hidden">
                  {/* base line */}
                  <div className="absolute inset-0 rounded-full bg-white/10" />
                  {/* shimmering overlay to suggest progress without implying state */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="h-full w-1/3 -translate-x-full animate-[shimmer_1.6s_ease_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </nav>
  );
}
