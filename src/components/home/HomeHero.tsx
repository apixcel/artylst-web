"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";

const HomeHero = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-[20px] mb-[60px]">
      <div className="flex items-center justify-between gap-[40px] xl:gap-[60px]">
        {/* content */}
        <div className="lg:w-1/2">
          <h1 className="text-[36px] xl:text-[40px] font-[500] mb-[20px]">
            Personalized playlists from your favorite artists
          </h1>
          <p>
            Fans and businesses request a custom playlist. Artists deliver a private
            streaming link with a 30-second authentication video. ARTYLST protects privacy
            with secure escrow.
          </p>

          <div className="my-[20px] flex items-center gap-[16px]">
            <Link href="/artists" className="btn-secondary">
              Explore Artists
            </Link>
            <Link href="#how-artylst-works" className="btn btn-ghost">
              How it works
            </Link>
          </div>

          <div className="flex items-center gap-[8px] flex-wrap">
            <span className="chip">Workout</span>
            <span className="chip">Study / Focus</span>
            <span className="chip">Chill</span>
            <span className="chip">Wedding</span>
            <span className="chip">Trending Vibes</span>
          </div>
        </div>

        {/* thumbnail + animated play button */}
        <div className="lg:block hidden w-1/2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative w-full group cursor-pointer focus:outline-none"
            aria-label="Play hero video"
          >
            <Image
              src="/images/hero/hero-img.jpg"
              alt="Hero video thumbnail"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-[16px]"
              priority
            />
            <div className="absolute inset-0 rounded-[16px] bg-black/30 group-hover:bg-black/40 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex items-center justify-center">
                {/* Custom ripple layers with delay */}
                <span className="absolute w-20 h-20 rounded-full bg-white/25 animate-ripple" />
                <span className="absolute w-20 h-20 rounded-full bg-white/20 animate-ripple [animation-delay:1.2s]" />
                {/* Play button */}
                <span className="relative inline-flex items-center justify-center rounded-full p-6 bg-white/90 backdrop-blur shadow-lg transition transform group-hover:scale-110 group-hover:bg-white">
                  <Play className="w-8 h-8 text-black" />
                </span>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Video modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white/90 hover:text-white"
              aria-label="Close video"
              title="Close"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Hero Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeHero;
