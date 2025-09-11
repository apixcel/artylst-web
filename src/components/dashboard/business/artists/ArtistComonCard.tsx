import Chip from "@/components/ui/Chip";
import { artistAvatarFallback } from "@/constants/fallBack";
import { IArtist } from "@/interface";
import { Eye, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  artist: IArtist & {
    recommended?: boolean;
    popular?: boolean;
    viewCount?: number;
    orders?: number;
  };
}

const ArtistComonCard: React.FC<IProps> = ({ artist }) => {
  return (
    <div className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition relative">
      <div className="relative h-40 rounded-xl overflow-hidden">
        <Image
          src={artist?.avatar || artistAvatarFallback}
          alt={`Artist ${artist?.displayName}`}
          width={160}
          height={160}
          className={`h-40 rounded-xl w-full object-cover`}
        />

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="font-heading">{artist?.displayName}</div>
          <div className="text-xs text-white/70">@{artist?.userName}</div>
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {artist?.recommended && <Chip className="bg-white/10">Recommended</Chip>}
          {artist?.popular && (
            <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 inline-flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> Popular
            </Chip>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 min-h-[29px]">
        {artist?.genre.slice(0, 2).map((t) => (
          <Chip key={t._id}>{t.label}</Chip>
        ))}
      </div>
      <span className="mt-2 text-xs text-white/60">Spotiy • Youtube Music </span>

      <div className="mt-2 text-sm flex items-center justify-between">
        <div>
          <div className="text-white/70">Starting Price</div>
          <div className="font-heading">${artist?.minStartingPrice}</div>
        </div>
        <div className="text-xs text-white/60">
          ★ {artist?.avgRating} • {artist?.ordersCount} orders
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          href={`/artists/${artist?.userName}`}
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
        >
          View
        </Link>
        <Link
          href={`/artists/${artist?.userName}/checkout`}
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
        >
          Request
        </Link>
      </div>

      {artist.viewCount ? (
        <div className="absolute top-3 right-3 text-[11px] px-2 py-0.5 rounded-full bg-black/60 border border-white/10 inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" /> {artist.viewCount}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ArtistComonCard;
