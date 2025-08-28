"use client";

import React from "react";
import Link from "next/link";
import { Heart, MessageSquare, Flame, Eye, BadgeCheck } from "lucide-react";

export type DashboardArtistCardProps = {
  // Core identity
  id: number | string;
  name: string;
  handle: string;
  img: string;

  // Meta
  tags?: string[];
  platform?: "Spotify" | "Apple Music" | "YouTube Music" | string;
  price?: number; // e.g. 99
  eta?: string; // e.g. "2–3d"
  rating?: number; // e.g. 4.8
  accepting?: boolean; // true = Accepting, false = Waitlist

  // Badges & metrics
  recommended?: boolean;
  popular?: boolean;
  views?: number; // For "Most browsed"
  orders?: number; // Total orders

  // Actions (if href not given, button hides automatically)
  hrefView?: string; // e.g. `/artists/${handle}`
  hrefRequest?: string; // e.g. `/orders/new?artist=${handle}`
  hrefMessage?: string; // e.g. `/messages?to=${handle}`

  // Favorite logic (optional)
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
  onRemove?: () => void; // For Favorites page "remove/unfavorite"

  // Layout controls
  variant?: "default" | "horizontal" | "compact";
  className?: string;

  // Right-corner metric chip (auto if not provided: shows views>orders>rating)
  metricLabel?: React.ReactNode;
  metricIcon?: React.ReactNode;
};

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

export default function DashboardArtistCard({
  id,
  name,
  handle,
  img,
  tags = [],
  platform,
  price,
  eta,
  rating,
  accepting = true,
  recommended,
  popular,
  views,
  orders,
  hrefView,
  hrefRequest,
  hrefMessage,
  isFavorited,
  onFavoriteToggle,
  onRemove,
  variant = "default",
  className = "",
  metricLabel,
  metricIcon,
}: DashboardArtistCardProps) {
  // Auto metric if not explicitly provided
  const autoMetric =
    metricLabel ??
    (typeof views === "number" ? (
      <>
        {metricIcon ?? <Eye className="h-3.5 w-3.5" />} {views}
      </>
    ) : typeof orders === "number" ? (
      <>
        ★ {rating ?? "—"} • {orders} orders
      </>
    ) : typeof rating === "number" ? (
      <>★ {rating}</>
    ) : null);

  const container = variant === "horizontal" ? "flex gap-4 items-stretch" : "block";

  const imageWrap =
    variant === "horizontal"
      ? "relative w-40 shrink-0 rounded-xl overflow-hidden"
      : "relative h-40 rounded-xl overflow-hidden";

  return (
    <div
      className={`group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition ${className}`}
      data-id={id}
    >
      <div className={container}>
        {/* Image / Cover */}
        <div className={imageWrap}>
          <div className={`absolute inset-0 bg-[url(${img})] bg-cover bg-center`} />

          {/* Bottom gradient with name/handle (skip for compact?) */}
          {variant !== "compact" && (
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <div className="font-heading">{name}</div>
              <div className="text-xs text-white/70">@{handle}</div>
            </div>
          )}

          {/* Badges (top-left) */}
          <div className="absolute top-2 left-2 flex gap-2">
            {recommended && <Chip className="bg-white/10">Recommended</Chip>}
            {popular && (
              <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 inline-flex items-center gap-1">
                <Flame className="h-3.5 w-3.5" /> Popular
              </Chip>
            )}
          </div>

          {/* Top-right overlay actions (hover) */}
          {(onFavoriteToggle || hrefMessage || onRemove) && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              {onFavoriteToggle && (
                <button
                  className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 grid place-items-center"
                  title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  onClick={onFavoriteToggle}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                </button>
              )}
              {hrefMessage && (
                <Link
                  href={hrefMessage}
                  className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 grid place-items-center"
                  title="Message"
                >
                  <MessageSquare className="h-4 w-4" />
                </Link>
              )}
              {onRemove && (
                <button
                  className="h-8 px-3 rounded-full bg-black/50 backdrop-blur border border-white/10 text-xs"
                  title="Remove"
                  onClick={onRemove}
                >
                  Remove
                </button>
              )}
            </div>
          )}

          {/* Right-top metric chip (views/orders/rating) */}
          {autoMetric && (
            <div className="absolute top-2 right-2 text-[11px] px-2 py-0.5 rounded-full bg-black/60 border border-white/10 inline-flex items-center gap-1">
              {autoMetric}
            </div>
          )}
        </div>

        {/* Body */}
        <div className={variant === "horizontal" ? "flex-1 min-w-0" : "mt-3"}>
          {/* Title & handle for compact/horizontal (when not already drawn over image) */}
          {(variant === "compact" || variant === "horizontal") && (
            <div className="mb-1">
              <div className="font-heading">{name}</div>
              <div className="text-xs text-white/70">@{handle}</div>
            </div>
          )}

          {/* Tags & status */}
          {!!tags?.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.slice(0, variant === "compact" ? 2 : 3).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              {typeof accepting === "boolean" &&
                (accepting ? (
                  <Chip className="bg-green-500/10 text-green-400 border-green-500/20">
                    Accepting
                  </Chip>
                ) : (
                  <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    Waitlist
                  </Chip>
                ))}
            </div>
          )}

          {/* Sub-meta */}
          {(eta || platform) && (
            <div className="mt-2 text-xs text-white/60">
              {eta ? <>Avg. ETA: {eta}</> : null}
              {eta && platform ? " • " : null}
              {platform ? <>{platform}</> : null}
            </div>
          )}

          {/* Price + rating/orders row */}
          {(typeof price === "number" ||
            typeof rating === "number" ||
            typeof orders === "number") && (
            <div className="mt-2 text-sm flex items-center justify-between">
              <div>
                {typeof price === "number" && (
                  <>
                    <div className="text-white/70">Standard</div>
                    <div className="font-heading">${price}</div>
                  </>
                )}
              </div>
              <div className="text-xs text-white/60">
                {typeof rating === "number" ? <>★ {rating}</> : null}
                {typeof rating === "number" && typeof orders === "number" ? " • " : null}
                {typeof orders === "number" ? <>{orders} orders</> : null}
              </div>
            </div>
          )}

          {/* CTAs */}
          {(hrefView || hrefRequest) && (
            <div className={`mt-3 flex gap-2 ${variant === "horizontal" ? "" : ""}`}>
              {hrefView && (
                <Link
                  href={hrefView}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
                >
                  View
                </Link>
              )}
              {hrefRequest && (
                <Link
                  href={hrefRequest}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-sm text-center"
                >
                  Request
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer helper (optional example; keep API but not used here)
          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 flex items-start gap-2">
            <BadgeCheck className="h-4 w-4 text-green-400 mt-0.5" />
            <div className="text-xs text-white/70">
              Private playlist + 30s auth video included
            </div>
          </div>
      */}
    </div>
  );
}
