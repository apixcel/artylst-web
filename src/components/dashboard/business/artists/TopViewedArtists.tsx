import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { useGetTopViewedArtistQuery } from "@/redux/features/artist/artist.api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArtistComonCard from "./ArtistComonCard";
import FavoriteArtistCardSkeleton from "./favoriteArtist/FavoriteArtistCardSkeleton";
const TopViewedArtists = () => {
  const { data, isLoading } = useGetTopViewedArtistQuery(undefined);
  const artists = data?.data || [];
  return (
    <Card>
      <SectionHeader title="Most browsed" subtitle="By views in the last 30 days" />

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[FreeMode, Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".popular-next",
          prevEl: ".popular-prev",
        }}
        className="group business-popular-artists-swiper"
      >
        {isLoading ? (
          <>
            <SwiperSlide>
              <FavoriteArtistCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <FavoriteArtistCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <FavoriteArtistCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <FavoriteArtistCardSkeleton />
            </SwiperSlide>
          </>
        ) : (
          artists.map((a) => (
            <SwiperSlide key={a._id}>
              <ArtistComonCard artist={a} />
            </SwiperSlide>
          ))
        )}

        {/* navigation */}
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2 w-full z-30">
          <button className="popular-prev nav-button left-8 absolute">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="popular-next nav-button right-8 absolute">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Swiper>
    </Card>
  );
};

export default TopViewedArtists;
