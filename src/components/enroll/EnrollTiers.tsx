import Image from "next/image";

const enrollTiers = [
  {
    id: 1,
    title: "Mini Mix",
    description: "15–20 tracks, quick inspiration.",
    earnings: "$20 of $25",
    image: "/images/enroll/enroll-card-img-1.png",
  },
  {
    id: 2,
    title: "Standard",
    description: "30–40 tracks, mood arcs.",
    earnings: "$40 on $50",
    image: "/images/enroll/enroll-card-img-2.png",
  },
  {
    id: 3,
    title: "Deep Dive",
    description: "60+ tracks, liner-notes optional.",
    earnings: "$80 on $100",
    image: "/images/enroll/enroll-card-img-3.png",
  },
];

const EnrollTiers = () => {
  return (
    <section className="mb-[60px] px-[20px]">
      <h2 className="mb-[20px] text-center font-bricolage-grotesque text-[32px] font-[500]">
        Set your tiers & keep control
      </h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-[20px]">
        {enrollTiers.map((tier) => (
          <div
            key={tier.id}
            className="border border-white/10 rounded-[24px] flex items-center relative bg-[linear-gradient(180deg,rgb(0,0,0)_0%,rgba(18,17,20,0.64)_100%)]"
          >
            <div className="w-1/2 pl-[20px]">
              <h3 className="font-bold mt-[8px] mb-[10px] text-[24px] font-bricolage-grotesque">
                {tier.title}
              </h3>
              <p className="text-sm text-muted mb-[10px]">{tier.description}</p>
              <p className="text-[16px]">{tier.earnings}</p>
            </div>
            <div className="w-1/2">
              <Image
                src={tier.image}
                alt={tier.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute z-10 right-0 left-0 bottom-0">
              <Image
                src="/images/enroll/section-bg.png"
                alt={tier.title}
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted text-center">
        * Prices editable anytime. ARTYLST fee 20%.
      </p>
    </section>
  );
};

export default EnrollTiers;
