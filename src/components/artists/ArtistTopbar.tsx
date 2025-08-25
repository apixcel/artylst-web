"use client";

import { useState } from "react";
import { DropdownOption } from "@/interface";
import { Dropdown } from "@/components";
import { Grid3X3, List } from "lucide-react";

const artistSortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-low-to-high" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "Delivery time", value: "delivery-time" },
  { label: "Rating", value: "rating" },
  { label: "Most orders", value: "most-orders" },
];

const ArtistTopbar = () => {
  const [sort, setSort] = useState<DropdownOption<string> | null>(artistSortOptions[0]);

  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="text-sm text-white/80">4,725 results</div>
      <div className="flex items-center gap-2">
        <label className="text-muted">Sort</label>
        <Dropdown
          value={sort}
          options={artistSortOptions}
          onChange={setSort}
          placeholder="Choose sort"
        />

        <button className="btn btn-ghost" title="Grid view">
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button className="btn btn-ghost" title="List view">
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ArtistTopbar;
