"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const favoriteStars = [
  {
    name: "Actors",
    image: "/images/favorite-stars/actors.avif",
    route: "/browse/actors",
  },
  {
    name: "Reality TV",
    image: "/images/favorite-stars/reality-tv.png",
    route: "/browse/reality-tv",
  },
  {
    name: "Athletes",
    image: "/images/favorite-stars/athletes.png",
    route: "/browse/athletes",
  },
  {
    name: "Comedians",
    image: "/images/favorite-stars/comedians.jpg",
    route: "/browse/comedians",
  },
  {
    name: "Musicians",
    image: "/images/favorite-stars/musicians.jpeg",
    route: "/browse/musicians",
  },
  {
    name: "Creators",
    image: "/images/favorite-stars/creators.png",
    route: "/browse/creators",
  },
  {
    name: "For business",
    image: "/images/favorite-stars/for-business.jpg",
    route: "/business",
  },
];

const BrowseFavoriteStars = () => {
  return (
    <section className="mb-[64px]">
      <h1 className="text-center mb-[32px] sm:max-w-full max-w-[330px] sm:mx-0 mx-auto">
        Personalized videos from your favorite stars
      </h1>

      <Swiper
        spaceBetween={12}
        slidesPerView={8}
        breakpoints={{
          1440: { slidesPerView: 8 },
          1280: { slidesPerView: 7.5 },
          1024: { slidesPerView: 7.3 },
          768: { slidesPerView: 5.9 },
          640: { slidesPerView: 5.3 },
          480: { slidesPerView: 4 },
          420: { slidesPerView: 3.5 },
          320: { slidesPerView: 3 },
        }}
      >
        {favoriteStars.map((star) => (
          <SwiperSlide key={star.name} className="!h-auto">
            <Link href={star.route} className="group block">
              {/* Square wrapper keeps height in sync with slide width */}
              <div className="mb-[10px] aspect-square relative">
                <Image
                  src={star.image}
                  alt={star.name}
                  fill
                  sizes="(max-width: 1024px) 33vw, 12vw"
                  className="object-cover rounded-full border border-light group-hover:border-muted"
                />
              </div>
              <h4 className="text-center group-hover:text-muted underline">
                {star.name}
              </h4>
            </Link>
          </SwiperSlide>
        ))}

        {/* View all — matches size via the same aspect-square wrapper */}
        <SwiperSlide className="!h-auto">
          <div className="mb-[10px] aspect-square">
            <Link
              href="/browse"
              className="w-full h-full rounded-full border border-light hover:text-muted hover:border-muted underline flex items-center justify-center text-center"
            >
              View all
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BrowseFavoriteStars;
