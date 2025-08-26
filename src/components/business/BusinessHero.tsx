import Link from "next/link";

const BusinessHero = () => {
  return (
    <section className="flex justify-center items-center mb-[60px]">
      <div className="max-w-[800px] text-center">
        <h1 className="font-bricolage-grotesque text-[36px] xl:text-[40px] font-[500] mb-[20px]">
          Your brand, your sound—custom playlists by real artists.
        </h1>
        <p className="text-muted text-[16px]">
          Yoga studios, cafés, salons, retail floors—get a private playlist aligned with
          your brand. Delivery includes a 30-second authentication video. ARTYLST handles
          escrow, privacy and payouts.
        </p>

        <div className="my-[20px] flex justify-center items-center gap-[16px]">
          <Link
            href="/#"
            className="px-8 py-3 rounded-full font-semibold text-white 
               bg-gradient-to-b from-purple-500 to-purple-800 
               border border-purple-600
               shadow-md transition-all duration-300
               hover:from-purple-400 hover:to-purple-700"
          >
            Request a playlist
          </Link>
          <Link
            href="/enroll/#how-it-works"
            className="text-[16px] bg-transparent font-[500] text-light px-[32px] py-[16px] border border-white/10 rounded-[100px] hover:bg-white/10 transition-all duration-300 font-bricolage-grotesque"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
