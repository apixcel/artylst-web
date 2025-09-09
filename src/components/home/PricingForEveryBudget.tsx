"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const pricingForEveryBudget = [
  {
    id: 1,
    title: "$25",
    bgColor: "bg-brand-1/80",
    route: "/artists?maxPrice=25",
  },
  {
    id: 2,
    title: "$50",
    bgColor: "bg-brand-2/80",
    route: "/artists?maxPrice=50",
  },
  {
    id: 3,
    title: "$100",
    bgColor: "bg-brand-5/80",
    route: "/artists?maxPrice=100",
  },
  {
    id: 4,
    title: "$150",
    bgColor: "bg-brand-4/80",
    route: "/artists?maxPrice=150",
  },
];

const PricingForEveryBudget = () => {
  return (
    <section className="mb-[70px]">
      <h2 className="mb-[20px]">{`Ballin’ on a Budget? Say Less.`}</h2>

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
        {pricingForEveryBudget.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.route}>
              <div className={`rounded-[12px] ${item.bgColor} py-10 px-5`}>
                <span className="mb-[8px] inline-block">Under</span>
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PricingForEveryBudget;
