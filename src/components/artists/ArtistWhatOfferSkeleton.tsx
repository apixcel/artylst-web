"use client";

import React from "react";
import { Skeleton } from "@/components";

interface ArtistWhatOfferSkeletonProps {
  className?: string;
}

const Line = ({
  width = "w-3/4",
  className = "",
}: {
  width?: string;
  className?: string;
}) => <Skeleton className={`${width} h-3 ${className}`} />;

const HeadingRow = () => (
  <div className="flex items-center gap-2 mb-2">
    <Skeleton className="h-5 w-5 rounded" />
    <Skeleton className="h-5 w-40" />
  </div>
);

const CTAButton = () => <Skeleton className="h-10 w-full mt-3 rounded-lg" />;

const CardSkeleton = () => (
  <div className="card p-4">
    <HeadingRow />
    <div className="space-y-2 text-sm">
      <Line width="w-5/6" />
      <Line width="w-3/5" />
      <Line width="w-2/3" />
    </div>
    <CTAButton />
    {/* Optional helper text */}
    <div className="mt-2 flex items-start gap-1.5">
      <Skeleton className="h-3.5 w-3.5 rounded" />
      <Line width="w-4/5" className="h-2.5 mt-[3px]" />
    </div>
  </div>
);

export default function ArtistWhatOfferSkeleton({
  className = "",
}: ArtistWhatOfferSkeletonProps) {
  return (
    <div
      className={`xl:w-full w-full sm:w-1/2 ${className}`}
      aria-busy
      aria-live="polite"
    >
      {/* Section title */}
      <Skeleton className="h-5 w-36 mb-2" />

      {/* Personal Playlist */}
      <div className="relative mb-4">
        <CardSkeleton />
      </div>

      {/* Business Playlist */}
      <div className="relative mb-4">
        <CardSkeleton />
      </div>

      {/* More Features */}
      <div className="card p-4">
        <HeadingRow />
        <div className="space-y-2">
          <Line width="w-11/12" />
          <Line width="w-9/12" />
        </div>
        <CTAButton />
      </div>
    </div>
  );
}
