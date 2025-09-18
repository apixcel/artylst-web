"use client";

import { Skeleton } from "@/components";

const chipWidths = ["w-20", "w-20", "w-10", "w-14"];

export default function ProfileCompletenessSkeleton() {
  return (
    <div className="relative isolate rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl mx-4 mt-4 flex justify-between items-start gap-10">
      <div className="flex-1 w-full">
        {/* Top row: title + chips + percent */}
        <div className="flex justify-between md:items-start items-end">
          <div className="flex flex-col md:flex-row gap-5 w-full">
            {/* Title area */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>

            {/* Pills/chips skeleton */}
            <ul className="flex flex-wrap gap-2.5">
              {chipWidths.map((w, i) => (
                <li key={i}>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className={`h-3 ${w}`} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Percent placeholder */}
          <Skeleton className="h-5 w-10" />
        </div>

        {/* Progress bar */}
        <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>

      {/* Close button placeholder */}
      <button aria-label="Close" type="button" className="cursor-default" disabled>
        <Skeleton className="h-5 w-5 rounded-md" />
      </button>
    </div>
  );
}
