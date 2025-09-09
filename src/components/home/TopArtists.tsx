"use server";

import Link from "next/link";
import { ArtistCardSlider } from "@/components";
import { IRankedArtist } from "@/interface";
import { baseUrl } from "@/redux/api/api";

export default async function TopArtists() {
  const res = await fetch(`${baseUrl}/artist/ranked?rankType=top&limit=10`, {
    next: {
      revalidate: 60 * 5,
    },
  });
  const data = (await res.json()) as { data: IRankedArtist[] };
  const artists = data?.data || [];

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Top Artists on ARTYLST</h2>
        <Link className="underline" href="/top-artists">
          View all
        </Link>
      </div>

      <ArtistCardSlider artists={artists} />
    </section>
  );
}
