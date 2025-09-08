"use client";

import {
  CategoryChips,
  ArtistsFilter,
  ArtistTopbar,
  ArtistCard,
  Pagination,
} from "@/components";
import { useState } from "react";
import { DropdownOption } from "@/interface";
import { cn } from "@/utils";
import { useGetAllArtistQuery } from "@/redux/features/artist/artist.api";
import ArtistCardSkeleton from "@/components/artists/ArtistCardSkeleton";

const ArtistsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<DropdownOption<string> | null>({
    label: "Recommended",
    value: "recommended",
  });

  const [query, setQuery] = useState({
    page: 1,
    fields: "displayName,username,price,oldPrice,image,rating,reviews,tags,slotsLeft,eta",
  });

  const { data, isLoading } = useGetAllArtistQuery(query, {
    skip: !query.page,
  });
  const artistData = data?.data || [];
  console.log(artistData);
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <>
      <CategoryChips />
      <div className="pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <ArtistsFilter />
        <section>
          {/* top bar now controls view + sort */}
          <ArtistTopbar view={view} setView={setView} sort={sort} setSort={setSort} />

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
              <ArtistCardSkeleton row={5} columns={6} />
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
            onPageChange={(page) => setQuery({ ...query, page })}
          />
        </section>
      </div>
    </>
  );
};

export default ArtistsPage;
