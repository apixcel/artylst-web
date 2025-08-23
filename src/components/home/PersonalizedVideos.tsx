"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css/grid";

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
          modules={[Grid]}
          spaceBetween={16}
          slidesPerView={4}
          grid={{
            rows: 1,
          }}
          // breakpoints={{
          //     1440: { slidesPerView: 8 },
          //     1280: { slidesPerView: 7.5 },
          //     1024: { slidesPerView: 7.3 },
          //     768: { slidesPerView: 5.9 },
          //     640: { slidesPerView: 5.3 },
          //     480: { slidesPerView: 4 },
          //     420: { slidesPerView: 3.5 },
          //     320: { slidesPerView: 3 },
          //   }}
        >
          {personalizedVideosData.map((video) => (
            <SwiperSlide key={video.title}>
              <Link href={video.route} className="relative">
                <div className="relative">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={600}
                    height={600}
                    className="object-cover rounded-[24px]"
                  />
                </div>
                <div className="absolute top-[28px] left-[28px]">
                  <p className="hidden sm:block">{video.subTitle}</p>
                  <p className="sm:hidden">Videos for</p>
                  <h3 className="text-[24px]">{video.title}</h3>
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
