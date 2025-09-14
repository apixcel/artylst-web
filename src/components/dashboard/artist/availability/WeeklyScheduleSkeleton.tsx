"use client";
import { Skeleton } from "@/components";

interface WeeklyScheduleSkeletonProps {
  rows?: number;
}

const RowSkeleton = () => (
  <div className="flex items-center sm:flex-row flex-col gap-3 sm:gap-0 justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
    {/* Day label */}
    <Skeleton className="w-24 h-4" />

    {/* Accept orders toggle */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-24" />
    </div>

    {/* Time selects */}
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-24 rounded-md" />
        <span className="text-muted">–</span>
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  </div>
);

export default function WeeklyScheduleSkeleton({
  rows = 7,
}: WeeklyScheduleSkeletonProps) {
  return (
    <section className="rounded-2xl p-4 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 space-y-4 backdrop-blur-xl">
      <div className="grid xl:grid-cols-2 gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
