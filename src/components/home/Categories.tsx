"use client";

import { useGetGenresQuery } from "@/redux/features/meta/meta.api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Fixed palette (Tailwind classes) — এগুলো build-time এ present থাকবে
const COLOR_CLASSES = [
  "bg-brand-1/80",
  "bg-brand-2/80",
  "bg-brand-3/80",
  "bg-brand-4/80",
  "bg-brand-5/80",
  "bg-brand-6/80",
];

// simple, deterministic string hash
const hashString = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

const pickBgClass = (key: string) =>
  COLOR_CLASSES[hashString(key) % COLOR_CLASSES.length];

const Categories = () => {
  const { data, isLoading } = useGetGenresQuery({});
  const categories = data?.data || [];

  return (
    <section className="mb-[64px]">
      <div className="mb-[20px]">
        <div className="mb-[20px] flex justify-between items-center">
          <h2>Categories</h2>

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
          freeMode
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
          className="categories-swiper flex"
        >
          {isLoading && (
            <SwiperSlide>
              <div className="rounded-[12px] bg-muted/50 py-10 px-5 animate-pulse">
                <span className="mb-[8px] inline-block">Loading…</span>
                <h3 className="text-2xl font-bold">—</h3>
              </div>
            </SwiperSlide>
          )}

          {categories.map((item) => {
            const bg = pickBgClass(item.slug || item.label);
            return (
              <SwiperSlide key={item._id} className="!h-auto flex">
                <Link href={`/artists?category=${item.slug}`} className="!h-full">
                  <div className={`rounded-[12px] ${bg} py-10 px-5 !h-full`}>
                    <span className="mb-[8px] inline-block">Category</span>
                    <h3 className="text-2xl font-bold">{item.label}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
