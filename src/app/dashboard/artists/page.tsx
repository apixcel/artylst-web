"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Flame,
  Eye,
  BadgeCheck,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { DropdownOption } from "@/interface/dropdown.interface";
import { Dropdown, UnauthorizedMsgBox } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import { useAppSelector } from "@/hooks";

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

const Card = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`rounded-2xl p-5 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);

export type Artist = {
  id: number;
  name: string;
  handle: string;
  img: string;
  tags: string[];
  platform: "Spotify" | "Apple Music" | "YouTube Music";
  price: number; // Standard tier
  eta: string; // e.g. "2–3d"
  rating: number; // 4.8
  accepting: boolean;
  recommended?: boolean;
  popular?: boolean; // this week
  views?: number; // for Most browsed
  orders?: number;
};

const ARTISTS: Artist[] = Array.from({ length: 12 }).map((_, i) => {
  const base: Artist = {
    id: 200 + i,
    name: `Artist ${i + 1}`,
    handle: `handle${i + 1}`,
    img: `https://i.pravatar.cc/300?img=${40 + i}`,
    tags:
      i % 3 === 0
        ? ["Lo‑fi", "Chill"]
        : i % 3 === 1
          ? ["Uplifting", "Pop"]
          : ["Jazz", "Lounge"],
    platform: (i % 3 === 0
      ? "Spotify"
      : i % 3 === 1
        ? "Apple Music"
        : "YouTube Music") as Artist["platform"],
    price: [89, 99, 119, 79][i % 4],
    eta: ["1–2d", "2–3d", "3–4d"][i % 3],
    rating: [4.7, 4.8, 4.9, 4.6][i % 4],
    accepting: i % 5 !== 0,
    recommended: i % 4 === 0 || i % 4 === 1,
    popular: i % 3 === 0,
    views: 500 + i * 37,
    orders: 20 + ((i * 3) % 40),
  };
  return base;
});

const ALL_VIBES = [
  "All",
  "Lo‑fi",
  "Chill",
  "Uplifting",
  "Pop",
  "Jazz",
  "Lounge",
  "Focus",
  "Ambient",
];

const PLATFORMS = ["All", "Spotify", "Apple Music", "YouTube Music"];

const SORT_OPTIONS = ["recommended", "price", "eta", "rating"];

