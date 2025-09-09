"use client";

import { DropdownOption, IMeta } from "@/interface";
import { Dropdown } from "@/components";
import { Grid3X3, List, Search } from "lucide-react";
import { useSetSearchParams } from "@/hooks";
import { useEffect, useState } from "react";

const artistSortOptions = [
  { label: "Recommended", value: "" },
  { label: "Price: Low to High", value: "low-to-high" },
  { label: "Price: High to Low", value: "high-to-low" },
  { label: "Delivery time", value: "delivery-time" },
  { label: "Rating", value: "rating" },
  { label: "Most orders", value: "most-orders" },
];

type Props = {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  setSearchTerm: (term: string) => void;
  metaData: IMeta;
};

const ArtistTopbar = ({ view, setView, setSearchTerm, metaData }: Props) => {
  const [sort, setSort] = useState<DropdownOption<string> | null>({
    label: "Recommended",
    value: "",
  });
  const { updateSearchParams } = useSetSearchParams();

  useEffect(() => {
    updateSearchParams({
      sort: sort?.value,
    });
  }, [sort, updateSearchParams]);

  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="text-sm text-white/80">{metaData.totalDoc} results</div>
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute w-4.5 h-4.5 left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Sort */}
        <label className="text-muted">Sort</label>
        <Dropdown
          value={sort}
          options={artistSortOptions}
          onChange={setSort}
          placeholder="Choose sort"
        />

        {/* Grid button */}
        <button
          onClick={() => setView("grid")}
          className={`btn btn-ghost ${view === "grid" ? "bg-white/10" : ""}`}
          title="Grid view"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        {/* List button */}
        <button
          onClick={() => setView("list")}
          className={`btn btn-ghost ${view === "list" ? "bg-white/10" : ""}`}
          title="List view"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ArtistTopbar;
