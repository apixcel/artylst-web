"use client";

import React from "react";
import { cn } from "@/utils";

const Shimmer: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
);

const CardSkeleton: React.FC<{ highlight?: boolean }> = ({ highlight }) => (
  <div
    className={cn(
      "rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-2xl",
      highlight && "border-brand-4/80"
    )}
    aria-busy="true"
    aria-label="Loading pricing tier card"
  >
    {/* Header */}
    <div className="mb-4">
      <Shimmer className="h-4 w-24 mb-3" />
      <Shimmer className="h-7 w-40" />
    </div>

    {/* Meta row */}
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Shimmer className="h-4 w-10" />
      <Shimmer className="h-4 w-14" />
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-4 w-20" />
      <Shimmer className="h-4 w-14" />
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-4 w-16" />
    </div>

    {/* Features */}
    <div className="space-y-2 mb-4">
      <Shimmer className="h-4 w-28" />
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      <Shimmer className="h-3 w-4/5" />
    </div>

    {/* CTA */}
    <Shimmer className="h-10 w-full rounded-lg" />
  </div>
);

const TiersSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    <CardSkeleton />
    <CardSkeleton highlight />
    <CardSkeleton />
    <p className="text-sm text-white/60">Loading…</p>
  </div>
);

export default TiersSkeleton;
