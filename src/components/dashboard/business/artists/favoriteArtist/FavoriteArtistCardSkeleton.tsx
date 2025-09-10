import Skeleton from "@/components/ui/Skeleton";

const FavoriteArtistCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`rounded-2xl border border-white/10 p-3 shadow-sm ${className || ""}`}
    >
      {/* Cover image */}
      <Skeleton className="h-40 w-full rounded-xl mb-3" />

      {/* Title / handle / status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <Skeleton className="h-4 w-28 mb-2" /> {/* Artist name */}
          <Skeleton className="h-3 w-24" /> {/* @handle */}
        </div>
        <Skeleton className="h-6 w-20 rounded-full" /> {/* Accepting / Waitlist */}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-10 w-full rounded-lg" /> {/* View */}
        <Skeleton className="h-10 w-full rounded-lg" /> {/* Request */}
      </div>
    </div>
  );
};

export default FavoriteArtistCardSkeleton;
