"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const pricingForEveryBudget = [
  {
    id: 1,
    title: "$25",
    bgColor: "bg-cyan/80",
    route: "/tags/25-or-less",
  },
  {
    id: 2,
    title: "$50",
    bgColor: "bg-turquoise/80",
    route: "/tags/50-or-less",
  },
  {
    id: 3,
    title: "$100",
    bgColor: "bg-azure/80",
    route: "/tags/100-or-less",
  },
  {
    id: 4,
    title: "$150",
    bgColor: "bg-light-blue/80",
    route: "/tags/150-or-less",
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
