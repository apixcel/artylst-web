"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";

import { cn } from "@/utils";
import "swiper/css/navigation";

const top10 = [
  {
    id: 1,
    name: "James Buckley",
    designation: "Actor - The Inbetweeners",
    image: "/images/top10/top-1.jpg",
    price: 56,
    rating: 4.97,
    username: "/buxtagram",
  },
  {
    id: 2,
    name: "Bofem",
    designation: "Tiktok Creator",
    image: "/images/top10/top-2.png",
    price: 65,
    rating: 4.99,
    username: "/bofem",
  },
  {
    id: 3,
    name: "Jen from Corporate",
    designation: "Prank Caller, Comedian, Actress Creator",
    image: "/images/top10/top-3.jpg",
    price: 32,
    rating: 4.4,
    username: "/w0ahhkate",
  },
  {
    id: 4,
    name: "Smooth Papi",
    designation: "Tiktok Creator",
    image: "/images/top10/top-4.png",
    price: 61,
    rating: 4.97,
    username: "/enochj_",
  },
  {
    id: 5,
    name: "SoYTiet",
    designation: "Count Master - Singer",
    image: "/images/top10/top-5.jpg",
    price: 35,
    oldPrice: 100,
    rating: 4.86,
    username: "/soytiet",
  },
  {
    id: 6,
    name: "Simon Kaggwa Njala",
    designation: "Journalist/Why are you gay sensation",
    image: "/images/top10/top-6.png",
    price: 100,
    rating: 4.98,
    username: "/simonkaggwa",
  },
  {
    id: 7,
    name: "Kori King",
    designation: "Rupauls Drag Race",
    image: "/images/top10/top-7.png",
    price: 100,
    rating: 4.91,
    username: "/korikingg",
  },
  {
    id: 8,
    name: "Jax Taylor",
    designation: "Bravo -Vanderpump Rules, The Valley",
    image: "/images/top10/top-8.jpg",
    price: 159,
    rating: 4.94,
    username: "/mrjaxtaylor",
  },
  {
    id: 9,
    name: "Big john  - the boshfather",
    designation: "Tiktok Creator",
    image: "/images/top10/top-9.jpg",
    price: 39,
    rating: 4.99,
    username: "/bigjohn1",
  },
  {
    id: 10,
    name: "cer spence / Spencer Goldman",
    designation: "comedian",
    image: "/images/top10/top-10.jpg",
    price: 55,
    oldPrice: 110,
    rating: 4.94,
    username: "/cerspence",
  },
];

