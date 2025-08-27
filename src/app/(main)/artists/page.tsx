"use client";

import {
  CategoryChips,
  ArtistsFilter,
  ArtistTopbar,
  ArtistCard,
  Pagination,
} from "@/components";
import { artistsData } from "@/constants";
import { useState } from "react";
import { DropdownOption } from "@/interface";
import { cn } from "@/utils";

const ArtistsPage = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<DropdownOption<string> | null>({
    label: "Recommended",
    value: "recommended",
  });
  const total = 1000;

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
            {artistsData.map((item, index) => (
              <ArtistCard key={item.id} item={item} index={index} view={view} />
            ))}
          </div>

          <Pagination
            totalDocs={total}
            page={page}
            setPage={setPage}
            limit={10}
            onPageChange={setPage}
          />
        </section>
      </div>
    </>
  );
};

export default ArtistsPage;
