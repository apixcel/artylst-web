"use server";

import { ArtistCard, QueryPagination } from "@/components";
import { IMeta, IRankedArtist, TSearchParams } from "@/interface";
import { baseUrl } from "@/redux/api/api";

const FeaturedArtistView = async ({ searchParams }: TSearchParams) => {
  const search = await searchParams;
  const page = search.page || 1;

  const res = await fetch(
    `${baseUrl}/artist/ranked?rankType=featured&page=${page}&limit=10`,
    {
      next: {
        revalidate: 60 * 5,
      },
    }
  );
  const data = (await res.json()) as { data: IRankedArtist[]; meta: IMeta };
  const artists = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <section>
      <div className="wrapper-inner text-center mb-10 xl:mb-16">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">
          Featured Artist
        </h1>
        <p className="text-muted leading-relaxed text-base lg:text-lg">
          ✨ Featured Artists on ARTYLST ✨
        </p>
      </div>

      {/* top artist grid */}
      {artists.length > 0 ? (
        <>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mb-16">
            {artists.map((item, index) => (
              <div className="h-full" key={index}>
                <ArtistCard item={item} index={index} />
              </div>
            ))}
          </div>
          <QueryPagination totalDoc={metaData.totalDoc} />
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-full">
            <p className="text-muted leading-relaxed text-base lg:text-lg">
              No artists found
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedArtistView;
