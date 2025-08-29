"use client";

import { Check } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/utils";

type StepProgressProps = {
  /** 1-based index: 1 | 2 | 3 */
  current: 1 | 2 | 3 | 4;
  /** Step labels */
  steps: [string, string, string];
  className?: string;
};

export default function DashboardArtistDeliverStepProgress({
  current,
  steps,
  className,
}: StepProgressProps) {
  return (
    <nav aria-label="Order progress" className={clsx("w-full select-none", className)}>
      <ol className="flex items-center gap-3">
        {steps.map((label, idx) => {
          const stepNum = (idx + 1) as 1 | 2 | 3;
          const isCompleted = stepNum < current;
          const isActive = stepNum === current;

          return (
            <li key={label} className="flex items-center gap-3 flex-1">
              {/* Node */}
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "size-8 rounded-full border flex items-center justify-center text-xs font-medium transition-colors",
                    isCompleted && "bg-brand-4/80 text-light border-brand-4/80",
                    isActive && !isCompleted && "border-white text-white",
                    !isCompleted && !isActive && "border-white/20 text-light"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                <span
                  className={cn(
                    "text-xs md:text-sm",
                    isActive ? "text-light" : "text-white/70",
                    isCompleted && "text-brand-4"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connector (skip after last) */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[2px] relative">
                  {/* base line */}
                  <div className="absolute inset-0 rounded-full bg-white/15" />
                  {/* filled line */}
                  <div
                    className={clsx(
                      "absolute inset-y-0 left-0 rounded-full transition-all",
                      stepNum < current ? "right-0 bg-brand-4/80" : "w-0"
                    )}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
