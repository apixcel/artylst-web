"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Building2,
  Store,
  Dumbbell,
  Briefcase,
  Coffee,
  ShieldCheck,
  AlertTriangle,
  Link as LinkIcon,
} from "lucide-react";

// ------------------------------------------------------------
// Demo data (replace with your API fetch using `slug`)
// ------------------------------------------------------------
type ArtistTier = {
  key: string;
  label: string;
  length: string;
  price: number;
};

type ArtistSample = {
  title: string;
  img: string;
};

type Artist = {
  id: number;
  slug: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  tags: string[];
  industries: string[];
  platform: string;
  accepting: boolean;
  businessFriendly: boolean;
  avgETA: string;
  completion: number;
  rating: number;
  repeat: number;
  tiers: ArtistTier[];
  samples: ArtistSample[];
};

const ARTISTS: Record<string, Artist> = {
  sloane: {
    id: 101,
    slug: "sloane",
    name: "Sloane Rivers",
    handle: "sloane",
    avatar: "https://i.pravatar.cc/300?img=44",
    banner:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Lo‑fi", "Chill", "Focus"],
    industries: ["Hospitality", "Wellness", "Corporate"],
    platform: "Spotify",
    accepting: true,
    businessFriendly: true,
    avgETA: "2–3d",
    completion: 98,
    rating: 4.9,
    repeat: 62,
    tiers: [
      { key: "mini", label: "Mini", length: "~45 min", price: 59 },
      { key: "standard", label: "Standard", length: "~90 min", price: 99 },
      { key: "deluxe", label: "Deluxe", length: "~2 hrs", price: 149 },
    ],
    samples: [
      {
        title: "Morning Lo‑fi",
        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Chill Workspace",
        img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Focus Deep",
        img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
};

// ------------------------------------------------------------
// Small UI helpers
// ------------------------------------------------------------
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
  <div className={`rounded-2xl p-6 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);

// ------------------------------------------------------------
// Page (Business-focused Artist Detail)
// ------------------------------------------------------------
const BusinessArtistDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "sloane";
  const artist = useMemo(() => ARTISTS[slug] || ARTISTS.sloane, [slug]);

  // Brief form state
  const [tier, setTier] = useState<string>(artist.tiers[1].key); // default Standard
  const [industry, setIndustry] = useState("Hospitality");
  const [platform, setPlatform] = useState(artist.platform);
  const [occasion, setOccasion] = useState("Morning café playlist");
  const [vibes, setVibes] = useState<string[]>([...artist.tags.slice(0, 2)]);
  const [locations, setLocations] = useState(1);
  const [explicit, setExplicit] = useState(false);
  const [notes, setNotes] = useState("");

  const selectedTier = artist.tiers.find((t) => t.key === tier);

  const toggleVibe = (v: string) => {
    setVibes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const onSubmitBrief = () => {
    // Navigate to order create with prefilled params
    const query = new URLSearchParams({
      artist: artist.slug,
      tier,
      industry,
      platform,
      occasion,
      vibes: vibes.join(","),
      locations: String(locations),
      explicit: String(explicit),
    }).toString();
    router.push(`/orders/new?${query}`);
  };

  return (
    <section className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Link
          href="/business/artists"
          className="inline-flex items-center gap-1 underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to artists
        </Link>
        <span>•</span>
        <span>Business view</span>
      </div>

      {/* Header banner */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <div
          className="h-40 md:h-56 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.banner})` }}
        />
        <div className="p-5 md:p-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-start gap-4">
          <div
            className="h-16 w-16 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${artist.avatar})` }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-heading truncate">{artist.name}</h1>
              {artist.businessFriendly && <Chip>Business‑friendly</Chip>}
              {artist.accepting ? (
                <Chip className="bg-green-500/10 text-green-400 border-green-500/20">
                  Accepting
                </Chip>
              ) : (
                <Chip className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Waitlist
                </Chip>
              )}
            </div>
            <div className="mt-1 text-sm text-white/70">
              @{artist.handle} • {artist.platform} • Avg. ETA {artist.avgETA}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span>✅ Completion {artist.completion}%</span>
              <span>★ {artist.rating}</span>
              <span>↻ {artist.repeat}% repeat</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {artist.tags.map((t: string) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <Link
              href={`/messages?to=${artist.handle}`}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" /> Message
            </Link>
            <button
              onClick={onSubmitBrief}
              className="px-3 py-2 rounded-lg bg-brand-500 text-sm"
            >
              Create brief
            </button>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tiers & commercial terms */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="font-heading">Pricing & tiers</div>
              <div className="text-sm text-white/70">Commercial use allowed</div>
            </div>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {artist.tiers.map(
                (t: { key: string; label: string; price: number; length: string }) => (
                  <button
                    key={t.key}
                    onClick={() => setTier(t.key)}
                    className={`rounded-xl p-4 border transition text-left ${
                      tier === t.key
                        ? "bg-white/10 border-white/20"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm text-white/70">{t.label}</div>
                    <div className="text-lg font-heading">${t.price}</div>
                    <div className="text-xs text-white/60 mt-1">{t.length}</div>
                  </button>
                )
              )}
            </div>
            <div className="mt-3 text-xs text-white/60 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Escrow until delivery
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Typical ETA {artist.avgETA}
              </span>
              <span className="inline-flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Revisions within 72h
              </span>
            </div>
          </Card>

          {/* Samples / teasers */}
          <Card>
            <div className="font-heading">Teaser playlists</div>
            <div className="grid md:grid-cols-3 gap-3 mt-3">
              {artist.samples.map(
                (
                  s: {
                    img: string;
                    title: string;
                    url?: string;
                  },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-white/10"
                  >
                    <div
                      className="relative h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url(${s.img})` }}
                    >
                      <div className="absolute inset-0 grid place-items-center bg-black/20">
                        <button className="h-9 w-9 grid place-items-center rounded-full bg-black/60 border border-white/10">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-3 text-sm flex items-center justify-between">
                      <div>{s.title}</div>
                      <a
                        href="#"
                        className="underline text-xs inline-flex items-center gap-1"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        Open
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Case fit / Industries */}
          <Card>
            <div className="font-heading">Best fit</div>
            <div className="mt-2 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-white/70">
                  <Coffee className="h-4 w-4" /> Hospitality
                </div>
                <div className="mt-1">Morning lo‑fi, brunch sets, evening chill.</div>
              </div>
              <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-white/70">
                  <Briefcase className="h-4 w-4" /> Corporate / Workspace
                </div>
                <div className="mt-1">Focus‑friendly playlists with low distraction.</div>
              </div>
            </div>
          </Card>

          {/* Similar artists */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="font-heading">Similar artists</div>
              <Link href="/business/artists" className="text-sm text-white/70 underline">
                See all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {[57, 65, 23].map((n) => (
                <Link
                  key={n}
                  href={`/business/artists/sloane`}
                  className="rounded-xl p-3 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <div
                    className={`h-28 rounded-lg bg-[url(https://i.pravatar.cc/300?img=${n})] bg-cover`}
                  />
                  <div className="mt-2 text-sm font-heading">Artist {n}</div>
                  <div className="text-xs text-white/60">Lo‑fi • Chill</div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column (sticky brief form) */}
        <aside className="space-y-4 lg:sticky lg:top-4 h-max">
          <Card>
            <div className="font-heading">Create a brief</div>
            <div className="mt-3 grid gap-3 text-sm">
              <div>
                <div className="text-white/60 mb-1">Tier</div>
                <select
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                >
                  {artist.tiers.map(
                    (t: {
                      key: string;
                      label: string;
                      price: number;
                      length: string;
                    }) => (
                      <option key={t.key} value={t.key} className="bg-[#0b0b0f]">
                        {t.label} — ${t.price} ({t.length})
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-white/60 mb-1">Industry</div>
                  <select
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    {[
                      "Hospitality",
                      "Fitness",
                      "Retail",
                      "Wellness",
                      "Corporate",
                      "Events",
                    ].map((i) => (
                      <option key={i} value={i} className="bg-[#0b0b0f]">
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Platform</div>
                  <select
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    {["Spotify", "Apple Music", "YouTube Music"].map((p) => (
                      <option key={p} value={p} className="bg-[#0b0b0f]">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="text-white/60 mb-1">Occasion</div>
                <input
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="e.g., Morning café playlist"
                />
              </div>

              <div>
                <div className="text-white/60 mb-1">Vibes</div>
                <div className="flex flex-wrap gap-2">
                  {artist.tags.map((v: string) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggleVibe(v)}
                      className={`px-3 py-1 rounded-full text-xs border ${vibes.includes(v) ? "bg-white/20 border-white/20" : "bg-white/5 border-white/10"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-white/60 mb-1">Locations</div>
                  <input
                    type="number"
                    min={1}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                    value={locations}
                    onChange={(e) => setLocations(Number(e.target.value) || 1)}
                  />
                </div>
                <label className="flex items-center gap-2 mt-6 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="accent-white/80"
                    checked={!explicit}
                    onChange={(e) => setExplicit(!e.target.checked)}
                  />
                  <span className="text-sm">Explicit filter</span>
                </label>
              </div>

              <div>
                <div className="text-white/60 mb-1">Notes for the artist</div>
                <textarea
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 min-h-[80px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tempo range, must‑include artists, avoid explicit, etc."
                />
              </div>

              <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-xs text-white/70">
                By continuing, you agree to LYSTN Terms. Payment is held in escrow until
                you receive a private playlist link and a 30s authentication video.
              </div>

              <button
                onClick={onSubmitBrief}
                className="w-full px-3 py-2 rounded-lg bg-brand-500"
                disabled={!selectedTier}
              >
                {selectedTier
                  ? `Request playlist — $${selectedTier.price}`
                  : "Select a tier"}
              </button>
              <div className="text-xs text-white/60 text-center">
                Typical delivery {artist.avgETA}. Revisions allowed within 72h.
              </div>
            </div>
          </Card>

          {/* Business tips */}
          <Card>
            <div className="font-heading mb-2">Business tips</div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Add store hours to get energy curves
                through the day.
              </li>
              <li className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" /> Ask for tempo bands for class blocks
                (e.g., Warm‑up 90–105, Peak 120–130).
              </li>
              <li className="flex items-center gap-2">
                <Store className="h-4 w-4" /> Enable explicit filter for family‑friendly
                venues.
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </section>
  );
};

export default BusinessArtistDetailPage;
