import { ArrowRight, Mail, Pen, Search, Upload } from "lucide-react";
import Link from "next/link";

const homeHowItWorks = [
  {
    id: 1,
    icon: Search,
    title: "Find an artist",
    description:
      " Browse thousands of artists offering personalized playlists. Within each artist profile, you may then choose the length of the playlist desired with different pricing for each.",
  },
  {
    id: 2,
    icon: Pen,
    title: "Provide order details",
    description:
      "During checkout, you’ll provide the artist with details such as whether you are a fan or business, the occasion, your preferred streaming platform and any personal note you wish to leave for the artist so they can make the perfect personalized playlist.",
  },
  {
    id: 3,
    icon: Mail,
    title: "Get your playlist",
    description:
      "Once Playlist has been completed by the artist, you will receive notification via email with a private streaming link and 30s authentication video from ARTYLST.",
  },
  {
    id: 4,
    icon: Upload,
    title: "Share and Enjoy",
    description:
      "Share your video with friends and get your personalized playlist cranking on the nearest set of speakers.",
  },
];

const HomeHowItWorks = () => {
  return (
    <section id="how-artylst-works" className="mb-[60px] scroll-mt-[100px]">
      <div className="mb-[16px]">
        <h2 className="mb-[4px]">How ARTYLST works</h2>
        <p>
          Get a personalized playlist in just four steps.{" "}
          <Link href="/about-us" className="underline font-[500]">
            Learn more
          </Link>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {homeHowItWorks.map((item, index) => (
          <div key={item.id} className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10">
            <div className="flex items-center gap-[8px] mb-[16px]">
              Step <ArrowRight className="w-[16px] h-[16px]" />
              <p className="text-[18px] font-[500] font-bricolage-grotesque border border-gray-55 w-[24px] h-[24px] flex-center rounded-full inline-block">
                {index + 1}
              </p>
            </div>
            <item.icon className="w-[24px] h-[24px]" />
            <h3 className="mt-[8px] mb-[2px]">{item.title}</h3>
            <p className="text-muted font-logam">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHowItWorks;
