import { ArrowRight } from "lucide-react";

const aboutHowItWorks = [
  {
    id: 1,
    title: "Brief",
    description: "Occasion, vibe, platform.",
  },
  {
    id: 2,
    title: "Tell the vibe",
    description: "Artist-crafted playlist.",
  },
  {
    id: 3,
    title: "Delivery",
    description: "Private link + 30s video.",
  },
  {
    id: 4,
    title: "Payout",
    description: "After verification.",
  },
];

const AboutUsSteps = () => {
  return (
    <>
      <section className="mb-[60px]">
        <div className="mb-[16px]">
          <h1 className="mb-[4px] font-bricolage-grotesque">How Artylst works</h1>
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
              <h3 className="mt-[8px] mb-[2px]">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUsSteps;
