"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const HomeHero = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-[20px] mb-[60px]">
      <div className="flex items-center justify-between gap-[40px] xl:gap-[60px]">
        {/* content */}
        <div className="lg:w-1/2">
          <h1 className="text-[36px] xl:text-[40px] font-[500] mb-[20px] text-turquoise">
            Let your favorite DJ build you the perfect playlist for any place or occasion
          </h1>
          <p className="text-light-blue">
            Whether you&apos;re a fan or a business, now you can have your favorite artist
            build you your very own private playlist, personalized just for you. If that
            wasn&apos;t cool enough, with every order purchased you will receive a 30
            second authentication video with your private streaming link so you can always
            be sure that your playlist was truly built by your favorite artist just for
            you.
          </p>
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
              src="/images/artists/hero-video-thumbnail.png"
              alt="Hero video thumbnail"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-[16px]"
              priority
            />
            <div className="absolute inset-0 rounded-[16px]  transition" />
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
