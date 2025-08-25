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

const ArtistsPage = () => {
  const [page, setPage] = useState(1);
  const total = 9;

  return (
    <>
      {/* category chips */}
      <CategoryChips />
      <div className="pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* filters sidebar */}
        <ArtistsFilter />
        {/* results */}
        <section>
          {/* top bar */}
          <ArtistTopbar />

          {/* grid */}
          <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* cards */}
            {artistsData.map((item, index) => (
              <ArtistCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={total}
            onPageChange={setPage}
            siblingCount={1}
            boundaryCount={1}
          />
        </section>
      </div>
    </>
  );
};

export default ArtistsPage;
