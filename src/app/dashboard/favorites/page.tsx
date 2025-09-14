"use client";

import { Dropdown, Pagination, UnauthorizedMsgBox } from "@/components";
import FavoriteArtistCard from "@/components/dashboard/business/artists/favoriteArtist/FavoriteArtistCard";
import FavoriteArtistCardSkeleton from "@/components/dashboard/business/artists/favoriteArtist/FavoriteArtistCardSkeleton";
import GenreSelector from "@/components/ui/GenreSelector";
import { useAppSelector, useDebounce } from "@/hooks";
import { DropdownOption } from "@/interface";
import { useGetFavArtistQuery } from "@/redux/features/artist/artist.api";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sortOptions: DropdownOption[] = [
  { value: "-createdAt", label: "Recent" },
  { value: "displayName", label: "A-Z" },
  { value: "-displayName", label: "Z-A" },
];

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");

  const [query, setQuery] = useState({
    page: 1,
    genre: "",
    sort: "",
  });

  const { data, isLoading, isFetching } = useGetFavArtistQuery({
    ...query,
    searchTerm,
  });

  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const favArtists = data?.data || [];
  const metaData = data?.meta;

  if (role !== "business") return <UnauthorizedMsgBox />;
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">Favorites</h1>
          <p className="text-white/60 text-sm mt-1">
            Saved artists you love •{" "}
            <span className="font-medium text-light">{metaData?.totalDoc}</span> found
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
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 gap-3 flex items-end sm:justify-start md:justify-between flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 flex-1">
          <Search className="h-4 w-4 text-white/60" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search By Order Id, Buyer, Tier"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <Filter className="h-4 w-4 text-white/60" />
          <GenreSelector
            className="w-[200px]"
            onChange={(e) => setQuery({ ...query, genre: e?._id || "" })}
          />
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg pl-3">
          <span className="text-white/60 text-sm">Sort</span>
          <Dropdown
            className="w-[200px]"
            buttonClassName="bg-transparent border-transparent w-full"
            panelClassName="bg-black"
            options={sortOptions}
            onChange={(e) => setQuery({ ...query, sort: e.value })}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {isFetching ? (
          <>
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
          </>
        ) : (
          favArtists?.map((a) => <FavoriteArtistCard key={a._id} artist={a} />)
        )}
      </div>

      {/* Empty state */}
      {!isFetching && favArtists.length === 0 && !isLoading && (
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

      <Pagination
        totalDocs={metaData?.totalDoc || 0}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </section>
  );
};

export default FavoritesPage;