function Crown({ index }: { index: number }) {
  return (
    <div className="flex gap-1 backdrop-blur-sm bg-white/80 rounded-br-2xl py-1 px-3 rounded-tl-3xl items-center">
      {/* left flourish */}
      <svg width="12" height="29" viewBox="0 0 12 29" fill="none">
        <g clipPath="url(#clip0_3407_52760)">
          <path
            d="M2.35039 6.37703C2.42694 7.69305 3.1498 8.334 3.98018 8.38008C4.01943 8.38251 4.06332 8.34984 4.09208 8.29767C4.70182 7.17791 5.16724 5.91503 5.29645 4.69555C5.42103 3.4868 5.11287 2.57426 4.2898 2.2856C4.25007 2.27195 4.1879 2.29755 4.13207 2.35143C2.97086 3.45267 2.26896 5.07222 2.35039 6.37678V6.37703Z"
            fill="#4D4953"
          ></path>
          <path
            d="M6.68601 5.71277C5.62403 6.08968 4.70539 7.20409 4.40918 8.42503C4.39504 8.48159 4.40601 8.53474 4.43649 8.55912C5.10084 9.08475 6.02069 9.03355 6.91957 8.57887C7.82406 8.11589 8.53986 7.37791 9.06914 6.50999C9.09474 6.46757 9.09669 6.41906 9.07353 6.3859C8.60836 5.71131 7.75312 5.32635 6.68601 5.71277Z"
            fill="#4D4953"
          ></path>
          <path
            d="M7.66623 1.74255C6.42188 2.75968 5.88894 4.12276 6.01449 5.1038C6.01985 5.14988 6.0535 5.1745 6.09885 5.16646C7.08257 4.9858 8.14261 4.41142 9.18192 3.56227C10.2134 2.70848 11.0699 1.725 11.5287 0.759072C11.5504 0.712263 11.5326 0.673499 11.4822 0.660577C10.4577 0.386548 8.90106 0.720552 7.66598 1.74255H7.66623Z"
            fill="#4D4953"
          ></path>
          <path
            d="M0.756129 12.3437C1.2937 13.5317 2.19186 13.8723 2.98493 13.6207C3.02248 13.6092 3.05222 13.5631 3.06076 13.5049C3.23824 12.2517 3.21825 10.9289 2.88668 9.77207C2.55439 8.6267 1.92344 7.90579 1.0599 7.92481C1.01821 7.92602 0.970916 7.9704 0.939709 8.03866C0.287793 9.4366 0.217822 11.1681 0.755885 12.3437H0.756129Z"
            fill="#4D4953"
          ></path>
          <path
            d="M4.54338 10.2199C3.70252 10.9303 3.2476 12.2744 3.39851 13.5109C3.40509 13.5682 3.4341 13.6136 3.47116 13.6255C4.27642 13.8781 5.11972 13.5039 5.79748 12.7678C6.47744 12.0223 6.87727 11.0954 7.0372 10.1253C7.04475 10.078 7.02842 10.0332 6.99453 10.0112C6.31214 9.55849 5.38571 9.49949 4.54314 10.2199H4.54338Z"
            fill="#4D4953"
          ></path>
          <path
            d="M1.3426 18.4711C2.26124 19.3971 3.22375 19.399 3.87664 18.878C3.90761 18.8536 3.91931 18.7998 3.90663 18.7417C3.63089 17.4964 3.15549 16.2638 2.44286 15.3034C1.7339 14.3541 0.890601 13.9101 0.0899666 14.2332C0.0514464 14.249 0.0226782 14.307 0.0173146 14.3814C-0.104828 15.9105 0.427871 17.5571 1.34285 18.4709L1.3426 18.4711Z"
            fill="#4D4953"
          ></path>
          <path
            d="M4.15098 15.1313C3.61097 16.0919 3.64949 17.5137 4.2268 18.6262C4.25313 18.6778 4.29629 18.7103 4.33529 18.7083C5.17811 18.6593 5.83392 18.0045 6.21084 17.07C6.58628 16.126 6.6409 15.1155 6.45195 14.1581C6.44269 14.1113 6.41124 14.0757 6.37223 14.0671C5.57525 13.8889 4.68905 14.1608 4.15098 15.1316V15.1313Z"
            fill="#4D4953"
          ></path>
          <path
            d="M4.11694 24.0622C5.33666 24.6171 6.25213 24.2777 6.66171 23.5487C6.68121 23.5146 6.67121 23.459 6.63635 23.4081C5.88643 22.3183 4.9851 21.316 3.97115 20.6612C2.96499 20.0154 2.021 19.8981 1.38591 20.4888C1.35543 20.5176 1.3491 20.5827 1.37055 20.6549C1.79915 22.143 2.90477 23.5173 4.11669 24.0622H4.11694Z"
            fill="#4D4953"
          ></path>
          <path
            d="M5.50769 19.8885C5.34873 20.9907 5.90995 22.3279 6.8927 23.1839C6.93781 23.2239 6.99144 23.2395 7.02728 23.2236C7.80475 22.8777 8.16168 22.0193 8.15802 20.9951C8.14924 19.9626 7.82889 18.9832 7.31179 18.146C7.28644 18.1053 7.24451 18.0827 7.20477 18.0888C6.39658 18.2053 5.66128 18.7775 5.50769 19.8885Z"
            fill="#4D4953"
          ></path>
          <path
            d="M9.07967 28.4212C10.5208 28.5219 11.278 27.8742 11.3411 27.0309C11.3446 26.9911 11.309 26.9416 11.2512 26.9051C10.0066 26.1251 8.70837 25.4844 7.47329 25.218C6.25015 24.9573 5.31616 25.1814 4.94949 25.9708C4.93218 26.0091 4.95217 26.0735 5.00166 26.1347C6.00147 27.4031 7.65053 28.3274 9.07992 28.4212H9.07967Z"
            fill="#4D4953"
          ></path>
          <path
            d="M8.6163 23.9344C8.91788 25.0442 10.0318 26.1257 11.399 26.5994C11.4622 26.6218 11.5221 26.6179 11.5502 26.5901C12.1592 25.9843 12.1063 25.0354 11.6416 24.0556C11.1686 23.0696 10.4441 22.2456 9.61953 21.63C9.57906 21.6 9.53055 21.5934 9.4952 21.6132C8.77867 22.0116 8.30546 22.8183 8.61606 23.9344H8.6163Z"
            fill="#4D4953"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_3407_52760">
            <rect
              width="12"
              height="27.863"
              fill="white"
              transform="translate(0 0.568481)"
            ></rect>
          </clipPath>
        </defs>
      </svg>

      <p className="text-black font-bold text-[20px] leading-none">{index + 1}</p>

      {/* right flourish (mirrored) */}
      <div className="-scale-x-100">
        <svg width="12" height="29" viewBox="0 0 12 29" fill="none">
          <g clipPath="url(#clip0_3407_52760)">
            <path
              d="M2.35039 6.37703C2.42694 7.69305 3.1498 8.334 3.98018 8.38008C4.01943 8.38251 4.06332 8.34984 4.09208 8.29767C4.70182 7.17791 5.16724 5.91503 5.29645 4.69555C5.42103 3.4868 5.11287 2.57426 4.2898 2.2856C4.25007 2.27195 4.1879 2.29755 4.13207 2.35143C2.97086 3.45267 2.26896 5.07222 2.35039 6.37678V6.37703Z"
              fill="#4D4953"
            ></path>
            <path
              d="M6.68601 5.71277C5.62403 6.08968 4.70539 7.20409 4.40918 8.42503C4.39504 8.48159 4.40601 8.53474 4.43649 8.55912C5.10084 9.08475 6.02069 9.03355 6.91957 8.57887C7.82406 8.11589 8.53986 7.37791 9.06914 6.50999C9.09474 6.46757 9.09669 6.41906 9.07353 6.3859C8.60836 5.71131 7.75312 5.32635 6.68601 5.71277Z"
              fill="#4D4953"
            ></path>
            <path
              d="M7.66623 1.74255C6.42188 2.75968 5.88894 4.12276 6.01449 5.1038C6.01985 5.14988 6.0535 5.1745 6.09885 5.16646C7.08257 4.9858 8.14261 4.41142 9.18192 3.56227C10.2134 2.70848 11.0699 1.725 11.5287 0.759072C11.5504 0.712263 11.5326 0.673499 11.4822 0.660577C10.4577 0.386548 8.90106 0.720552 7.66598 1.74255H7.66623Z"
              fill="#4D4953"
            ></path>
            <path
              d="M0.756129 12.3437C1.2937 13.5317 2.19186 13.8723 2.98493 13.6207C3.02248 13.6092 3.05222 13.5631 3.06076 13.5049C3.23824 12.2517 3.21825 10.9289 2.88668 9.77207C2.55439 8.6267 1.92344 7.90579 1.0599 7.92481C1.01821 7.92602 0.970916 7.9704 0.939709 8.03866C0.287793 9.4366 0.217822 11.1681 0.755885 12.3437H0.756129Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.54338 10.2199C3.70252 10.9303 3.2476 12.2744 3.39851 13.5109C3.40509 13.5682 3.4341 13.6136 3.47116 13.6255C4.27642 13.8781 5.11972 13.5039 5.79748 12.7678C6.47744 12.0223 6.87727 11.0954 7.0372 10.1253C7.04475 10.078 7.02842 10.0332 6.99453 10.0112C6.31214 9.55849 5.38571 9.49949 4.54314 10.2199H4.54338Z"
              fill="#4D4953"
            ></path>
            <path
              d="M1.3426 18.4711C2.26124 19.3971 3.22375 19.399 3.87664 18.878C3.90761 18.8536 3.91931 18.7998 3.90663 18.7417C3.63089 17.4964 3.15549 16.2638 2.44286 15.3034C1.7339 14.3541 0.890601 13.9101 0.0899666 14.2332C0.0514464 14.249 0.0226782 14.307 0.0173146 14.3814C-0.104828 15.9105 0.427871 17.5571 1.34285 18.4709L1.3426 18.4711Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.15098 15.1313C3.61097 16.0919 3.64949 17.5137 4.2268 18.6262C4.25313 18.6778 4.29629 18.7103 4.33529 18.7083C5.17811 18.6593 5.83392 18.0045 6.21084 17.07C6.58628 16.126 6.6409 15.1155 6.45195 14.1581C6.44269 14.1113 6.41124 14.0757 6.37223 14.0671C5.57525 13.8889 4.68905 14.1608 4.15098 15.1316V15.1313Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.11694 24.0622C5.33666 24.6171 6.25213 24.2777 6.66171 23.5487C6.68121 23.5146 6.67121 23.459 6.63635 23.4081C5.88643 22.3183 4.9851 21.316 3.97115 20.6612C2.96499 20.0154 2.021 19.8981 1.38591 20.4888C1.35543 20.5176 1.3491 20.5827 1.37055 20.6549C1.79915 22.143 2.90477 23.5173 4.11669 24.0622H4.11694Z"
              fill="#4D4953"
            ></path>
            <path
              d="M5.50769 19.8885C5.34873 20.9907 5.90995 22.3279 6.8927 23.1839C6.93781 23.2239 6.99144 23.2395 7.02728 23.2236C7.80475 22.8777 8.16168 22.0193 8.15802 20.9951C8.14924 19.9626 7.82889 18.9832 7.31179 18.146C7.28644 18.1053 7.24451 18.0827 7.20477 18.0888C6.39658 18.2053 5.66128 18.7775 5.50769 19.8885Z"
              fill="#4D4953"
            ></path>
            <path
              d="M9.07967 28.4212C10.5208 28.5219 11.278 27.8742 11.3411 27.0309C11.3446 26.9911 11.309 26.9416 11.2512 26.9051C10.0066 26.1251 8.70837 25.4844 7.47329 25.218C6.25015 24.9573 5.31616 25.1814 4.94949 25.9708C4.93218 26.0091 4.95217 26.0735 5.00166 26.1347C6.00147 27.4031 7.65053 28.3274 9.07992 28.4212H9.07967Z"
              fill="#4D4953"
            ></path>
            <path
              d="M8.6163 23.9344C8.91788 25.0442 10.0318 26.1257 11.399 26.5994C11.4622 26.6218 11.5221 26.6179 11.5502 26.5901C12.1592 25.9843 12.1063 25.0354 11.6416 24.0556C11.1686 23.0696 10.4441 22.2456 9.61953 21.63C9.57906 21.6 9.53055 21.5934 9.4952 21.6132C8.77867 22.0116 8.30546 22.8183 8.61606 23.9344H8.6163Z"
              fill="#4D4953"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_3407_52760">
              <rect
                width="12"
                height="27.863"
                fill="white"
                transform="translate(0 0.568481)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Top10Section() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Top 10 on Artylst</h2>
        <Link className="underline" href="/leaderboard">
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
        className="relative group"
      >
        {top10.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-2xl overflow-hidden bg-transparent">
              <Link
                href={item.username}
                className="relative block aspect-[21/37] rounded-2xl overflow-hidden"
              >
                {/* header */}
                <div className="absolute top-0 left-0 right-0 flex justify-between z-20">
                  {/* crown */}
                  <Crown index={index} />
                  {/* zap */}
                  <div className="w-6 h-6 rounded-full bg-black/70 text-yellow-300 flex items-center justify-center mr-2 mt-2">
                    <Zap className="w-[14px] h-[14px]" />
                  </div>
                </div>

                {/* image */}
                <div className="relative h-1/2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover rounded-3xl"
                  />
                </div>

                {/* soft glows */}
                <div className="h-1/2 relative">
                  <div className="absolute top-2 bottom-0 -left-24 w-40 h-36 blur-2xl bg-neutral-400/40" />
                  <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-full w-full h-full blur-2xl bg-neutral-400/40" />
                  <div className="absolute top-2 bottom-0 -right-24 w-40 h-36 blur-2xl bg-neutral-400/40" />
                </div>

                {/* text / footer */}
                <div className="absolute inset-x-0 bottom-0">
                  <div className="px-4 pb-3 text-center space-y-1">
                    <p className="text-[18px] font-bold leading-[0.85] uppercase font-bricolage-grotesque">
                      {item.name}
                    </p>
                    <p className="text-sm opacity-90">{item.designation}</p>
                  </div>
                  <div className="flex items-center justify-between py-4 px-5 bg-black/40 backdrop-blur-sm">
                    <div className="flex items-center gap-[4px] font-[500]">
                      <p className={cn("text-light", item.oldPrice && "text-greeniest")}>
                        ${item.price} {!item.oldPrice && "+"}
                      </p>
                      {item.oldPrice && (
                        <p className="text-muted line-through">${item.oldPrice}+</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-[14px] h-[14px]" />
                      <p className="text-sm">{item.rating}</p>
                    </div>
                  </div>
                </div>
              </Link>
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
