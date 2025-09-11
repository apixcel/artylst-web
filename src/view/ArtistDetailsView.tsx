"use server";

import { ArtistPricingTier, Review } from "@/components";
import { reviewData } from "@/constants";
import {
  AppleMusicIcon,
  SoundCloudIcon,
  SpotifyIcon,
  StarIcon,
  TiktokIcon,
  YTMusicIcon,
} from "@/icons";
import {
  Check,
  HeadphonesIcon,
  Instagram,
  Link2,
  MegaphoneIcon,
  Music4,
  MusicIcon,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AddOrRemoveArtistToFav from "@/components/dashboard/artist/AddOrRemoveArtistToFav";
import { IArtist } from "@/interface";
import { baseUrl } from "@/redux/api/api";

const ArtistDetailsView = async ({ userName }: { userName: string }) => {
  const res = await fetch(`${baseUrl}/artist/profile/${userName}`, {
    cache: "no-store",
    credentials: "include",
  });
  const data = (await res.json()) as { data: IArtist };
  const artist = data?.data || {};

  const {
    genre,
    displayName,
    designation,
    avgRating,
    reviewCount,
    eta,
    slotsLeft,
    avatar,
    coverPhoto,
    platforms,
    bio,
    country,
  } = artist || {};

  return (
    <>
      <section className="grid xl:grid-cols-[1fr_380px] items-start gap-6 mb-[40px]">
        <div className="bg-gradient-to-b from-brand-2/10 to-brand-1/10 rounded-[12px] border border-white/10 flex flex-col backdrop-blur-2xl">
          <div className="relative mb-[60px]">
            <div className="h-48 md:h-[220px] w-full z-30 overflow-hidden rounded-t-[12px] relative">
              <Image
                src={coverPhoto || "/images/artists/artist-bg-img-1.jpg"}
                alt="Artist Cover Photo"
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-center"
              />
              <AddOrRemoveArtistToFav
                artist={artist}
                className="absolute top-3 right-3"
              />
            </div>
            {/* Avatar */}
            <div className="h-30 w-30 sm:h-[160px] sm:w-[160px] rounded-full border border-white/15 overflow-hidden absolute left-[25px] -bottom-[45px] !z-[9999999]">
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
          <div className="px-[25px] pb-[20px]">
            <div className="">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl">{displayName}</h1>

                <div className="inline-flex items-center gap-2">
                  <span className="chip h-6 bg-mario-coin/15 border border-mario-coin/40">
                    <StarIcon className="w-5 h-5 text-gold" /> <span>{avgRating}</span> (
                    {reviewCount})
                  </span>
                  <span className="chip h-6 bg-brand-4/10 border border-brand-4/40">
                    {eta}h ETA
                  </span>
                  <span className="chip h-6 bg-brand-6/20 border border-brand-6/40">
                    {slotsLeft} slots left
                  </span>
                </div>
              </div>

              <p className="text-[16px] mb-[6px]">{designation || "Designation"}</p>

              <Link className="text-brand-4" href={""}>
                Video Introduction
              </Link>

              <p className="text-sm text-white/75 mt-2">{bio}</p>
            </div>

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
              <div className="flex flex-wrap items-center gap-2 text-xs opacity-80">
                {platforms?.map((p) => (
                  <span className="chip" key={p}>
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 opacity-90">
                <span className="bg-brand-4/20 rounded-full p-1">
                  <YTMusicIcon className="w-5 h-5" />
                </span>
                <span className="bg-brand-4/20 rounded-full p-1">
                  <SpotifyIcon className="w-5 h-5" />
                </span>
                <span className="bg-brand-4/20 rounded-full p-1">
                  <AppleMusicIcon className="w-5 h-5" />
                </span>
                <span className="bg-brand-4/20 rounded-full p-1">
                  <SoundCloudIcon className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 mb-[20px]">
              {country && <span className="chip">{country}</span>}
              {/* {timeZone && <span className="chip">{timeZone}</span>} */}
              {/* {language && <span className="chip">{language}</span>} */}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="">
          {/* Quick actions */}
          <aside className="flex sm:flex-row flex-col xl:flex-col justify-between gap-4">
            {/* Delivery window */}
            <div className="card xl:w-full w-full sm:w-1/2 p-4">
              <div className="font-heading text-sm">Delivery window</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="chip justify-center">24h</div>
                <div className="chip justify-center">48h</div>
                <div className="chip justify-center">72h</div>
              </div>
            </div>

            <div className="xl:w-full w-full sm:w-1/2">
              {/* What I Offer */}
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
                <div className="card p-4 mb-4">
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

                {/* Looking for more features */}
                <div className="card p-4">
                  <h5 className="font-medium mb-2 flex items-center gap-2 ">
                    <MegaphoneIcon className="w-5 h-5" /> Looking for more?
                  </h5>

                  <p className="text-sm space-y-1 text-muted">
                    We can help you with more features. Just let us know what you need.
                  </p>
                  <Link href={`/business/contact`} className="btn btn-ghost w-full mt-3">
                    Request More Features
                  </Link>
                </div>
              </div>
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