const ArtistCard = ({ a }: { a: Artist }) => (
  <div className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
    <div className="relative h-40 rounded-xl overflow-hidden">
      <Image
        src={a.img}
        alt={`Artist ${a.name}`}
        width={160}
        height={160}
        className={`h-40 rounded-xl w-full object-cover`}
      />

      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="font-heading">{a.name}</div>
        <div className="text-xs text-white/70">@{a.handle}</div>
      </div>
      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-2">
        {a.recommended && <Chip className="bg-white/10">Recommended</Chip>}
        {a.popular && (
          <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> Popular
          </Chip>
        )}
      </div>
    </div>

    <div className="mt-3 flex flex-wrap gap-2">
      {a.tags.slice(0, 2).map((t) => (
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
    <div className="mt-2 text-xs text-white/60">
      Avg. ETA: {a.eta} • {a.platform}
    </div>

    <div className="mt-2 text-sm flex items-center justify-between">
      <div>
        <div className="text-white/70">Standard</div>
        <div className="font-heading">${a.price}</div>
      </div>
      <div className="text-xs text-white/60">
        ★ {a.rating} • {a.orders} orders
      </div>
    </div>

    <div className="mt-3 flex gap-2">
      <Link
        href={`/dashboard/business/artists/${a.handle}`}
        className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
      >
        View
      </Link>
      <Link
        href={`/orders/new?artist=${a.handle}`}
        className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
      >
        Request
      </Link>
    </div>
  </div>
);

export default function BusinessArtistsPage() {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;
  const [q, setQ] = useState("");
  const [vibe, setVibe] = useState("All");
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("All");
  const [tab, setTab] = useState<"all" | "recommended" | "popular" | "browsed">("all");
  const [sort, setSort] = useState("recommended");

  const recommended = useMemo(() => ARTISTS.filter((a) => a.recommended), []);
  const popular = useMemo(() => ARTISTS.filter((a) => a.popular), []);
  const browsed = useMemo(
    () => [...ARTISTS].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 8),
    []
  );

  const SectionHeader = ({
    title,
    subtitle,
    actionHref,
  }: {
    title: string;
    subtitle?: string;
    actionHref?: string;
  }) => (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="font-heading">{title}</div>
        {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
      </div>
      {actionHref && (
        <Link href={actionHref} className="text-sm text-white/70 underline">
          View all
        </Link>
      )}
    </div>
  );

  if (role !== "business") return <UnauthorizedMsgBox />;

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">Artists</h1>
          <p className="text-white/70 text-sm mt-1">
            Curated for businesses • Private playlists + 30s auth video
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/orders/new"
            className="px-3 py-2 rounded-lg bg-brand-4/70 text-sm hover:bg-brand-4/60 transition"
          >
            Create a brief
          </Link>
          <Link
            href="/favorites"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition"
          >
            Favorites
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto w-full">
        {[
          { key: "all", label: "All" },
          { key: "recommended", label: "Recommended" },
          { key: "popular", label: "Popular" },
          { key: "browsed", label: "Most browsed" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border ${
              tab === t.key
                ? "bg-brand-4/20 border-brand-4/20"
                : "bg-white/5 border-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 gap-3 flex items-end justify-start xl:justify-between flex-wrap">
        {/* Vibe */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <Filter className="h-4 w-4 text-white/60" />
          <Dropdown
            value={{ label: vibe, value: vibe } as DropdownOption<string>}
            options={ALL_VIBES.map((t) => ({ label: t, value: t }))}
            onChange={(e) => setVibe(e.value)}
            buttonClassName="bg-transparent border-transparent xl:w-50 md:w-37 w-45"
          />
        </div>
        {/* Platform */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <span className="text-white/60 text-sm">Platform</span>
          <Dropdown
            value={{ label: platform, value: platform } as DropdownOption<string>}
            options={PLATFORMS.map((p) => ({ label: p, value: p }))}
            onChange={(e) => setPlatform(e.value as (typeof PLATFORMS)[number])}
            buttonClassName="bg-transparent border-transparent xl:w-50 md:w-37 w-45"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <label className="text-white/60 text-sm">Sort</label>
          <Dropdown
            value={{ label: sort, value: sort } as DropdownOption<string>}
            options={SORT_OPTIONS.map((t) => ({ label: t, value: t }))}
            onChange={(e) => setSort(e.value)}
            buttonClassName="bg-transparent border-transparent xl:w-50 md:w-37 w-60"
          />
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 flex-1">
          <Search className="h-4 w-4 text-white/60" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search artists"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Recommended carousel */}
      {(tab === "all" || tab === "recommended") && (
        <Card>
          <SectionHeader
            title="Recommended for your business"
            subtitle="Based on Café & Workplace vibes"
            actionHref="/artists"
          />
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            modules={[FreeMode, Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            navigation={{
              nextEl: ".recommended-next",
              prevEl: ".recommended-prev",
            }}
            className="group business-recommended-artists-swiper"
          >
            {recommended.map((a) => (
              <SwiperSlide key={a.id}>
                <ArtistCard a={a} />
              </SwiperSlide>
            ))}

            {/* navigation */}
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
              <button className="recommended-prev nav-button left-8 absolute">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="recommended-next nav-button right-8 absolute">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Swiper>
        </Card>
      )}

      {/* Popular grid */}
      {(tab === "all" || tab === "popular") && (
        <Card>
          <SectionHeader title="Popular this week" subtitle="Trending now" />
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            modules={[FreeMode, Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".popular-next",
              prevEl: ".popular-prev",
            }}
            className="group business-popular-artists-swiper"
          >
            {popular.slice(0, 8).map((a) => (
              <SwiperSlide key={a.id}>
                <ArtistCard a={a} />
              </SwiperSlide>
            ))}

            {/* navigation */}
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
              <button className="popular-prev nav-button left-8 absolute">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="popular-next nav-button right-8 absolute">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Swiper>
        </Card>
      )}

      {/* Most browsed (horizontal) */}
      {(tab === "all" || tab === "browsed") && (
        <Card>
          <SectionHeader title="Most browsed" subtitle="By views in the last 30 days" />
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            modules={[FreeMode, Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            navigation={{
              nextEl: ".browsed-next",
              prevEl: ".browsed-prev",
            }}
            className="group business-browsed-artists-swiper"
          >
            {browsed.map((a) => (
              <SwiperSlide key={a.id}>
                <div className="relative">
                  <ArtistCard a={a} />
                  <div className="absolute top-3 right-3 text-[11px] px-2 py-0.5 rounded-full bg-black/60 border border-white/10 inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {a.views}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* navigation */}
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
              <button className="browsed-prev nav-button left-8 absolute">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="browsed-next nav-button right-8 absolute">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Swiper>
        </Card>
      )}

      {/* Footer helper */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row flex-col flex items-start gap-4">
        <div className="text-sm flex-1">
          <div className="font-heading flex items-center gap-2 mb-2">
            <BadgeCheck className="h-5 w-5 text-green-400 mt-0.5" />
            Tip
          </div>
          <div className="text-white/70">
            Use filters to match your vibe and platform, then click <em>Request</em> to
            send a brief. Every delivery includes a private playlist link + a 30s
            authentication video.
          </div>
        </div>
        <Link
          href="/messages"
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 inline-flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> Need help?
        </Link>
      </div>
    </section>
  );
}
