import Link from "next/link";

const BusinessHero = () => {
  return (
    <section className="flex justify-center items-center py-[60px]">
      <div className="max-w-[700px] text-center px-[20px]">
        <h1 className="text-[40px] xl:text-[44px] leading-[48px] font-[500] mb-[20px]">
          <span className="gradient-text">Your brand, your sound—</span>
          <span>custom playlists by real artists.</span>
        </h1>
        <p className="text-muted text-[16px] lg:px-0 px-[40px]">
          Yoga studios, cafés, salons, retail floors—get a private playlist aligned with
          your brand. Delivery includes a 30-second authentication video. ARTYLST handles
          escrow, privacy and payouts.
        </p>

        <div className="my-[20px] flex sm:flex-row flex-col justify-center items-center gap-[16px]">
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
            href="#business-steps"
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
