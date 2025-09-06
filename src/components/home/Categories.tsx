"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  { label: "House", value: "house", bgColor: "bg-brand-1/80" },
  { label: "Techno", value: "techno", bgColor: "bg-brand-2/80" },
  { label: "Down Tempo", value: "down-tempo", bgColor: "bg-brand-3/80" },
  { label: "Indie Dance", value: "indie-dance", bgColor: "bg-brand-4/80" },
  { label: "Bass", value: "bass", bgColor: "bg-brand-5/80" },
  { label: "Hip Hop", value: "hip-hop", bgColor: "bg-brand-6/80" },
  { label: "Trance", value: "trance", bgColor: "bg-brand-2/80" },
];

const Categories = () => {
  return (
    <section className="mb-[64px]">
      <div className="mb-[20px]">
        <div className="mb-[20px] flex justify-between items-center">
          <h2 className="mb-[20px]">Categories</h2>

          {/* Swiper controls */}
          <div className="flex items-center gap-2">
            <button className="categories-prev nav-button">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="categories-next nav-button">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          breakpoints={{
            320: { slidesPerView: 1.7, grid: { rows: 1 } },
            640: { slidesPerView: 2.3, grid: { rows: 1 } },
            768: { slidesPerView: 2.5, grid: { rows: 1 } },
            1024: { slidesPerView: 3.2, grid: { rows: 1 } },
            1280: { slidesPerView: 4.2, grid: { rows: 1 } },
            1440: { slidesPerView: 4.5, grid: { rows: 1 } },
          }}
          navigation={{
            nextEl: ".categories-next",
            prevEl: ".categories-prev",
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.value}>
              <Link href={`/artists?category=${item.value}`}>
                <div className={`rounded-[12px] ${item.bgColor} py-10 px-5`}>
                  <span className="mb-[8px] inline-block">Category</span>
                  <h3 className="text-2xl font-bold">{item.label}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
