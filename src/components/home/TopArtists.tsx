"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArtistCard } from "@/components";
import { artistsData } from "@/constants";

export default function TopArtists() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Top Artists on Artylst</h2>
        <Link className="underline" href="/top-artists">
          View all
        </Link>
      </div>

      <Swiper
        spaceBetween={12}
        slidesPerView={1}
        modules={[FreeMode, Navigation]}
        navigation={{
          nextEl: ".instant-next",
          prevEl: ".instant-prev",
        }}
        breakpoints={{
          1440: { slidesPerView: 5.8 },
          1280: { slidesPerView: 5.5 },
          1024: { slidesPerView: 4.3 },
          768: { slidesPerView: 3.1 },
          640: { slidesPerView: 2.8 },
          480: { slidesPerView: 2.2 },
          420: { slidesPerView: 1.8 },
          320: { slidesPerView: 1.5 },
        }}
        className="group top-artists-swiper"
      >
        {artistsData.map((item, index) => (
          <SwiperSlide key={item.id} className="!h-auto flex">
            <div className="h-full">
              <ArtistCard item={item} index={index} variant="home" />
            </div>
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
    </section>
  );
}
