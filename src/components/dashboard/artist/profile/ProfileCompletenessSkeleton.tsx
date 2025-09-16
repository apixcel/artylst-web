"use client";
import { Skeleton } from "@/components";

const ProfileCompletenessSkeleton = () => {
  return (
    <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Progress bar */}
      <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Fields */}
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCompletenessSkeleton;
