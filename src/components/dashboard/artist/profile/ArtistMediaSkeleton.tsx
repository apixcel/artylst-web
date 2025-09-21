"use client";

const ArtistMediaSkeleton = () => {
  return (
    <div className="border-b border-white/10 pb-4 space-y-4 animate-pulse">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-white/10 rounded" />
        <div className="h-3 w-48 bg-white/10 rounded" />
      </div>

      {/* content grid */}
      <div className="grid grid-cols-1 desktop:grid-cols-5 gap-6">
        {/* avatar card (col-span-1) */}
        <div className="desktop:col-span-1">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 h-full flex flex-col">
            <div className="h-4 w-14 bg-white/10 rounded" />
            <div className="mt-4 flex flex-col items-center gap-3 h-full">
              <div className="w-28 h-28 rounded-full bg-white/10 border border-white/10" />
              <div className="flex gap-2 items-center">
                <div className="h-8 w-32 bg-white/10 rounded-md" />
                <div className="h-8 w-28 bg-white/5 rounded-md" />
              </div>
              <div className="h-3 w-40 bg-white/10 rounded" />
            </div>
          </div>
        </div>

        {/* cover card (col-span-2) */}
        <div className="desktop:col-span-2">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 h-full">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="mt-3 h-40 md:h-48 rounded-lg bg-black/30 border border-white/10 relative overflow-hidden" />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-8 w-36 bg-white/10 rounded-md" />
              <div className="h-8 w-28 bg-white/5 rounded-md" />
            </div>
            <div className="mt-2 h-3 w-44 bg-white/10 rounded" />
          </div>
        </div>

        {/* intro video card (NEW) (col-span-2) */}
        <div className="desktop:col-span-2">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 h-full">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="mt-3 h-40 md:h-48 rounded-lg bg-black/30 border border-white/10 relative overflow-hidden" />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-8 w-44 bg-white/10 rounded-md" />
              <div className="h-8 w-28 bg-white/5 rounded-md" />
            </div>
            <div className="mt-2 h-3 w-56 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      {/* unified action bar */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-44 bg-white/10 rounded" />
        <div className="h-9 w-36 bg-white/10 rounded-md" />
      </div>
    </div>
  );
};

export default ArtistMediaSkeleton;
