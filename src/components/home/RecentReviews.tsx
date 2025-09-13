"use client";

import { Review } from "@/components";
import { reviewData } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentReviews = () => {
  return (
    <section className="mb-[70px]">
      <div className="mb-[20px] flex justify-between items-center">
        <h2 className="">Recent Reviews</h2>

        {/* Swiper controls */}
        <div className="flex items-center gap-2">
          <button className="recent-prev nav-button">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="recent-next nav-button">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={8}
        slidesPerView={1.2}
        navigation={{
          nextEl: ".recent-next",
          prevEl: ".recent-prev",
        }}
        freeMode={true}
        breakpoints={{
          640: { slidesPerView: 1.9 },
          768: { slidesPerView: 2.1, spaceBetween: 16 },
          1024: { slidesPerView: 2.8, spaceBetween: 16 },
          1280: { slidesPerView: 3.6, spaceBetween: 16 },
          1440: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {reviewData.map((review) => (
          <SwiperSlide key={review.id}>
            <Review review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecentReviews;
