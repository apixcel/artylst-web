"use client";

import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtistCard } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IRankedArtist } from "@/interface";

const ArtistCardSlider = ({ artists }: { artists: IRankedArtist[] }) => {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={1}
      modules={[FreeMode, Navigation]}
      navigation={{
        nextEl: ".featured-next",
        prevEl: ".featured-prev",
      }}
      breakpoints={{
        1440: { slidesPerView: 4.9 },
        1280: { slidesPerView: 4.5 },
        1024: { slidesPerView: 4 },
        768: { slidesPerView: 2.7 },
        640: { slidesPerView: 2.4 },
        480: { slidesPerView: 2 },
        420: { slidesPerView: 1.6 },
        320: { slidesPerView: 1.4 },
      }}
      className="group featured-artists-swiper"
    >
      {artists.map((item, index) => (
        <SwiperSlide key={item._id} className="!h-auto flex">
          <div className="h-full">
            <ArtistCard item={item} index={index} variant="home" />
          </div>
        </SwiperSlide>
      ))}

      {/* navigation */}
      <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
        <button className="featured-prev nav-button left-8 absolute">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="featured-next nav-button right-8 absolute">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </Swiper>
  );
};

export default ArtistCardSlider;
