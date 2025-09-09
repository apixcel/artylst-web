"use server";

import { ArtistCard, FAQ, QueryPagination, TopArtistSteps } from "@/components";
import { IMeta, IRankedArtist, TSearchParams } from "@/interface";
import { baseUrl } from "@/redux/api/api";

const faqs = [
  {
    q: "Which platforms do you support?",
    a: "Spotify, Apple Music, YouTube Music — the artist will deliver a private link.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 2–5 business days depending on scope. You'll see an ETA at checkout and get updates by email.",
  },
  {
    q: "Do you share personal contact info?",
    a: "No. We keep communication inside the platform for safety and privacy.",
  },
  {
    q: "What if I need a revision?",
    a: "You can request revisions within 7 days of delivery. Minor fixes are usually turned around in 24–48 hours.",
  },
  {
    q: "Can I cancel an order?",
    a: "Yes, you can cancel before the artist has started working. Once work has begun, cancellations may be subject to partial refunds depending on progress.",
  },
  {
    q: "How do payments work?",
    a: "All payments are handled securely through our platform. Funds are held in escrow and only released to the artist once the order is completed and approved.",
  },
  {
    q: "Do artists retain rights to the music?",
    a: "Yes. Unless you’ve purchased a business or exclusive license, artists retain copyright ownership. You’re buying usage rights as outlined in the tier you select.",
  },
];

const TopArtistView = async ({ searchParams }: TSearchParams) => {
  const search = await searchParams;
  const page = search.page || 1;

  const res = await fetch(`${baseUrl}/artist/ranked?rankType=top&page=${page}&limit=10`, {
    next: {
      revalidate: 60 * 5,
    },
  });
  const data = (await res.json()) as { data: IRankedArtist[]; meta: IMeta };
  const artists = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <section>
      <div className="wrapper-inner text-center mb-10 xl:mb-16">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">
          ARTYLST Leaderboard
        </h1>
        <p className="text-muted leading-relaxed text-base lg:text-lg">
          ✨ Top 100 Artists on ARTYLST ✨
        </p>
      </div>

      {/* top artist grid */}
      {artists.length > 0 ? (
        <>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mb-16">
            {artists.map((item, index) => (
              <div className="h-full" key={index}>
                <ArtistCard item={item} index={index} variant="home" />
              </div>
            ))}
          </div>
          <QueryPagination totalDoc={metaData.totalDoc} />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted leading-relaxed text-base lg:text-lg">
            No artists found
          </p>
        </div>
      )}

      {/* how it works */}
      <TopArtistSteps />

      {/* faq */}
      <FAQ items={faqs} columns={1} breakpoint="lg" className="wrapper-inner" />
    </section>
  );
};

export default TopArtistView;
