"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const giftsForEveryBudget = [
  {
    id: 1,
    title: "Under $25",
    image: "/images/gifts-for-every-budget/img-1.jpg",
    route: "/tags/25-or-less",
  },
  {
    id: 2,
    title: "Under $50",
    image: "/images/gifts-for-every-budget/img-2.jpg",
    route: "/tags/50-or-less",
  },
  {
    id: 3,
    title: "Under $100",
    image: "/images/gifts-for-every-budget/img-3.jpg",
    route: "/tags/100-or-less",
  },
  {
    id: 4,
    title: "Under $150",
    image: "/images/gifts-for-every-budget/img-4.jpg",
    route: "/tags/150-or-less",
  },
];

const GiftsForEveryBudget = () => {
  return (
    <section className="mb-[70px]">
      <h2 className="mb-[20px]">Gifts for every budget</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.3}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          640: { slidesPerView: 1.9, grid: { rows: 1 } },
          768: { slidesPerView: 2.1, grid: { rows: 1 } },
          1024: { slidesPerView: 2.8, grid: { rows: 1 } },
          1280: { slidesPerView: 3.8, grid: { rows: 1 } },
          1440: { slidesPerView: 4, grid: { rows: 1 } },
        }}
      >
        {giftsForEveryBudget.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.route}>
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={400}
                className="rounded-[16px]"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GiftsForEveryBudget;
