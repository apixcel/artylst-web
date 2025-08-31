"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, MessageSquare, Search, Plus, Filter } from "lucide-react";
import { Dropdown } from "@/components";
import { DropdownOption } from "@/interface";
import Image from "next/image";

// ----- Demo data (replace with API) -----
const FAVORITES = [
  {
    id: 60,
    name: "Artist 60",
    handle: "handle60",
    img: "https://i.pravatar.cc/300?img=60",
    tags: ["Lo-fi", "Chill"],
    accepting: true,
  },
  {
    id: 61,
    name: "Artist 61",
    handle: "handle61",
    img: "https://i.pravatar.cc/300?img=61",
    tags: ["Workout", "Pop"],
    accepting: true,
  },
  {
    id: 62,
    name: "Artist 62",
    handle: "handle62",
    img: "https://i.pravatar.cc/300?img=62",
    tags: ["Jazz", "Lounge"],
    accepting: false,
  },
  {
    id: 63,
    name: "Artist 63",
    handle: "handle63",
    img: "https://i.pravatar.cc/300?img=63",
    tags: ["Focus", "Ambient"],
    accepting: true,
  },
];

const ALL_TAGS = [
  "All",
  "Lo-fi",
  "Chill",
  "Workout",
  "Pop",
  "Jazz",
  "Lounge",
  "Focus",
  "Ambient",
];

type Favorite = (typeof FAVORITES)[number];

const Chip = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-white/10 bg-white/5 ${className}`}
  >
    {children}
  </span>
);

const FavoritesPage = () => {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("recent");
  const [items, setItems] = useState<Favorite[]>(FAVORITES);

  const filtered = useMemo(() => {
    let list = [...items];

    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((a) => `${a.name} ${a.handle}`.toLowerCase().includes(needle));
    }

    if (tag !== "All") {
      list = list.filter((a) => a.tags.includes(tag));
    }

    if (sort === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "accepting") {
      list.sort((a, b) => Number(b.accepting) - Number(a.accepting));
    } // default "recent" keeps original order

    return list;
  }, [items, q, tag, sort]);

  const unfavorite = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">Favorites</h1>
          <p className="text-white/60 text-sm mt-1">
            Saved artists you love •{" "}
            <span className="font-medium text-light">{filtered.length}</span> found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Collection
          </button>
          <Link
            href="/artists"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"
          >
            Browse Artists
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 grid gap-3 grid-cols-2 xl:grid-cols-3">
        {/* Tag */}
        <div className="md:col-span-1 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <Filter className="h-4 w-4 text-white/60" />
          <Dropdown
            value={{ label: tag, value: tag } as DropdownOption<string>}
            options={ALL_TAGS.map((t) => ({ label: t, value: t }))}
            onChange={(e) => setTag(e.value)}
            className="w-full"
            buttonClassName="bg-transparent border-transparent w-full"
            panelClassName="bg-black"
          />
        </div>
        {/* Sort */}
        <div className="md:col-span-1 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <span className="text-white/60 text-sm">Sort</span>
          <Dropdown
            className="w-full"
            buttonClassName="bg-transparent border-transparent w-full"
            panelClassName="bg-black"
            value={{ label: sort, value: sort } as DropdownOption<string>}
            options={["recent", "az", "accepting"].map((t) => ({ label: t, value: t }))}
            onChange={(e) => setSort(e.value)}
          />
        </div>
        {/* Search */}
        <div className="xl:col-span-1 col-span-2 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
          <Search className="h-4 w-4 text-white/60" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search by name or handle"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Collections (quick filters) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {ALL_TAGS.filter((t) => t !== "All").map((t) => (
          <button
            key={t}
            onClick={() => setTag(tag === t ? "All" : t)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap border ${
              tag === t ? "bg-white/20 border-white/20" : "bg-white/5 border-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
          >
            <div className="relative h-40 rounded-xl overflow-hidden">
              <Image
                src={a.img}
                alt={`Artist ${a.name}`}
                width={160}
                height={160}
                className={`h-40 rounded-xl w-full object-cover`}
              />
              {/* Top-right actions */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 grid place-items-center"
                  title="Remove from favorites"
                  onClick={() => unfavorite(a.id)}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <Link
                  href={`/messages?to=${a.handle}`}
                  className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 grid place-items-center"
                  title="Message"
                >
                  <MessageSquare className="h-4 w-4" />
                </Link>
              </div>
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="font-heading">{a.name}</div>
                <div className="text-xs text-white/70">@{a.handle}</div>
              </div>
            </div>

            {/* Tags & status */}
            <div className="mt-3 flex flex-wrap gap-2">
              {a.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              {a.accepting ? (
                <Chip className="bg-green-500/10 text-green-400 border-green-500/20">
                  Accepting
                </Chip>
              ) : (
                <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Waitlist
                </Chip>
              )}
            </div>

            {/* CTA */}
            <div className="mt-3 flex gap-2">
              <Link
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
                href={`/artists/${a.id}`}
              >
                View
              </Link>
              <Link
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
                href={`/orders/new?artist=${a.id}`}
              >
                Request
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 text-center text-white/70">
          <div className="text-lg font-heading">No favorites match your filters</div>
          <div className="text-sm mt-1">
            Try clearing search or choosing a different tag
          </div>
          <Link
            href="/artists"
            className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/10 border border-white/10"
          >
            Browse artists
          </Link>
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
