import Link from "next/link";

const EnrollCTA = () => {
  return (
    <section className="wrapper mb-[64px]">
      <div className="p-[24px] card bg-fog-transparent-24 flex items-center justify-between gap-[60px]">
        <div>
          <h1 className="font-bricolage-grotesque">Ready to curate?</h1>
          <p className="text-muted mb-[20px]">
            Send your profile preview & sample playlists—our team vets for taste,
            reliability, and niche voice.
          </p>

          <ol className="flex flex-col gap-[16px]">
            <li className="text-[16px] font-[500] text-greeniest">
              Intro video (30–60s)
            </li>
            <li className="text-[16px] font-[500] text-lime">3 sample playlists</li>
            <li className="text-[16px] font-[500] text-neon-blue">
              Preferred turnaround
            </li>
          </ol>
        </div>
        <div className="flex items-center gap-[16px]">
          <Link
            href="mailto:artylst@gmail.com"
            className="text-[16px] bg-transparent font-[500] text-light px-[32px] py-[16px] border border-white/10 rounded-[100px] hover:bg-white/10 transition-all duration-300 font-bricolage-grotesque"
          >
            mailto:talent@artylst.com
          </Link>
          <Link
            href="/artists"
            className="text-[16px] font-[500] bg-light text-black px-[32px] py-[16px] rounded-[100px] hover:bg-light/80 transition-all duration-300"
          >
            Apply as Artist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnrollCTA;
