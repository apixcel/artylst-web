"use client";

import { UnauthorizedMsgBox } from "@/components";
import RecomendedArtist from "@/components/dashboard/business/artists/RecomendedArtist";
import TopViewedArtists from "@/components/dashboard/business/artists/TopViewedArtists";
import WeeklyTrendingArtists from "@/components/dashboard/business/artists/WeeklyTrendingArtists";
import { useAppSelector } from "@/hooks";
import { BadgeCheck, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BusinessArtistsPage() {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [tab, setTab] = useState<"all" | "recommended" | "popular" | "browsed">("all");

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
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border cursor-pointer ${
              tab === t.key
                ? "bg-brand-4/20 border-brand-4/20"
                : "bg-white/5 border-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Recommended carousel */}
      {(tab === "all" || tab === "recommended") && <RecomendedArtist />}

      {/* Popular grid */}
      {(tab === "all" || tab === "popular") && <WeeklyTrendingArtists />}

      {/* Most browsed (horizontal) */}
      {(tab === "all" || tab === "browsed") && <TopViewedArtists />}

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
