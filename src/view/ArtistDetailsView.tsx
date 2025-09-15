"use server";

import {
  ArtistIntroVideo,
  // ArtistPricingTier,
  ArtistWhatOffer,
  Review,
} from "@/components";
import { reviewData } from "@/constants";
import {
  AppleMusicIcon,
  InstagramIcon,
  SoundCloudIcon,
  SpotifyIcon,
  StarIcon,
  TiktokIcon,
  YTMusicIcon,
} from "@/icons";
import { GlobeIcon, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AddOrRemoveArtistToFav from "@/components/dashboard/artist/AddOrRemoveArtistToFav";
import { IArtist } from "@/interface";
import { baseUrl } from "@/redux/api/api";
import { businessAvatarFallback } from "@/constants/fallBack";

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
    introVideo,
    socials,
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
                src={avatar || businessAvatarFallback}
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

              <ArtistIntroVideo introVideo={introVideo} />

              <p className="text-sm text-white/75 mt-2">{bio}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {genre?.map((g) => (
                <span
                  key={g._id}
                  className="text-[12px] bg-white/10 border border-white/10 rounded-full px-3 py-1"
                >
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

              <div className="flex items-center gap-1 opacity-90 mt-2">
                <span className="footer-social-link">
                  <YTMusicIcon className="w-5 h-5" />
                </span>
                <span className="footer-social-link">
                  <SpotifyIcon className="w-5 h-5" />
                </span>
                <span className="footer-social-link">
                  <AppleMusicIcon className="w-5 h-5" />
                </span>
                <span className="footer-social-link">
                  <SoundCloudIcon className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 mb-[20px]">
              {country && <span className="chip">{country}</span>}
              {/* {timeZone && <span className="chip">{timeZone}</span>} */}
              {/* {language && <span className="chip">{language}</span>} */}
            </div>

            {/* connect with me */}
            <div>
              <h3 className="mb-4">Connect with me</h3>
              <ul className="flex gap-3 text-light/90">
                {/* spotify */}
                <li className="inline-flex items-center gap-2">
                  <Link
                    className="hover:text-brand-4/70 transition-all duration-300 flex items-center gap-2"
                    href={socials.spotify}
                    target="_blank"
                  >
                    <SpotifyIcon className="max-h-5 max-w-5 w-full h-full" />
                    Spotify
                  </Link>
                </li>
                {/* youtube */}
                <li className="inline-flex items-center gap-2">
                  <Link
                    className="hover:text-brand-4/70 transition-all duration-300 flex items-center gap-2"
                    href={socials.youtube}
                    target="_blank"
                  >
                    <Youtube className="max-h-5 max-w-5 w-full h-full" />
                    Youtube
                  </Link>
                </li>
                {/* instagram */}
                <li className="inline-flex items-center gap-2">
                  <Link
                    className="hover:text-brand-4/70 transition-all duration-300 flex items-center gap-2"
                    href={socials.instagram}
                    target="_blank"
                  >
                    <InstagramIcon className="max-h-5 max-w-5 w-full h-full" />
                    Instagram
                  </Link>
                </li>
                {/* tiktok */}
                <li className="inline-flex items-center gap-2">
                  <Link
                    className="hover:text-brand-4/70 transition-all duration-300 flex items-center gap-2"
                    href={socials.tiktok}
                    target="_blank"
                  >
                    <TiktokIcon className="max-h-5 max-w-5 w-full h-full" />
                    Tiktok
                  </Link>
                </li>
                {/* website */}
                <li className="inline-flex items-center gap-2">
                  <Link
                    className="hover:text-brand-4/70 transition-all duration-300 flex items-center gap-2"
                    href={socials.website}
                    target="_blank"
                  >
                    <GlobeIcon className="max-h-4.5 max-w-4.5 w-full h-full" />
                    Website
                  </Link>
                </li>
              </ul>
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

            <ArtistWhatOffer />
          </aside>
        </div>
      </section>

      {/* Pricing tiers */}
      {/* <ArtistPricingTier userName={userName} /> */}

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
