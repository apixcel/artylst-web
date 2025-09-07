import { AppleMusicIcon, SoundCloudIcon, SpotifyIcon, YTMusicIcon } from "@/icons";
import { Artist } from "@/interface";
import { cn } from "@/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Crown({ index }: { index: number }) {
  const rank = index + 1;
  const top3 = rank <= 3;

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-tl-xl rounded-br-2xl pl-3 pr-3 py-1",
        "backdrop-blur-md text-black",
        top3
          ? "bg-gradient-to-r from-gold/90 via-mario-coin/70 to-gold/90"
          : "bg-white/85",
        "shadow-[0_4px_16px_-4px_rgba(0,0,0,0.25)] border border-black/5"
      )}
      aria-label={`Rank ${rank}`}
    >
      {/* left flourish */}
      {index < 10 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              fill="#ff808c"
              d="M4.812 16.854C4.562 18.635 1 19.526 1 19.526l2.391 1.434l-.956 1.913s4.304-.478 4.304-2.39a.936.936 0 0 0-.957-.957"
            ></path>
            <path
              stroke="#191919"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.812 16.854C4.562 18.635 1 19.526 1 19.526l2.391 1.434l-.956 1.913s4.304-.478 4.304-2.39a.936.936 0 0 0-.957-.957"
              strokeWidth={1}
            ></path>
            <path
              fill="#ff808c"
              d="M19.187 16.854c.25 1.781 3.813 2.672 3.813 2.672l-2.391 1.434l.956 1.913s-4.304-.478-4.304-2.39a.935.935 0 0 1 .956-.957"
            ></path>
            <path
              stroke="#191919"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.187 16.854c.25 1.781 3.813 2.672 3.813 2.672l-2.391 1.434l.956 1.913s-4.304-.478-4.304-2.39a.935.935 0 0 1 .956-.957"
              strokeWidth={1}
            ></path>
            <path
              fill="#ffbfc5"
              stroke="#191919"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.657c4.782 0 6.217 2.87 6.217 2.87l1.647-4.53a.96.96 0 0 0-.428-1.16A15.5 15.5 0 0 0 12 11.876a15.5 15.5 0 0 0-7.437 1.963a.956.956 0 0 0-.427 1.159l1.647 4.53s1.434-2.87 6.217-2.87"
              strokeWidth={1}
            ></path>
            <path
              fill="#ffef5e"
              stroke="#191919"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.785 1.303c.118-.235.31-.235.428 0l1.221 2.442h2.87c.262 0 .299.12.08.265l-2.472 1.648l1.267 3.377c.095.247-.008.323-.221.17l-2.959-2.112l-2.958 2.112c-.214.154-.314.077-.22-.169l1.265-3.378L7.615 4.01c-.22-.146-.183-.265.08-.265h2.87zM4.147 4.657c.111-.239.293-.239.405 0l.913 1.957H7.22c.263 0 .326.153.14.339L5.836 8.475l.616 2.144c.073.253-.05.346-.274.207l-1.83-1.142l-1.827 1.142c-.222.14-.346.048-.274-.207l.613-2.144l-1.523-1.522c-.185-.191-.123-.339.14-.339h1.754zm15.303 0c.11-.239.292-.239.404 0l.913 1.957h1.753c.263 0 .326.153.14.339l-1.522 1.522l.613 2.144c.073.253-.05.346-.274.207L19.65 9.684l-1.827 1.142c-.223.14-.346.048-.274-.207l.613-2.144l-1.523-1.522c-.185-.191-.123-.339.14-.339h1.754z"
              strokeWidth={1}
            ></path>
          </g>
        </svg>
      )}

      <p className="text-black font-bold text-[20px] leading-none">{index + 1}</p>
    </div>
  );
}

