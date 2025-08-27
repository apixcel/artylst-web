import { ArrowRight } from "lucide-react";

const businessSteps = [
  {
    id: 1,
    title: "Share your vibe",
    description: "Occasion, hours, audience, preferred platform.",
  },
  {
    id: 2,
    title: "Artist curation",
    description: "Vetted artist crafts your private playlist.",
  },
  {
    id: 3,
    title: "Delivery",
    description: "Private link + 30s auth video—no personal info shared.",
  },
  {
    id: 4,
    title: "Refresh monthly",
    description: "Re-order or subscribe for updates each cycle.",
  },
];

const BusinessSteps = () => {
  return (
    <section id="business-steps" className="mb-[60px] scroll-mt-[100px]">
      <div className="wrapper">
        <div className="mb-[16px]">
          <h2 className="mb-[20px] text-center font-bricolage-grotesque text-[32px] font-[500]">
            From request to results—fast
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {businessSteps.map((item, index) => (
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
      </div>
    </section>
  );
};

export default BusinessSteps;
