"use client";

import React from "react";
import { cn } from "@/utils";

const UnavailableDateItemSkeleton = () => {
  return (
    <li
      className={cn(
        "flex items-center justify-between border border-white/10 rounded-xl p-4 bg-white/5 animate-pulse"
      )}
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Date range skeleton */}
        <div className="h-4 w-40 bg-white/20 rounded-md" />
        {/* Buyers contact badge skeleton */}
        <div className="h-3 w-28 bg-white/10 rounded-md" />
      </div>

      {/* Delete button skeleton */}
      <div className="h-6 w-6 bg-white/20 rounded-full" />
    </li>
  );
};

export default UnavailableDateItemSkeleton;
