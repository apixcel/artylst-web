import { ArrowRight, Mail, Upload, User, DollarSign } from "lucide-react";

const enrollHowItWorks = [
  {
    id: 1,
    icon: User,
    title: "Create profile",
    description: "Intro video, bio, genres, pricing tiers.",
  },
  {
    id: 2,
    icon: Mail,
    title: "Receive requests",
    description: "Brief includes occasion, platform & personal note.",
  },
  {
    id: 3,
    icon: Upload,
    title: "Deliver",
    description: "Private playlist link + 30s authentication video.",
  },
  {
    id: 4,
    icon: DollarSign,
    title: "Get paid",
    description: "Escrow release after verification.",
  },
];

const EnrollHowItWorks = () => {
  return (
    <section id="artist-steps" className="mb-[60px] scroll-mt-[100px]">
      <div className="wrapper">
        <div className="mb-[16px]">
          <h2 className="mb-[20px] text-center text-[32px] font-[500]">
            How it works for artists
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {enrollHowItWorks.map((item, index) => (
            <div
              key={item.id}
              className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10"
            >
              <div className="flex items-center gap-[8px] mb-[16px]">
                Step <ArrowRight className="w-[16px] h-[16px]" />
                <p className="text-[18px] font-[500] border border-gray-55 w-[24px] h-[24px] flex-center rounded-full inline-block">
                  {index + 1}
                </p>
              </div>
              <item.icon className="w-[24px] h-[24px]" />
              <h3 className="mt-[8px] mb-[2px]">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnrollHowItWorks;
