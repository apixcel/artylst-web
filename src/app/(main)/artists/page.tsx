"use client";

import {
  GenreChips,
  ArtistsFilter,
  ArtistTopbar,
  ArtistCard,
  Pagination,
  ArtistCardSkeleton,
} from "@/components";
import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { useGetAllArtistQuery } from "@/redux/features/artist/artist.api";
import { useDebounce, useSetSearchParams } from "@/hooks";

const ArtistsPage = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [view, setView] = useState<"grid" | "list">("grid");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [query, setQuery] = useState<Record<string, any>>({
    page: 1,
  });

  const { searchParams, updateSearchParams } = useSetSearchParams();

  const { data, isLoading } = useGetAllArtistQuery({ ...query, searchTerm });
  const artistData = data?.data || [];
  console.log(artistData);
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  useEffect(() => {
    const genre = searchParams.get("genre");
    const vibes = searchParams.get("vibes");
    const platforms = searchParams.get("platforms");
    const commercial = searchParams.get("commercial");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    setQuery({
      page: Number(searchParams.get("page")) || 1,
      genre,
      vibes,
      platforms,
      commercial,
      minPrice,
      maxPrice,
      sort,
      limit: 2,
    });
    updateSearchParams({
      sort: sort || undefined,
    });
  }, [searchParams, updateSearchParams]);

  return (
    <>
      <GenreChips />
      <div className="pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <ArtistsFilter />
        <section>
          {/* top bar now controls view + sort */}
          <ArtistTopbar
            view={view}
            setView={setView}
            setSearchTerm={setSearchTerm}
            metaData={metaData}
          />

          {/* results */}
          <div
            className={cn(
              "my-4",
              view === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                : "flex flex-col gap-3"
            )}
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ArtistCardSkeleton key={index} view={view} />
              ))
            ) : data?.data.length ? (
              artistData.map((item, index) => (
                <ArtistCard key={index} item={item} index={index} view={view} />
              ))
            ) : (
              <p className="text-center text-gray-500">No artists found</p>
            )}
          </div>

          <Pagination
            totalDocs={metaData.totalDoc}
            limit={2}
            onPageChange={(page) => setQuery({ ...query, page })}
          />
        </section>
      </div>
    </>
  );
};

export default ArtistsPage;
