"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, FreeMode } from "swiper/modules";
import "swiper/css/grid";
import "swiper/css/free-mode";

const personalizedPlaylistsData = [
  {
    title: "Workout • PR Mode",
    subTitle: "Power tracks curated by pros",
    bgColor: "from-indigo-500/30 to-indigo-700/20",
    route: "/personalized-playlists/tags/workout-pr-mode",
  },
  {
    title: "Study & Focus",
    subTitle: "Deep focus ambient & beats",
    bgColor: "from-emerald-500/30 to-emerald-700/20",
    route: "/personalized-playlists/tags/study-focus",
  },
  {
    title: "Weddings",
    subTitle: "Ceremony to after party",
    bgColor: "from-pink-500/30 to-fuchsia-700/20",
    route: "/personalized-playlists/tags/weddings",
  },
  {
    title: "Trending Vibes",
    subTitle: "What artists are loving now",
    bgColor: "from-amber-500/30 to-orange-700/20",
    route: "/personalized-playlists/tags/trending-vibes",
  },
];

const PersonalizedPlaylists = () => {
  return (
    <section className="mb-[64px]">
      <h2 className="mb-[20px]">Personalized playlists for every occasion</h2>

      <div>
        <Swiper
          modules={[Grid, FreeMode]}
          spaceBetween={16}
          slidesPerView={2}
          grid={{ rows: 2, fill: "row" }}
          breakpoints={{
            640: { slidesPerView: 1.9, grid: { rows: 1 } },
            768: { slidesPerView: 2.2, grid: { rows: 1 } },
            1024: { slidesPerView: 2.8, grid: { rows: 1 } },
            1280: { slidesPerView: 3.8, grid: { rows: 1 } },
            1440: { slidesPerView: 4, grid: { rows: 1 } },
          }}
          observer
          observeParents
          freeMode={true}
        >
          {personalizedPlaylistsData.map((playlist) => (
            <SwiperSlide key={playlist.route}>
              <Link
                href={playlist.route}
                className={`bg-gradient-to-br ${playlist.bgColor} w-full p-4 flex flex-col justify-center rounded-[16px] text-center h-40`}
              >
                <h3 className="sm:text-[24px] text-[20px] mb-[4px]">{playlist.title}</h3>
                <p className="hidden sm:block">{playlist.subTitle}</p>
                <p className="sm:hidden">Playlists for</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PersonalizedPlaylists;
