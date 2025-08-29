import * as React from "react";
import { CheckCircle2 } from "lucide-react";

export type StepperProps = {
  steps: string[];
  current: number; // 0-based active step
  className?: string;
  trackBaseClass?: string; // e.g. "bg-brand-4/40"
  trackFillClass?: string; // e.g. "bg-emerald-500"
};

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

export default function DashboardArtistDeliverStepper({
  steps,
  current,
  className,
  trackBaseClass = "bg-white/15",
  trackFillClass = "bg-emerald-500",
}: StepperProps) {
  // percent of the track to fill (0..100)
  const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;

  return (
    <div className={cx("relative text-xs select-none", className)}>
      {/* shared track (padding matches half the circle: 0.75rem since w-6 = 1.5rem) */}
      <div className="absolute top-3 left-0 right-0 px-3 -z-10">
        <div className={cx("h-[2px] w-full", trackBaseClass)} />
        <div
          className={cx("h-[2px] mt-[-2px] origin-left", trackFillClass)}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>

      {/* steps */}
      <div className="flex gap-2">
        {steps.map((step, i) => {
          const isDone = i <= current;
          return (
            <div key={step} className="flex-1 min-w-0 flex flex-col items-center">
              <div
                className={cx(
                  "h-6 w-6 flex items-center justify-center rounded-full border transition-colors duration-200",
                  isDone
                    ? "bg-emerald-500 border-emerald-500"
                    : "bg-white/10 border-white/20"
                )}
                aria-current={i === current ? "step" : undefined}
                title={step}
              >
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span
                className={cx(
                  "mt-1 truncate text-center",
                  isDone ? "text-white" : "text-white/80"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
