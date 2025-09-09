import Skeleton from "../ui/Skeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Choose a Tier (3 cards) */}
        <div className="col-span-3">
          <h2 className="mb-4 text-lg font-semibold">CHOOSE A TIER</h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 border border-white/10 rounded-lg flex flex-col gap-3"
              >
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">ORDER SUMMARY</h2>
          <div className="border border-white/10 rounded-lg p-4 flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <h2 className="text-lg font-semibold">WHAT YOU’LL RECEIVE</h2>
          <div className="border border-white/10 rounded-lg p-4 flex flex-col gap-3">
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-3 w-2/5" />
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-6">
        <Skeleton className="h-10 w-20 rounded-lg" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
