"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarIcon } from "@/icons";
import Link from "next/link";
import Image from "next/image";
import { useGetRecentlyViewedArtistsQuery } from "@/redux/features/artist/artist.api";

const HomeRecentlyViewed = () => {
  const { data } = useGetRecentlyViewedArtistsQuery({});
  const artistsData = data?.data || [];
  console.log("log from home recently viewed", artistsData);

  if (artistsData.length === 0) return null;

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
        {artistsData.map((a) => (
          <SwiperSlide key={a._id}>
            <Link href={`/artists/${a.userName}`}>
              <div className="w-full h-full mb-[8px]">
                {a.avatar ? (
                  <Image
                    src={a.avatar}
                    alt={a.displayName || "Artist"}
                    width={500}
                    height={500}
                    className="w-full h-[200px] object-cover rounded-[16px]"
                  />
                ) : (
                  <div className="w-full h-[200px]">
                    <Image
                      src={"/images/logo/logo-no-text.png"}
                      alt={a.displayName || "Artist"}
                      width={500}
                      height={500}
                      className="w-full h-full  rounded-[16px]"
                    />
                  </div>
                )}
              </div>

              <div>
                <p className="font-[500] font-logam">{a.displayName}</p>
                <p className="text-muted mb-[4px]">{a.designation}</p>

                {/* genres */}
                {a.genre && a.genre.length > 0 && (
                  <div className="mt-[8px] flex items-center justify-center gap-2 flex-wrap">
                    {a.genre.map((genre) => (
                      <span
                        key={genre._id}
                        className="text-[12px] bg-white/10 border border-white/10 rounded-full px-3 py-1"
                      >
                        {genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)}
                      </span>
                    ))}
                  </div>
                )}

                {/* rating */}
                <div className="flex items-center gap-[4px] font-[500] mt-[8px] mb-[4px]">
                  <p className="flex items-center gap-[4px]">
                    <StarIcon className="w-[22px] h-[22px]" /> {a.reviewCount}
                  </p>
                </div>

                {/* price */}
                <div className="flex items-center gap-[4px] font-[500]">
                  {/* <p className={cn("text-light", a.oldPrice && "text-greeniest")}>
                    ${a.price} {!a.oldPrice && "+"}
                  </p>
                  {a.oldPrice && (
                    <p className="text-muted line-through">${a.oldPrice}+</p>
                  )} */}
                  <p className="text-[18px] font-logam">${a.minStartingPrice}+</p>
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
