import { Skeleton } from "@/components";

const ArtistCardSkeleton = ({ row, columns }: { row?: number; columns?: number }) => {
  return (
    <>
      {[...Array(row || 5)].map((_, index) => (
        <div key={index} className="hover:bg-gray-50">
          {Array.from({ length: columns || 6 }).map((_, indx) => (
            <div key={indx} className="px-6 py-3">
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default ArtistCardSkeleton;
