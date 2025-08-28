import Link from "next/link";

const BusinessCTA = () => {
  return (
    <section className="wrapper mb-[64px]">
      <div className="p-[24px] card bg-fog-transparent-24 flex items-center justify-between gap-[40px] xl:gap-[60px] flex-col lg:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-bricolage-grotesque">Tell us about your space</h1>
          <p className="text-muted mb-[20px] px-[40px] md:px-0">
            We’ll match you with an artist who understands your brand. Typical turnaround
            48–72h.
          </p>

          <ol className="flex flex-col gap-[12px] sm:gap-[16px]">
            <li className="text-[14px] sm:text-[16px] font-[500] text-greeniest">
              Intro video (30–60s)
            </li>
            <li className="text-[14px] sm:text-[16px] font-[500] text-lime">
              3 sample playlists
            </li>
            <li className="text-[14px] sm:text-[16px] font-[500] text-neon-blue">
              Preferred turnaround
            </li>
          </ol>
        </div>
        <div className="flex xl:flex-row lg:flex-col items-center gap-[16px]">
          <Link
            href="/contact"
            className="text-[16px] bg-transparent font-[500] text-light px-[20px] sm:px-[32px] py-[12px] sm:py-[16px] border border-white/10 rounded-[100px] hover:bg-white/10 transition-all duration-300 font-bricolage-grotesque"
          >
            Contact us
          </Link>
          <Link
            href="/business-form"
            className="text-[16px] font-[500] bg-light text-black px-[20px] sm:px-[32px] py-[12px] sm:py-[16px] rounded-[100px] hover:bg-light/80 transition-all duration-300"
          >
            Start a request
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;
