"use client";

import React from "react";
import { cn } from "@/utils";

// Lightweight skeleton primitives
const SkeletonBlock: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
);

const SkeletonText: React.FC<{ className?: string; width?: string }> = ({
  className,
  width = "w-28",
}) => <SkeletonBlock className={cn("h-3", width, className)} />;

// Matches the right-hand preview card footprint
const TierPreviewSkeleton: React.FC = () => (
  <div>
    <h3 className="text-center mb-3">Preview</h3>
    <div className="card rounded-2xl p-6 space-y-3 text-center relative">
      <div className="mb-2 space-y-2">
        <SkeletonText className="mx-auto h-3 w-20" />
        <SkeletonBlock className="mx-auto h-7 w-24" />
      </div>

      <div className="mb-3 flex items-center justify-center gap-2">
        <SkeletonText className="h-3 w-8" />
        <SkeletonText className="h-3 w-12" />
        <SkeletonText className="h-3 w-3" />
        <SkeletonText className="h-3 w-16" />
        <SkeletonText className="h-3 w-12" />
        <SkeletonText className="h-3 w-3" />
        <SkeletonText className="h-3 w-8" />
        <SkeletonText className="h-3 w-16" />
      </div>

      <SkeletonText className="h-3 w-16" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <SkeletonBlock className="h-4 w-4 rounded" />
            <SkeletonText className="h-3 w-40" />
          </div>
        ))}
      </div>

      <div className="absolute top-0 right-0 uppercase text-xs text-light/70 bg-white/10 rounded-tr-xl rounded-bl-[12px] px-3 py-1">
        <span className="opacity-50">&nbsp;</span>
      </div>
    </div>
  </div>
);

// Single Tier card skeleton mirroring TierPricingCard layout
export const TierPricingCardSkeleton: React.FC<{ name?: string; className?: string }> = ({
  name = "",
  className,
}) => (
  <div
    className={cn(
      "rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-4/8 backdrop-blur-2xl",
      className
    )}
  >
    <h3 className="text-lg font-semibold mb-2">
      {name || (
        <span className="inline-block">
          <SkeletonText className="h-4 w-24" />
        </span>
      )}
    </h3>

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-6">
      {/* LEFT: Form fields */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-white/60">Songs</div>
            <SkeletonBlock className="mt-1 h-9 w-full" />
          </div>
          <div>
            <div className="text-sm text-white/60">Price</div>
            <SkeletonBlock className="mt-1 h-9 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-white/60">Delivery time</div>
            {/* Dropdown button placeholder */}
            <SkeletonBlock className="mt-1 h-9 w-full" />
          </div>
          <div>
            <div className="text-sm text-white/60">Revision count</div>
            <SkeletonBlock className="mt-1 h-9 w-full" />
          </div>
        </div>

        <div>
          <div className="text-sm text-white/60">Descriptions</div>
          <div className="mt-2 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock className="h-9 flex-1" />
                <SkeletonBlock className="h-9 w-9" />
              </div>
            ))}

            <div className="flex items-center justify-between pt-1">
              <SkeletonText className="h-3 w-20" />
              <SkeletonBlock className="h-9 w-28" />
            </div>
          </div>
        </div>

        <SkeletonBlock className="h-10 w-full" />
      </div>

      {/* RIGHT: Live Preview */}
      <div className="lg:sticky lg:top-4 self-start">
        <TierPreviewSkeleton />
      </div>
    </div>
  </div>
);

// Full form skeleton covering all tiers (mini/standard/pro)
export default function TiersSkeleton({
  visibleTiers = ["mini", "standard", "pro"],
  hasAnyTier = true,
}: {
  visibleTiers?: Array<"mini" | "standard" | "pro">;
  hasAnyTier?: boolean;
}) {
  if (!hasAnyTier) {
    return (
      <div className="text-center card max-w-2xl mx-auto p-6">
        <SkeletonText className="mx-auto h-4 w-64 mb-4" />
        <SkeletonBlock className="mx-auto h-10 w-48" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {visibleTiers.includes("mini") && <TierPricingCardSkeleton name="Mini" />}
      {visibleTiers.includes("standard") && <TierPricingCardSkeleton name="Standard" />}
      {visibleTiers.includes("pro") && <TierPricingCardSkeleton name="Pro" />}
    </div>
  );
}
