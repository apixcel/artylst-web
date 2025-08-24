"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const recentReviews = [
  {
    id: 1,
    rating: 5,
    title: "Birthday from Joe Veleno",
    name: "Sophie",
    review:
      "We cannot thank you enough! Sophie was beyond thrilled to get your message and it really helped her get through a little bit of missing home!",
  },
  {
    id: 2,
    rating: 5,
    title: "Advice from Alex Macqueen",
    name: "Jean",
    review:
      "I surprised my best friend with a pep talk when she was feeling down. Mr Macqueen's message was beyond what either of us expected!",
  },
  {
    id: 3,
    rating: 5,
    title: "Advice from Max Bemis",
    name: "Eileen",
    review:
      "She's watched it multiple times, shared it with friends and family, and continues to tell everyone about it. Thank you so much for making her day/month/year!",
  },
  {
    id: 4,
    rating: 5,
    title: "Motivation from Ian Somerhalder",
    name: "Maddy",
    review:
      "She absolutely loved the video you made for her! Thank you for talking from the heart! She bawled her eyes out and lifted her spirits up so much!",
  },
  {
    id: 5,
    rating: 5,
    title: "Birthday from James Marsters",
    name: "Jesse",
    review:
      "This brought so much joy to my fiance Jesse! I got this video last year for his bday and can't believe I didn't leave a review then! It's the gift that keeps on giving!",
  },
  {
    id: 6,
    rating: 5,
    title: "Birthday from Michael Burke",
    name: "Robin",
    review:
      "This is the greatest thing I have ever seen in my entire life and I have never been more excited to gift a present to someone as I am this cameo!",
  },
  {
    id: 7,
    rating: 5,
    title: "Congratulations from Steve Bridges",
    name: "Samantha",
    review:
      "Steve exceeded all expectations i had going into this app. The video he left was hilarious and even more lengthy than I thought it was going to be!",
  },
];

const RecentReviews = () => {
  return (
    <section className="mb-[70px]">
      <div className="mb-[20px] flex justify-between items-center">
        <h2 className="">Recent Reviews</h2>

        {/* Swiper controls */}
        <div className="flex items-center gap-2">
          <button className="recent-prev disabled:text-muted p-1.5 rounded-full bg-gray-70 hover:bg-gray-50 border border-gray-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="recent-next disabled:text-muted p-1.5 rounded-full bg-gray-70 hover:bg-gray-50 border border-gray-50">
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
        {recentReviews.map((review) => (
          <SwiperSlide key={review.id} className="p-[20px] rounded-[16px] bg-level-1">
            <p className="mb-[2px] font-[500]">{review.title}</p>
            <div className="flex items-center gap-[8px] mb-[4px]">
              <div className="flex items-center gap-[2px] text-gold">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="w-3 h-3" />
                ))}
              </div>
              <span className="text-muted">{review.name}</span>
            </div>
            <p className="text-muted italic line-clamp-4">{review.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecentReviews;
