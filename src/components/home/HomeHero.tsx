import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHero = () => {
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
            streaming link with a 30‑second authentication video. ARTYLST protects privacy
            with secure escrow.
          </p>

          <div className="my-[20px] flex items-center gap-[16px]">
            <Link href="/artists" className="btn btn-primary">
              Explore Artists
            </Link>
            <Link href="/artists" className="btn btn-ghost">
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

        {/* image */}
        <div className="lg:block hidden w-1/2">
          <Image
            src="/images/hero/hero-img.jpg"
            alt="HomeHero"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-[16px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
