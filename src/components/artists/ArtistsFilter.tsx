"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/constants";
import { useSetSearchParams } from "@/hooks";

const VIBES = ["Workout", "Study/Focus", "Chill", "Wedding", "Party"] as const;
const PLATFORMS = ["Spotify", "Apple", "YTM"] as const;

type Eta = "24" | "48" | "72" | null;

const toggleInSet = (set: Set<string>, value: string) => {
  const next = new Set(set);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
};

const joinOrUndef = (values: Iterable<string>) => {
  const arr = Array.from(values).filter(Boolean);
  return arr.length ? arr.join(",") : undefined;
};

const ArtistsFilter = () => {
  const { searchParams, updateSearchParams, clearSearchParams } = useSetSearchParams();

  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [selectedVibes, setSelectedVibes] = useState<Set<string>>(new Set());
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set());
  const [commercial, setCommercial] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [eta, setEta] = useState<Eta>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    const getSet = (key: string) =>
      new Set(searchParams.get(key)?.split(",").filter(Boolean) ?? []);
    setSelectedCats(getSet("category"));
    setSelectedVibes(getSet("vibes"));
    setSelectedPlatforms(getSet("platforms"));
    setCommercial(searchParams.get("commercial") === "1");
    setRefresh(searchParams.get("refresh") === "1");
    setEta((searchParams.get("eta") as Eta) ?? null);
    setMinPrice(searchParams.get("min") ?? "");
    setMaxPrice(searchParams.get("max") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyDisabled = useMemo(() => {
    return (
      !selectedCats.size &&
      !selectedVibes.size &&
      !selectedPlatforms.size &&
      !selectedLangs.size &&
      !commercial &&
      !refresh &&
      !eta &&
      !minPrice &&
      !maxPrice
    );
  }, [
    selectedCats,
    selectedVibes,
    selectedPlatforms,
    selectedLangs,
    commercial,
    refresh,
    eta,
    minPrice,
    maxPrice,
  ]);

  const handleClearAll = () => {
    setSelectedCats(new Set());
    setSelectedVibes(new Set());
    setSelectedPlatforms(new Set());
    setSelectedLangs(new Set());
    setCommercial(false);
    setRefresh(false);
    setEta(null);
    setMinPrice("");
    setMaxPrice("");
    clearSearchParams();
  };

  const handleApplyFilters = () => {
    updateSearchParams({
      category: joinOrUndef(selectedCats),
      vibes: joinOrUndef(selectedVibes),
      platforms: joinOrUndef(selectedPlatforms),
      commercial: commercial ? "1" : undefined,
      refresh: refresh ? "1" : undefined,
      eta: eta ?? undefined,
      min: minPrice || undefined,
      max: maxPrice || undefined,
    });
  };

  const quickPrice = (min?: number, max?: number) => {
    setMinPrice(min?.toString() ?? "");
    setMaxPrice(max?.toString() ?? "");
  };

  return (
    <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-90px)] lg:overflow-auto card p-4 custom-scrollbar">
      <div className="flex items-center justify-between">
        <div className="font-heading">Filters</div>
        <button
          className="text-xs text-white/60 hover:text-white"
          onClick={handleClearAll}
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="mt-4">
        <div className="filter-title">Category</div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {categories.map((category) => {
            const active = selectedCats.has(category.value);
            return (
              <button
                type="button"
                key={category.value}
                onClick={() => setSelectedCats(toggleInSet(selectedCats, category.value))}
                className={`chip ${active && "chip-active"}`}
                aria-pressed={active}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vibes */}
      <div className="mt-5">
        <div className="filter-title">Vibes</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {VIBES.map((v) => {
            const active = selectedVibes.has(v);
            return (
              <button
                key={v}
                type="button"
                className={`chip ${active ? "chip-active" : ""}`}
                onClick={() => setSelectedVibes(toggleInSet(selectedVibes, v))}
                aria-pressed={active}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platforms */}
      <div className="mt-5">
        <div className="filter-title">Platform</div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {PLATFORMS.map((p) => {
            const active = selectedPlatforms.has(p);
            return (
              <button
                key={p}
                type="button"
                className={`chip justify-center ${active ? "chip-active" : ""}`}
                onClick={() => setSelectedPlatforms(toggleInSet(selectedPlatforms, p))}
                aria-pressed={active}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery */}
      <div className="mt-5">
        <div className="filter-title">Delivery ETA</div>
        <div className="mt-2 space-y-2 text-sm">
          {["24", "48", "72"].map((h) => (
            <label key={h} className="flex items-center gap-2">
              <input
                type="radio"
                name="eta"
                checked={eta === (h as Eta)}
                onChange={() => setEta(h as Eta)}
              />
              <span>Under {h}h</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-5">
        <div className="filter-title">Price</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input
            type="number"
            className="input"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <button className="btn btn-ghost" onClick={() => quickPrice(undefined, 25)}>
            Under $25
          </button>
          <button className="btn btn-ghost" onClick={() => quickPrice(25, 50)}>
            $25–$50
          </button>
          <button className="btn btn-ghost" onClick={() => quickPrice(50, 100)}>
            $50–$100
          </button>
          <button className="btn btn-ghost" onClick={() => quickPrice(100, undefined)}>
            $100+
          </button>
        </div>
      </div>

      {/* Business */}
      <div className="mt-5">
        <div className="filter-title">Business friendly</div>
        <div className="mt-2 text-sm space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={commercial}
              onChange={(e) => setCommercial(e.target.checked)}
            />
            <span>Commercial license option</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={refresh}
              onChange={(e) => setRefresh(e.target.checked)}
            />
            <span>Monthly refresh available</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="btn btn-primary w-full"
          onClick={handleApplyFilters}
          disabled={applyDisabled}
        >
          Apply filters
        </button>
      </div>
    </aside>
  );
};

export default ArtistsFilter;
