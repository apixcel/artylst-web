"use server";

import { ArtistIntroVideo, ArtistPricingTier, Review } from "@/components";
import { reviewData } from "@/constants";
import { TiktokIcon } from "@/icons";
import {
  Check,
  HeadphonesIcon,
  Instagram,
  Link2,
  Music4,
  MusicIcon,
  Star,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IArtist } from "@/interface";
import { baseUrl } from "@/redux/api/api";

const ArtistDetailsView = async ({ userName }: { userName: string }) => {
  const res = await fetch(`${baseUrl}/artist/profile/${userName}`, {
    cache: "no-store",
  });
  const data = (await res.json()) as { data: IArtist };
  const artist = data?.data || {};

  const {
    genre,
    displayName,
    designation,
    avgRating,
    reviewCount,
    minStartingPrice,
    eta,
    slotsLeft,
    avatar,
    coverPhoto,
    platforms,
    introVideo,
    introThumbnail,
    bio,
    country,
  } = artist || {};

  return (
    <>
      <section className="grid xl:grid-cols-[1fr_380px] gap-4">
        <div className="bg-gradient-to-b from-brand-2/10 to-brand-1/10 rounded-[12px] border border-white/10 flex flex-col backdrop-blur-2xl">
          <div className="relative mb-10">
            <div className="h-48 md:h-64 w-full z-30 overflow-hidden rounded-t-[12px]">
              <Image
                src={coverPhoto || "/images/artists/artist-bg-img-1.jpg"}
                alt="Artist Cover Photo"
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Avatar */}
            <div className="h-40 w-40 sm:h-44 sm:w-44 rounded-full border border-white/15 overflow-hidden absolute left-0 -bottom-20 !z-[9999999]">
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
              {designation} • {genre?.map((g) => g.slug).join(" • ")}. Crafting mood‑based
              sets for workout, study, and feel‑good moments.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {genre?.map((g) => (
                <span className="chip" key={g._id}>
                  {g.slug.charAt(0).toUpperCase() + g.slug.slice(1)}
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

          {/* about me */}
          <div className="px-4 lg:w-1/2">
            <h2>About me</h2>
            {/* bio */}
            <p className="text-sm text-white/75 mt-2">{bio}</p>

            {/* tags */}
            <div className="mt-3 flex flex-wrap gap-2 mb-[20px]">
              {country && <span className="chip">{country}</span>}
              {/* {timeZone && <span className="chip">{timeZone}</span>} */}
              {/* {language && <span className="chip">{language}</span>} */}
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
        </div>

        <div className="">
          {/* Quick actions */}
          <aside className="flex sm:flex-row flex-col xl:flex-col justify-between gap-4">
            <div className="card xl:w-full w-full sm:w-1/2 p-4">
              <div className="font-heading text-sm">Delivery window</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="chip justify-center">24h</div>
                <div className="chip justify-center">48h</div>
                <div className="chip justify-center">72h</div>
              </div>
            </div>

            <div className="xl:w-full w-full sm:w-1/2">
              <div>
                <h4 className="text-lg font-semibold mb-2">What I Offer</h4>

                {/* Personal Playlist Features */}
                <div className="mb-4 card p-4">
                  <h5 className="font-medium mb-2 flex items-center gap-2 ">
                    <HeadphonesIcon className="w-5 h-5" /> Personal Playlist
                  </h5>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted">
                    <li>Customized to your mood & taste</li>
                    <li>Handpicked by top artists</li>
                    <li>Perfect for daily listening</li>
                  </ul>
                  <Link
                    href={`/artists/${userName}/book`}
                    className="btn btn-primary w-full mt-3"
                  >
                    Request Personal Playlist
                  </Link>
                </div>

                {/* Business Playlist Features */}
                <div className="card p-4">
                  <h5 className="font-medium mb-2 flex items-center gap-2 ">
                    <MusicIcon className="w-5 h-5" /> Business Playlist
                  </h5>
                  <ul className="text-sm space-y-1 text-muted">
                    <li className="flex gap-2">
                      <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Curated for
                      restaurants, cafés & events
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Enhance your
                      brand identity with music
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Licensed & ready
                      for commercial use
                    </li>
                  </ul>
                  <Link
                    href={`/artists/${userName}/checkout`}
                    className="btn btn-primary w-full mt-3"
                  >
                    Request Business Playlist
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pricing tiers */}
      <ArtistPricingTier userName={userName} />

      <section className="mb-[30px]">
        {/* sample vibes I love */}
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
