import Link from "next/link";

const BusinessHero = () => {
  return (
    <section className="flex justify-center items-center py-[20px] sm:py-[40px] lg:py-[60px]">
      <div className="max-w-[700px] text-center px-[20px]">
        <h1 className="text-[40px] xl:text-[44px] leading-[48px] font-[500] mb-[20px]">
          <span className="gradient-text">Private playlist </span>{" "}
          <span>as custom and unique as your business</span>
        </h1>
        <p className="text-muted text-[16px] lg:px-0 px-[40px]">
          Yoga Studios, Lounge Bars, Retail Floors, Waiting Rooms-get a custom playlist
          from an artist that matches the vibe. Can’t narrow it down? Allow us to find the
          perfect artist based on your answers to our quick request form.
        </p>

        <div className="my-[20px] flex sm:flex-row flex-col justify-center items-center gap-[16px]">
          <Link
            href="/business-form"
            className="px-8 py-3 rounded-full font-semibold text-white 
               bg-gradient-to-b from-brand-1/50 to-brand-3/40 
               border border-brand-4/10 
               shadow-md transition-all duration-300
               hover:from-brand-1/70 hover:to-brand-3/60 font-logam"
          >
            Request a playlist
          </Link>
          <Link
            href="/artists"
            className="text-[16px] bg-transparent font-[500] text-light px-[32px] py-[16px] border border-white/10 rounded-[100px] hover:bg-white/10 transition-all duration-300 font-logam"
          >
            Browse artists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
