"use server";

import { IArtist } from "@/interface";
import { baseUrl } from "@/redux/api/api";
import RecentlyViewedArtistSlide from "./RecentlyViewedArtistSlide";

const HomeRecentlyViewed = async () => {
  const res = await fetch(`${baseUrl}/artist/recent-view`, {
    cache: "no-store",
    credentials: "include",
  });

  const data = (await res.json()) as { data: IArtist[] };

  return (
    <section className="mb-[60px]">
      <h2 className="text-2xl font-semibold mb-[20px]">Recently Viewed</h2>
      <RecentlyViewedArtistSlide data={data?.data || []} />
    </section>
  );
};

export default HomeRecentlyViewed;
