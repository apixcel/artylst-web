"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";
import { cn } from "@/utils";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const instantVideos = [
  {
    id: 1,
    name: "Patrali Chattopadhyay",
    designation: "Actor | Jhanak | Balveer",
    image: "/images/instant-video/img-1.png",
    rating: 4.5,
    reviews: 4,
    price: 10,
  },
  {
    id: 2,
    name: "Shantanu Monga",
    designation: "Actor -Bade Ache lagte hai | Molkki",
    image: "/images/instant-video/img-2.png",
    rating: 5,
    reviews: 1,
    price: 8,
    oldPrice: 10,
  },
  {
    id: 3,
    name: "Prap Young",
    designation: "Actor - iNephew",
    image: "/images/instant-video/img-3.png",
    rating: 4.65,
    reviews: 43,
    price: 10,
    oldPrice: 25,
  },
  {
    id: 4,
    name: "Cat Cora",
    designation: "Chef- Iron Chef",
    image: "/images/instant-video/img-4.jpg",
    rating: 5,
    reviews: 33,
    price: 1000,
  },
  {
    id: 5,
    name: "Kamala Harris - Impressionist",
    designation: "Kamala Harris Impersonator",
    image: "/images/instant-video/img-5.png",
    rating: 5,
    reviews: 7,
    price: 65,
  },
  {
    id: 6,
    name: "David Anders",
    designation: "Act, Sing & Hug-TVD, iZombie, Alias",
    image: "/images/instant-video/img-6.png",
    rating: 4.93,
    reviews: 46,
    price: 77,
  },
  {
    id: 7,
    name: "Philip Michael",
    designation: "Actor",
    image: "/images/instant-video/img-7.jpg",
    rating: 5,
    reviews: 11,
    price: 55,
  },
];

const InstantVideos = () => {
  return (
    <section className="mb-[60px] relative w-full h-full py-[24px] px-[20px]">
      <div className="mb-[20px]">
        <h2 className="mb-[8px]">Instant Artylst videos</h2>
        <p className="text-lime text-[16px]">0 - 60 min delivery</p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.25}
        navigation={{
          nextEl: ".instant-next",
          prevEl: ".instant-prev",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.75,
          },
          425: {
            slidesPerView: 1.9,
          },
          640: {
            slidesPerView: 2.9,
          },
          768: {
            slidesPerView: 3.1,
          },
          1280: {
            slidesPerView: 5.4,
          },
          1440: {
            slidesPerView: 6,
          },
        }}
        className="relative group"
      >
        {instantVideos.map((video) => (
          <SwiperSlide key={video.id}>
            <Link href={`/instant-video/${video.id}`}>
              <div className="w-full h-full mb-[8px]">
                <Image
                  src={video.image}
                  alt={video.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-[16px] border border-lime/90"
                />
              </div>

              <div>
                <p className="font-[500]">{video.name}</p>
                <p className="text-muted mb-[4px]">{video.designation}</p>
                <div className="flex items-center gap-[4px] font-[500] mb-[4px]">
                  <p className="flex items-center gap-[4px]">
                    <StarIcon className="h-[14px] w-[14px]" /> {video.rating}
                  </p>
                  <p>({video.reviews})</p>
                </div>
                <div className="flex items-center gap-[4px] font-[500]">
                  <p className={cn("text-light", video.oldPrice && "text-greeniest")}>
                    ${video.price} {!video.oldPrice && "+"}
                  </p>
                  {video.oldPrice && (
                    <p className="text-muted line-through">${video.oldPrice}+</p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* navigation */}
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
          <button className="instant-prev nav-button left-8 absolute">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="instant-next nav-button right-8 absolute">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Swiper>

      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/instant-video/instant-video-background.jpeg"
          alt="Instant Videos"
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-[16px]"
        />
      </div>
    </section>
  );
};

export default InstantVideos;
