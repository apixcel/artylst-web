"use server";

import Link from "next/link";
import { baseUrl } from "@/redux/api/api";
import { IRankedArtist } from "@/interface";
import { ArtistCardSlider } from "@/components";

const FeaturedArtists = async () => {
  const res = await fetch(`${baseUrl}/artist/ranked?rankType=featured&limit=10`, {
    next: {
      revalidate: 60 * 5,
    },
  });
  const data = (await res.json()) as { data: IRankedArtist[] };
  const artists = data?.data || [];

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Featured Artists on ARTYLST</h2>
        <Link className="underline" href="/featured-artists">
          View all
        </Link>
      </div>

      <ArtistCardSlider variant="default" artists={artists} />
    </section>
  );
};

export default FeaturedArtists;
