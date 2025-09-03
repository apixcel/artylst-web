import { ArrowRight, Search, Pen, Mail, Upload } from "lucide-react";

const aboutHowItWorks = [
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

const AboutUsSteps = () => {
  return (
    <>
      <section className="mb-[60px]">
        <div className="mb-[16px]">
          <h1 className="mb-[4px] font-bricolage-grotesque">How ARTYLST works</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {aboutHowItWorks.map((item, index) => (
            <div
              key={item.id}
              className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10"
            >
              <div className="flex items-center gap-[8px] mb-[16px]">
                Step <ArrowRight className="w-[16px] h-[16px]" />
                <p className="text-[18px] font-[500] font-bricolage-grotesque border border-gray-55 w-[24px] h-[24px] flex-center rounded-full inline-block">
                  {index + 1}
                </p>
              </div>
              <item.icon className="w-[24px] h-[24px]" />
              <h3 className="mt-[12px] mb-[2px]">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUsSteps;
