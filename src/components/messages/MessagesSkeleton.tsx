import Skeleton from "../ui/Skeleton";

export const LeftMessageSkeleton = () => {
  return (
    <div className="flex items-start space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" /> {/* avatar */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40 rounded-lg" /> {/* line 1 */}
        <Skeleton className="h-4 w-32 rounded-lg" /> {/* line 2 */}
      </div>
    </div>
  );
};

export const RightMessageSkeleton = () => {
  return (
    <div className="flex justify-end">
      <div className="space-y-2 text-right">
        <Skeleton className="h-4 w-28 rounded-lg" />
        <Skeleton className="h-4 w-36 rounded-lg" />
      </div>
    </div>
  );
};

const MessagesSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Left message */}
      <LeftMessageSkeleton />
      <LeftMessageSkeleton />

      <RightMessageSkeleton />

      <LeftMessageSkeleton />

      <LeftMessageSkeleton />
      <LeftMessageSkeleton />

      <RightMessageSkeleton />
      <RightMessageSkeleton />
      <LeftMessageSkeleton />
    </div>
  );
};

export default MessagesSkeleton;
