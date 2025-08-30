"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";
import { artistsData } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import cn from "@/utils/cn";

const HomeRecentlyViewed = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="text-2xl font-semibold mb-[20px]">Recently Viewed</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[FreeMode, Navigation]}
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
        navigation={{
          nextEl: ".recently-viewed-next",
          prevEl: ".recently-viewed-prev",
        }}
        className="group recently-viewed-swiper"
      >
        {artistsData.slice(0, 3).map((a) => (
          <SwiperSlide key={a.id}>
            <Link href={`/artists/${a.id}`}>
              <div className="w-full h-full mb-[8px]">
                <Image
                  src={a.image}
                  alt={a.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div>
                <p className="font-[500]">{a.name}</p>
                <p className="text-muted mb-[4px]">{a.designation}</p>
                <div className="flex items-center gap-[4px] font-[500] mb-[4px]">
                  <p className="flex items-center gap-[4px]">
                    <StarIcon className="h-[14px] w-[14px]" /> {a.rating}
                  </p>
                  <p>({a.reviews})</p>
                </div>
                <div className="flex items-center gap-[4px] font-[500]">
                  <p className={cn("text-light", a.oldPrice && "text-greeniest")}>
                    ${a.price} {!a.oldPrice && "+"}
                  </p>
                  {a.oldPrice && (
                    <p className="text-muted line-through">${a.oldPrice}+</p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* navigation */}
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
          <button className="recently-viewed-prev nav-button left-8 absolute">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="recently-viewed-next nav-button right-8 absolute">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default HomeRecentlyViewed;
