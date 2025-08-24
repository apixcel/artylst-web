"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, FreeMode } from "swiper/modules";
import "swiper/css/grid";
import "swiper/css/free-mode";

const personalizedVideosData = [
  {
    subTitle: "Personalized videos for",
    title: "Birthdays",
    image: "/images/personalized-video/birthdays.jpg",
    route: "/personalized-videos/tags/for-birthdays",
  },
  {
    subTitle: "Pick your draft order for",
    title: "Fantasy Football",
    image: "/images/personalized-video/fantasy-football.jpg",
    route: "/personalized-videos/tags/fantasy-football",
  },
  {
    subTitle: "The perfect gift for",
    title: "Weddings",
    image: "/images/personalized-video/weddings.jpg",
    route: "/personalized-videos/tags/wedding-season",
  },
  {
    subTitle: "Get a video from our",
    title: "Trending Stars",
    image: "/images/personalized-video/trendings.jpg",
    route: "/personalized-videos/tags/new and trending",
  },
];

const PersonalizedVideos = () => {
  return (
    <section className="mb-[64px]">
      <h2 className="mb-[20px]">Personalized videos for every occasion</h2>

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
          {personalizedVideosData.map((video) => (
            <SwiperSlide key={video.route}>
              <Link href={video.route} className="relative block">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover rounded-[24px]"
                    sizes="(min-width:1440px)25vw,(min-width:1280px)26vw,(min-width:1024px)33vw,(min-width:768px)45vw,90vw"
                  />
                </div>

                <div className="absolute sm:top-[28px] sm:left-[28px] top-[20px] left-[20px]">
                  <p className="hidden sm:block">{video.subTitle}</p>
                  <p className="sm:hidden">Videos for</p>
                  <h3 className="sm:text-[24px] text-[20px]">{video.title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PersonalizedVideos;
