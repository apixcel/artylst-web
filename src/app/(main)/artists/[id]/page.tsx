import Link from "next/link";
import { Review } from "@/components";
import { reviewData } from "@/constants";
import Image from "next/image";

const SingleArtistPage = () => {
  return (
    <>
      <section className="px-4 py-6">
        <div className="card overflow-hidden flex flex-col">
          <div className="h-48 md:h-64 w-full bg-white/5 border-b border-white/10 text-white/60 overflow-hidden">
            <Image
              src="/images/artists/artist-bg-img-1.jpg"
              alt="Artist Avatar"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-4 md:p-6 grid xl:grid-cols-[180px_1fr_280px] gap-6 items-start h-full">
            {/* Avatar */}
            <div className="sm:flex gap-4 h-full">
              <div className="h-40 w-40  mt-0 sm:h-44 sm:w-44 rounded-2xl border border-white/15 overflow-hidden">
                <Image
                  src="/images/artists/artist-img-1.avif"
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
                <h1 className="text-2xl font-heading">Artist Name</h1>
                <span className="chip text-[11px]">★ 4.9 (1.2k)</span>
                <span className="chip text-[11px]">~48h ETA</span>
                <span className="chip text-[11px]">2 slots left</span>
              </div>

              <p className="mt-2 text-white/75 text-sm">
                Singer • Curator • Indie / Pop. Crafting mood‑based sets for workout,
                study, and feel‑good moments.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip">Lo‑fi</span>
                <span className="chip">Pop</span>
                <span className="chip">Chill</span>
                <span className="chip">Focus</span>
                <span className="chip">Workout</span>
              </div>

              {/* Platforms */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs opacity-80">
                <span className="chip">Spotify</span>
                <span className="chip">Apple Music</span>
                <span className="chip">YouTube Music</span>
                <span className="chip">EN</span>
                <span className="chip">BN</span>
              </div>

              {/* Intro video */}
              <div className="mt-5 card p-3">
                <div className="h-40 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
                  <video
                    src="/videos/artists/artist-video-intro.mp4"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Intro: who I am &amp; how I curate your playlist.
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <aside className="flex sm:flex-row flex-col xl:flex-col justify-between gap-4">
              <div className="card xl:w-full w-full sm:w-1/2 p-4">
                <div className="text-sm text-white/70">Starting from</div>
                <div className="text-2xl font-heading mt-1">$39</div>
                <Link href="checkout.html" className="btn btn-primary w-full mt-3">
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
      <section className="px-4 py-4">
        <h2 className="font-heading text-xl mb-3">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="text-sm text-white/70">Mini • 10–12 tracks</div>
            <div className="text-2xl font-heading mt-1">$39</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• Vibe match from your brief</li>
              <li>• Private playlist link</li>
              <li>• 30s authentication video</li>
            </ul>
            <Link href="/checkout" className="btn btn-ghost w-full mt-4">
              Choose Mini
            </Link>
          </div>

          <div className="card p-5 border-brand/40">
            <div className="text-sm text-white/70">Standard • 20–24 tracks</div>
            <div className="text-2xl font-heading mt-1">$59</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• Deeper curation &amp; transitions</li>
              <li>• Private playlist link</li>
              <li>• 30s authentication video</li>
            </ul>
            <Link href="/checkout" className="btn btn-primary w-full mt-4">
              Choose Standard
            </Link>
          </div>

          <div className="card p-5">
            <div className="text-sm text-white/70">Deep Dive • 35+ tracks</div>
            <div className="text-2xl font-heading mt-1">$99</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• Multi‑mood sections</li>
              <li>• 1 revision within 7 days</li>
              <li>• 30s authentication video</li>
            </ul>
            <Link href="/checkout" className="btn btn-ghost w-full mt-4">
              Choose Deep Dive
            </Link>
          </div>
        </div>
      </section>

      {/* Sample/Notes */}
      <section className="px-4 py-6 lg:flex-row flex-col flex gap-4">
        <div className="card p-5 lg:w-1/2">
          <h3 className="font-heading">Sample vibes I love</h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
            <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
              IMAGE PLACEHOLDER
            </div>
            <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
              IMAGE PLACEHOLDER
            </div>
            <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
              IMAGE PLACEHOLDER
            </div>
            <div className="h-24 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60">
              IMAGE PLACEHOLDER
            </div>
          </div>
        </div>

        <div className="card p-5 lg:w-1/2">
          <h3 className="font-heading">About me</h3>
          <p className="text-sm text-white/75 mt-2">
            Touring vocalist &amp; curator. I build sequences that flow naturally—no hard
            jumps. Expect tasteful discoveries alongside your must‑haves.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="chip">Los Angeles</span>
            <span className="chip">GMT‑7</span>
            <span className="chip">English</span>
            <span className="chip">Bangla</span>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 pb-12">
        <h2 className="font-heading text-xl mb-3">Recent reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviewData.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SingleArtistPage;
