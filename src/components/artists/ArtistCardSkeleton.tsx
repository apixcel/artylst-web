"use client";

import React from "react";
import { cn } from "@/utils";

// Generic skeleton atoms
const Skel = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
);
const SkelText = ({ className, w = "w-24" }: { className?: string; w?: string }) => (
  <Skel className={cn("h-3", w, className)} />
);

// Crown placeholder to preserve layout when variant !== "default"
const CrownSkeleton = () => (
  <div
    className={cn(
      "relative flex items-center gap-2 rounded-tl-xl rounded-br-2xl pl-3 pr-3 py-1",
      "backdrop-blur-md bg-white/70 border border-black/5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.25)]"
    )}
  >
    <Skel className="h-5 w-5 rounded-sm" />
    <SkelText w="w-6" />
  </div>
);

export function ArtistCardSkeleton({
  view = "grid",
  variant = "default",
}: {
  view?: "grid" | "list";
  variant?: "default" | "home";
}) {
  if (view === "list") {
    return (
      <div className="w-full rounded-2xl bg-black/30 backdrop-blur-sm p-4 flex gap-4 items-stretch">
        {/* image */}
        <div className="relative shrink-0">
          <Skel className="size-[96px] sm:size-[120px] rounded-xl" />
          {variant !== "default" && (
            <div className="absolute -top-2 -left-2">
              <CrownSkeleton />
            </div>
          )}
        </div>

        {/* middle content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <SkelText className="h-4 w-40" />
            <SkelText className="h-3 w-24" />
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skel key={i} className="h-5 w-16 rounded-full border border-white/10" />
            ))}
            <Skel className="h-5 w-8 rounded-full border border-white/10" />
          </div>

          <div className="mt-3 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Skel className="h-[22px] w-[22px] rounded" />
              <SkelText className="h-3 w-10" />
            </div>
            <div className="flex items-center gap-2">
              <SkelText className="h-3 w-10" />
              <SkelText className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* right actions */}
        <div className="shrink-0 w-full sm:w-60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <SkelText className="h-4 w-20" />
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skel key={i} className="h-5 w-5 rounded" />
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Skel className="h-10 w-full rounded-md" />
            <Skel className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  // GRID view
  return (
    <div
      className={cn(
        "overflow-hidden relative rounded-2xl flex flex-col justify-between h-full",
        "bg-gradient-to-b from-white/[0.02] to-white/[0.01] border border-white/5"
      )}
    >
      {/* image */}
      <div className="relative rounded-t-2xl overflow-hidden">
        <Skel className="h-[250px] w-full" />
        {variant !== "default" && (
          <div className="absolute top-0 left-0 z-20">
            <CrownSkeleton />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 w-[85%] h-10 rounded-full bg-white/30 blur-3xl opacity-80" />
      </div>

      {/* content */}
      <div className="relative">
        <div className="px-4 pt-4 pb-2 text-center space-y-2">
          <SkelText className="mx-auto h-4 w-40" />
          <SkelText className="mx-auto h-3 w-28" />
        </div>

        <div className="flex flex-col gap-3 mb-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skel key={i} className="h-5 w-16 rounded-full border border-white/10" />
            ))}
            <Skel className="h-5 w-8 rounded-full border border-white/10" />
          </div>

          <div className="flex items-center justify-between gap-1 px-3">
            <div className="flex items-center gap-2">
              <Skel className="h-[22px] w-[22px] rounded" />
              <SkelText className="h-3 w-10" />
            </div>
            <div className="flex items-center gap-2">
              <SkelText className="h-3 w-10" />
              <SkelText className="h-3 w-24" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between px-5">
          <div className="flex items-center justify-between w-full pt-3">
            <SkelText className="h-4 w-16" />
            <div className="flex items-center gap-2 opacity-90">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skel key={i} className="h-5 w-5 rounded" />
              ))}
            </div>
          </div>

          <Skel className="w-full h-10 rounded-md mb-4 mt-3" />
        </div>
      </div>

      <div className="pointer-events-none absolute -z-10 inset-0 blur-3xl opacity-40 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.12),transparent_70%)]" />
    </div>
  );
}

export default ArtistCardSkeleton;
