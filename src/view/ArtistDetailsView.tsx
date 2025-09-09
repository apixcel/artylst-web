"use client";

import { ArtistIntroVideo, Review } from "@/components";
import { artistPricingData, reviewData } from "@/constants";
import { TiktokIcon } from "@/icons";
import { useGetArtistProfileByUserNameQuery } from "@/redux/features/artist/artist.api";
import { cn } from "@/utils";
import { Check, Instagram, Link2, Music4, Star, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ArtistDetailsView = ({ userName }: { userName: string }) => {
  const { data: artistProfile } = useGetArtistProfileByUserNameQuery({ userName });
  const artist = artistProfile?.data || null;
  console.log(artist);
  const {
    genre,
    displayName,
    designation,
    avgRating,
    reviewCount,
    minStartingPrice,
    pricingTierCount,
    eta,
    slotsLeft,
    avatar,
    coverPhoto,
    platforms,
    introVideo,
    introThumbnail,
  } = artist || {};

  return (
    <>
      <section className="px-4 py-6">
        <div className="bg-gradient-to-b from-brand-2/10 to-brand-1/10 rounded-[12px] border border-white/10 overflow-hidden flex flex-col backdrop-blur-2xl">
          <div className="h-48 md:h-64 w-full bg-white/5 border-b border-white/10 text-white/60 overflow-hidden">
            <Image
              src={coverPhoto || "/images/artists/artist-bg-img-1.jpg"}
              alt="Artist Avatar"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-4 md:p-6 grid xl:grid-cols-[180px_1fr_280px] gap-6 items-start h-full">
            {/* Avatar */}
            <div className="sm:flex gap-4 h-full">
              <div className="h-40 w-40  mt-0 sm:h-44 sm:w-44 rounded-full border border-white/15 overflow-hidden">
                <Image
                  src={avatar || "/images/artists/artist-img-1.avif"}
                  alt="Artist Avatar"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio + badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl">{displayName}</h1>
                <span className="chip flex items-center gap-1 text-[11px] bg-mario-coin/15 border border-mario-coin/40">
                  <Star className="w-3 h-3 text-gold" /> <span>{avgRating}</span> (
                  {reviewCount})
                </span>
                <span className="chip bg-brand-4/10 border border-brand-4/40 text-[11px]">
                  {eta}h ETA
                </span>
                <span className="chip bg-brand-6/20 border border-brand-6/40 text-[11px]">
                  {slotsLeft} slots left
                </span>
              </div>

              <p className="mt-2 text-muted">
                {designation} • {genre?.map((g) => g.slug).join(" • ")}. Crafting
                mood‑based sets for workout, study, and feel‑good moments.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {genre?.map((g) => (
                  <span className="chip" key={g._id}>
                    {g.slug}
                  </span>
                ))}
              </div>

              {/* Platforms */}
              <div className="mt-3">
                <h4>Platforms:</h4>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs opacity-80">
                  {platforms?.map((p) => (
                    <span className="chip" key={p}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Intro video */}
              <div className="mt-5 p-3">
                <ArtistIntroVideo srcMp4={introVideo} poster={introThumbnail} />
                <p className="text-xs text-muted mt-2">
                  Intro: who I am &amp; how I curate your playlist.
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <aside className="flex sm:flex-row flex-col xl:flex-col justify-between gap-4">
              <div className="card xl:w-full w-full sm:w-1/2 p-4">
                <div className="text-sm text-muted">Starting from</div>
                <div className="text-2xl font-heading mt-1">${minStartingPrice}</div>
                <Link href="/artists/1/book" className="btn btn-primary w-full mt-3">
                  Request playlist
                </Link>
                <div className="text-xs text-white/60 mt-2">
                  Private link + 30s auth video. Privacy-first escrow.
                </div>
              </div>

              <div className="card xl:w-full w-full sm:w-1/2 p-4">
                <div className="font-heading text-sm">Delivery window</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div className="chip justify-center">24h</div>
                  <div className="chip justify-center">48h</div>
                  <div className="chip justify-center">72h</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="px-4 py-4 mb-[40px]">
        <h2 className="mb-3">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-4">
          {artistPricingData.map((tier, index) => (
            <div
              key={tier.id}
              className={cn(
                "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col",
                index === 0 && "lg:col-span-1 sm:col-span-2 col-span-1",
                index === 1 && "lg:col-span-1 sm:col-span-2 col-span-1",
                index === 2 && "lg:col-span-1 sm:col-span-2 col-span-1 sm:col-start-2"
              )}
            >
              <div>
                <h4 className="text-[16px] text-muted text-center uppercase mb-3">
                  {tier.name}
                </h4>
                <h3 className="text-2xl mb-6">${tier.price}</h3>
              </div>

              <ul className="text-muted space-y-1.5 mb-[20px]">
                {tier.description.map((description) => (
                  <li className="flex gap-2 text-left" key={description}>
                    <Check className="w-4 h-4 text-brand-4/80" />
                    {description}
                  </li>
                ))}
              </ul>
              <Link
                href={`/artists/${artist?.userName}/checkout`}
                className={`btn mt-auto ${tier.name === "Standard" ? "btn-primary" : "btn-tertiary"} w-full mt-4`}
              >
                Choose {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="lg:flex-row flex-col flex gap-6 mb-[30px]">
        {/* sample vibes I love */}
        <div className="lg:w-1/2">
          <h2>Sample vibes I love</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Image
                src="/images/artists/artist-vibe-img-1.jpg"
                alt="Artist Avatar"
                width={460}
                height={460}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Image
                src="/images/artists/artist-vibe-img-1.jpg"
                alt="Artist Avatar"
                width={460}
                height={460}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Image
                src="/images/artists/artist-vibe-img-1.jpg"
                alt="Artist Avatar"
                width={460}
                height={460}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Image
                src="/images/artists/artist-vibe-img-1.jpg"
                alt="Artist Avatar"
                width={460}
                height={460}
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* about me */}
        <div className="px-4 lg:w-1/2">
          <h2>About me</h2>
          {/* bio */}
          <p className="text-sm text-white/75 mt-2">
            Touring vocalist &amp; curator. I build sequences that flow naturally—no hard
            jumps. Expect tasteful discoveries alongside your must‑haves.
          </p>

          {/* tags */}
          <div className="mt-3 flex flex-wrap gap-2 mb-[20px]">
            <span className="chip">Los Angeles</span>
            <span className="chip">GMT‑7</span>
            <span className="chip">English</span>
          </div>

          {/* connect with me */}
          <div>
            <h3 className="mb-4">Connect with me</h3>
            <ul className="flex flex-col gap-3 text-light/90">
              {/* spotify */}
              <li className="inline-flex items-center gap-2">
                <Music4 className="max-h-5 max-w-5 w-full h-full" />
                Spotify:
                <Link
                  className="text-muted hover:text-brand-4/70 transition-all duration-300 truncate"
                  href="https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw"
                  target="_blank"
                >
                  https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw
                </Link>
              </li>
              {/* youtube */}
              <li className="inline-flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                YT Music:
                <Link
                  className="text-muted hover:text-brand-4/70 transition-all duration-300"
                  href="https://www.youtube.com"
                  target="_blank"
                >
                  https://www.youtube.com
                </Link>
              </li>
              {/* instagram */}
              <li className="inline-flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                Instagram:
                <Link
                  className="text-muted hover:text-brand-4/70 transition-all duration-300"
                  href="https://www.instagram.com"
                  target="_blank"
                >
                  https://www.instagram.com
                </Link>
              </li>
              {/* tiktok */}
              <li className="inline-flex items-center gap-2">
                <TiktokIcon className="h-5 w-5" />
                TikTok:
                <Link
                  className="text-muted hover:text-brand-4/70 transition-all duration-300"
                  href="https://www.tiktok.com"
                  target="_blank"
                >
                  https://www.tiktok.com
                </Link>
              </li>
              {/* website */}
              <li className="inline-flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Website:
                <Link
                  className="text-muted hover:text-brand-4/70 transition-all duration-300"
                  href="https://www.example.com"
                  target="_blank"
                >
                  https://www.example.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 pb-12">
        <h2 className="text-xl mb-3">Recent reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviewData.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ArtistDetailsView;
