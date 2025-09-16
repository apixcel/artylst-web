import Link from "next/link";

const ChooseRolePage = () => {
  return (
    <section className="w-full">
      <div className="max-w-[700px] text-center px-[20px] mb-[30px] mx-auto">
        <h1 className="text-[36px] sm:text-[40px] xl:text-[44px] leading-[40px] sm:leading-[44px] xl:leading-[48px] font-[500] mb-[20px]">
          <span className="gradient-text">Welcome to ARTYLST </span>{" "}
          <span>Choose your role</span>
        </h1>
        <p className="text-muted text-[16px] lg:px-0 px-[40px]">
          ARTYLST is a platform that offers a unique way to create and manage your own
          playlist. Choose your role to get started.
        </p>
      </div>

      <h1 className="text-center mb-[16px]">Join as</h1>
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {/* fan */}
        <Link
          href="/register"
          className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10 w-full inline-block border border-brand-2/20 hover:border-light/40 transition-all duration-300"
        >
          <h1 className="mb-[12px] text-center">Fan</h1>
          <p className="text-muted mb-[8px]">
            Listen to your favorite music and create your own playlist.
          </p>
        </Link>

        {/* artist */}
        <Link
          href="/join-as-artist"
          className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10 w-full inline-block border border-brand-2/20 hover:border-light/40 transition-all duration-300"
        >
          <h1 className="mb-[12px] text-center">Artist</h1>
          <p className="text-muted mb-[8px]">
            Create your artist profile and start earning money by creating playlists for
            fan and businesses.
          </p>
        </Link>

        {/* business */}
        <Link
          href="/business-form"
          className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10 w-full inline-block border border-brand-2/20 hover:border-light/40 transition-all duration-300"
        >
          <h1 className="mb-[12px] text-center">Business</h1>
          <p className="text-muted mb-[8px]">
            Create your business profile for your business.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ChooseRolePage;
