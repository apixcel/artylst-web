"use client";

import FavoriteArtistCard from "@/components/dashboard/business/artists/favoriteArtist/FavoriteArtistCard";
import FavoriteArtistCardSkeleton from "@/components/dashboard/business/artists/favoriteArtist/FavoriteArtistCardSkeleton";
import { useGetFavArtistQuery } from "@/redux/features/artist/artist.api";
import Link from "next/link";

const FanFavArtistsView = () => {
  const { data, isLoading, isFetching } = useGetFavArtistQuery({});

  const favArtists = data?.data || [];
  return (
    <div className="p-4 flex flex-col gap-4">
      <h4 className="text-lg font-semibold">My Favorite Artists</h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {isFetching ? (
          <>
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
            <FavoriteArtistCardSkeleton />
          </>
        ) : (
          favArtists?.map((a) => <FavoriteArtistCard key={a._id} artist={a} />)
        )}
      </div>

      {favArtists.length === 0 && !isLoading && (
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
    </div>
  );
};

export default FanFavArtistsView;
