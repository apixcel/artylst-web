"use client";
import Chip from "@/components/ui/Chip";
import { artistAvatarFallback } from "@/constants/fallBack";
import { IArtist, IQueryMutationErrorResponse } from "@/interface";
import { useAddOrRemoveFavArtistMutation } from "@/redux/features/artist/artist.api";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
const FavoriteArtistCard = ({ artist }: { artist: IArtist }) => {
  const [addOrRemoveFavorite, { isLoading }] = useAddOrRemoveFavArtistMutation();

  const unfavorite = async () => {
    if (isLoading) return;

    if (!artist._id) {
      toast.error("Something went wrong");
    }
    const res = await addOrRemoveFavorite(artist._id);
    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err.data?.message || "Something went wrong");
      return;
    }
  };

  return (
    <div className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
      <div className="relative h-40 rounded-xl overflow-hidden">
        <Image
          src={artist?.avatar || artistAvatarFallback}
          alt={`Artist ${artist?.displayName}`}
          width={160}
          height={160}
          className={`h-40 rounded-xl w-full object-cover`}
        />
        {/* Top-right actions */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 items-center">
          <button
            className="h-10 w-10 rounded-full bg-brand-4/20 backdrop-blur border border-brand-4/30 flex items-center justify-center cursor-pointer"
            title="Remove from favorites"
            onClick={() => unfavorite()}
          >
            <Heart className="h-4 w-4 fill-brand-4 text-brand-4" />
          </button>
          <Link
            href={`/messages?to=${artist?.userName}`}
            className="h-10 w-10 rounded-full bg-brand-2/10 backdrop-blur border border-white/10 grid place-items-center"
            title="Message"
          >
            <MessageSquare className="h-4 w-4" />
          </Link>
        </div>
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="font-heading">{artist?.displayName}</div>
          <div className="text-xs text-white/70">@{artist?.userName}</div>
        </div>
      </div>

      {/* Tags & status */}
      <div className="mt-3 flex flex-wrap gap-2 min-h-[22px]">
        {artist?.genre.slice(0, 3).map((t) => (
          <Chip key={t._id}>{t.label}</Chip>
        ))}

        {artist.genre?.length > 3 && <Chip>{artist.genre.length - 3}+</Chip>}
      </div>

      {/* CTA */}
      <div className="mt-3 flex gap-2">
        <Link
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
          href={`/artists/${artist?.userName}`}
        >
          View
        </Link>
        <Link
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
          href={`/artists/${artist?.userName}/checkout`}
        >
          Request
        </Link>
      </div>
    </div>
  );
};

export default FavoriteArtistCard;