const ArtistCard = ({
  item,
  index,
  variant = "default",
  view = "grid",
}: {
  item: Artist;
  index: number;
  variant?: "default" | "home";
  view?: "grid" | "list";
}) => {
  const isDefault = variant === "default";

  if (view === "list") {
    // horizontal / list layout
    return (
      <div className="w-full rounded-2xl bg-black/30 backdrop-blur-sm p-4 flex gap-4 items-stretch">
        {/* image */}
        <div className="relative shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="size-[96px] sm:size-[120px] object-cover rounded-xl"
          />
          {!isDefault && (
            <div className="absolute -top-2 -left-2">
              <Crown index={index} />
            </div>
          )}
        </div>

        {/* middle content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[16px] font-bold leading-tight uppercase truncate font-britania-ligature">
              {item.name}
            </p>
            <span className="text-sm text-muted">· {item.designation}</span>
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] text-muted/80 bg-white/10 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-[14px] h-[14px]" />
              <p className="text-sm">{item.rating}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-greeniest">{item.eta}h</span>
              <span className="text-sm text-muted/80">{item.slotsLeft} slots left</span>
            </div>
          </div>
        </div>

        {/* right actions */}
        <div className="shrink-0 w-full sm:w-60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[4px] font-[500] font-britania-ligature">
              <p className={cn("text-light", item.oldPrice && "text-greeniest")}>
                ${item.price} {!item.oldPrice && "+"}
              </p>
              {item.oldPrice && (
                <p className="text-muted line-through">${item.oldPrice}+</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div>
                <YTMusicIcon className="w-5 h-5" />
              </div>
              <div>
                <SpotifyIcon className="w-5 h-5" />
              </div>
              <div>
                <AppleMusicIcon className="w-5 h-5" />
              </div>
              <div>
                <SoundCloudIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Link href={`/artists/${item.id}`} className="btn btn-primary">
              Request playlist
            </Link>
            <Link href={`/artists/${item.id}`} className="btn btn-ghost">
              Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden relative rounded-2xl flex flex-col justify-between h-full group/card",
        "bg-gradient-to-b from-white/[0.02] to-white/[0.01] border border-white/5",
        "hover:border-white/10 hover:shadow-[0_8px_40px_-10px_rgba(0,0,0,0.5)] transition-all"
      )}
    >
      {/* image */}
      <div className="relative rounded-t-2xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={500}
          className="h-full w-full object-cover transform-gpu group-hover/card:scale-105 transition-transform duration-500"
        />
        {!isDefault && (
          <div className="absolute top-0 left-0 z-20">
            <Crown index={index} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 w-[85%] h-10 rounded-full bg-white/30 blur-3xl opacity-80" />
      </div>

      {/* content */}
      <div className="relative">
        <div className="px-4 pt-4 pb-2 text-center space-y-1">
          <p className="text-[16px] font-bold uppercase font-logam tracking-wide">
            {item.name}
          </p>
          <p className="text-sm text-muted">{item.designation}</p>
        </div>

        <div className="flex flex-col gap-3 mb-2 px-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] bg-white/10 border border-white/10 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 px-1">
            <div className="flex items-center gap-1">
              <Star className="w-[14px] h-[14px]" />
              <p className="text-sm">{item.rating}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-greeniest">{item.eta}h</span>
              <span className="text-sm text-muted/80">{item.slotsLeft} slots left</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full pt-3 px-5">
            <div className="flex items-baseline gap-2">
              <p
                className={cn(
                  "text-light text-[18px] font-logam",
                  item.oldPrice && "text-greeniest"
                )}
              >
                ${item.price} {!item.oldPrice && "+"}
              </p>
              {item.oldPrice && (
                <p className="text-muted line-through">${item.oldPrice}+</p>
              )}
            </div>

            <div className="flex items-center gap-1 opacity-90">
              <YTMusicIcon className="w-5 h-5" />
              <SpotifyIcon className="w-5 h-5" />
              <AppleMusicIcon className="w-5 h-5" />
              <SoundCloudIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="mb-4 mt-3 w-full sm:w-auto sm:justify-start justify-center flex sm:flex-row flex-col gap-2 sm:px-0 px-3">
            <Link
              href={`/artists/${item.id}`}
              className="text-center sm:text-left px-3 py-2 rounded btn-primary"
            >
              Request playlist
            </Link>
            <Link
              href={`/artists/${item.id}`}
              className="text-center sm:text-left px-3 py-2 rounded btn-ghost"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -z-10 inset-0 blur-3xl opacity-40 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.12),transparent_70%)]" />
    </div>
  );
};

export default ArtistCard;
