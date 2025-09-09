"use client";

import { useEffect, useMemo, useState } from "react";
import { useSetSearchParams } from "@/hooks";
import { useGetGenresQuery, useGetVibesQuery } from "@/redux/features/meta/meta.api";

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

  const { data: genresData, isLoading: isLoadingGenres } = useGetGenresQuery({});
  const genres = genresData?.data || [];

  const { data: vibesData, isLoading: isLoadingVibes } = useGetVibesQuery({});
  const vibes = vibesData?.data || [];

  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [selectedVibes, setSelectedVibes] = useState<Set<string>>(new Set());
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set());
  const [eta, setEta] = useState<Eta>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    const getSet = (key: string) =>
      new Set(searchParams.get(key)?.split(",").filter(Boolean) ?? []);

    setSelectedCats(getSet("genre"));
    setSelectedVibes(getSet("vibes"));
    setSelectedPlatforms(getSet("platforms"));
    setEta((searchParams.get("eta") as Eta) ?? null);
    setMinPrice(searchParams.get("minPrice") ?? "");
    setMaxPrice(searchParams.get("maxPrice") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyDisabled = useMemo(() => {
    return (
      !selectedCats.size &&
      !selectedVibes.size &&
      !selectedPlatforms.size &&
      !selectedLangs.size &&
      !eta &&
      !minPrice &&
      !maxPrice
    );
  }, [
    selectedCats,
    selectedVibes,
    selectedPlatforms,
    selectedLangs,
    eta,
    minPrice,
    maxPrice,
  ]);

  const handleClearAll = () => {
    setSelectedCats(new Set());
    setSelectedVibes(new Set());
    setSelectedPlatforms(new Set());
    setSelectedLangs(new Set());
    setEta(null);
    setMinPrice("");
    setMaxPrice("");
    clearSearchParams();
  };

  const handleApplyFilters = () => {
    updateSearchParams({
      genre: joinOrUndef(selectedCats),
      vibes: joinOrUndef(selectedVibes),
      platforms: joinOrUndef(selectedPlatforms),
      eta: eta ?? undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
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

      {/* Genre */}
      <div className="mt-4">
        <div className="filter-title">Genre</div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {genres.map((genre) => {
            const active = selectedCats.has(genre.slug);
            return (
              <button
                type="button"
                key={genre.slug}
                onClick={() => setSelectedCats((prev) => toggleInSet(prev, genre.slug))}
                className={`chip whitespace-nowrap ${active ? "chip-active" : ""}`}
                aria-pressed={active}
              >
                {genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vibes */}
      <div className="mt-5">
        <div className="filter-title">Vibes</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {vibes.map((v) => {
            const active = selectedVibes.has(v.slug);
            return (
              <button
                key={v.slug}
                type="button"
                className={`chip ${active ? "chip-active" : ""}`}
                onClick={() => setSelectedVibes((prev) => toggleInSet(prev, v.slug))}
                aria-pressed={active}
              >
                {v.slug.charAt(0).toUpperCase() + v.slug.slice(1)}
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
                onClick={() => setSelectedPlatforms((prev) => toggleInSet(prev, p))}
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
