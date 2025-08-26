import Image from "next/image";
import Link from "next/link";

const EnrollHero = () => {
  return (
    <section className="flex items-center gap-[40px] xl:gap-[60px] mb-[60px]">
      <div className="w-full lg:w-1/2 lg:max-w-full max-w-[500px]">
        <h1 className="font-bricolage-grotesque text-[36px] xl:text-[40px] font-[500] mb-[20px]">
          Monetize your taste. Curate playlists—your way.
        </h1>
        <p className="text-muted text-[16px]">
          Fans & businesses commission you to craft private playlists. Deliver a streaming
          link + a 30-second authentication video. You keep control & privacy—ARTYLST
          handles escrow, support, and payouts.
        </p>

        <div className="my-[20px] flex items-center gap-[16px]">
          <Link
            href="/#"
            className="px-8 py-3 rounded-full font-semibold text-white 
                 bg-gradient-to-b from-purple-500 to-purple-800 
                 border border-purple-600
                 shadow-md transition-all duration-300
                 hover:from-purple-400 hover:to-purple-700"
          >
            Start Application
          </Link>
          <Link
            href="/enroll/#how-it-works"
            className="text-[16px] bg-transparent font-[500] text-light px-[32px] py-[16px] border border-white/10 rounded-[100px] hover:bg-white/10 transition-all duration-300 font-bricolage-grotesque"
          >
            How it works
          </Link>
        </div>
      </div>

      <div className="w-1/2 lg:block hidden">
        <Image
          src="/images/enroll/enroll-bg.jpg"
          alt="Hero image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-[16px]"
          priority
        />
      </div>
    </section>
  );
};

export default EnrollHero;
