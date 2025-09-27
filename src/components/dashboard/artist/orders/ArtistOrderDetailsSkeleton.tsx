"use client";

import {
  ArrowLeft,
  CalendarClock,
  Clock,
  Music,
  User,
  Wallet,
  AlertTriangle,
} from "lucide-react";

// Reusable primitives ---------------------------------------------------------
export const Skeleton = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-pulse rounded bg-white/10 ${className}`} {...props} />
);

const SkeletonLine = ({
  w = "w-full",
  h = "h-4",
  className = "",
}: {
  w?: string;
  h?: string;
  className?: string;
}) => <Skeleton className={`${w} ${h} ${className}`} />;

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl p-5 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);

const Chip = ({ className = "" }: { className?: string }) => (
  <div className={`chip bg-white/10 text-transparent ${className}`}>
    <span className="sr-only">Loading status…</span>
  </div>
);

// Page-level skeleton ---------------------------------------------------------
export default function ArtistOrderDetailsSkeleton() {
  return (
    <section className="space-y-6" aria-busy="true" aria-live="polite">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-sm text-white/70">
            <ArrowLeft className="h-4 w-4 opacity-40" />
            <SkeletonLine w="w-20" h="h-4" />
          </div>
          <SkeletonLine w="w-56" h="h-7" className="rounded-lg" />
          <SkeletonLine w="w-40" h="h-3.5" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: order summary */}
        <div className="xl:col-span-2 space-y-4">
          {/* Status strip */}
          <Card className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Chip />
              <SkeletonLine w="w-24" h="h-4" />
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <CalendarClock className="h-4 w-4 opacity-40" />
              <SkeletonLine w="w-24" h="h-4" />
              <span className="opacity-30">•</span>
              <Clock className="h-4 w-4 opacity-40" />
              <SkeletonLine w="w-28" h="h-4" />
              <span className="opacity-30">•</span>
              <SkeletonLine w="w-20" h="h-4" />
            </div>
          </Card>

          {/* Order Summary card */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 opacity-40" />
                <SkeletonLine w="w-28" h="h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-white/5"
                >
                  <SkeletonLine w="w-28" h="h-3.5" />
                  <SkeletonLine w="w-24" h="h-4" />
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <SkeletonLine w="w-20" h="h-3.5" />
              <div className="flex items-center justify-between">
                <SkeletonLine w="w-40" h="h-4" />
                <SkeletonLine w="w-16" h="h-4" />
              </div>
            </div>
          </Card>

          {/* Activity card */}
          <Card>
            <SkeletonLine w="w-24" h="h-5" className="mb-4" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Chip />
                    <SkeletonLine w="w-32" h="h-3.5" />
                  </div>
                  <SkeletonLine w="w-full" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 opacity-40" />
              <SkeletonLine w="w-24" h="h-4" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0">
              <SkeletonLine w="w-24" h="h-3.5" />
              <SkeletonLine w="w-24" h="h-4" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="h-5 w-5 opacity-40" />
              <SkeletonLine w="w-24" h="h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <SkeletonLine w="w-20" h="h-3.5" />
                <SkeletonLine w="w-16" h="h-4" />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonLine w="w-20" h="h-3.5" />
                <SkeletonLine w="w-16" h="h-4" />
              </div>
              <div className="flex items-center justify-between pt-3 mt-2">
                <SkeletonLine w="w-16" h="h-4" />
                <SkeletonLine w="w-20" h="h-5" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg mt-3" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 opacity-40" />
              <SkeletonLine w="w-16" h="h-4" />
            </div>
            <SkeletonLine w="w-48" />
            <Skeleton className="h-10 w-full rounded-lg mt-3" />
          </Card>
        </div>
      </div>
    </section>
  );
}
