import Image from "next/image";

const enrollTiers = [
  {
    id: 1,
    title: "Mini Mix",
    description: "15–20 tracks, quick inspiration.",
    earnings: "$20 of $25",
    image: "/images/artists/artist-1.jpg",
  },
  {
    id: 2,
    title: "Standard",
    description: "30–40 tracks, mood arcs.",
    earnings: "$40 on $50",
    image: "/images/artists/artist-2.png",
  },
  {
    id: 3,
    title: "Deep Dive",
    description: "60+ tracks, liner-notes optional.",
    earnings: "$80 on $100",
    image: "/images/artists/artist-3.jpg",
  },
];

const EnrollTiers = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="mb-[20px]">Set your tiers & keep control</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-[20px]">
        {enrollTiers.map((tier) => (
          <div key={tier.id} className="p-[20px] rounded-[24px] text-center">
            <h3 className="font-bold mt-[8px] mb-[2px] font-bricolage-grotesque">
              {tier.title}
            </h3>
            <p className="text-sm text-muted">{tier.description}</p>
            <p className="text-sm text-muted">{tier.earnings}</p>
            <div className="flex-center mt-[20px] rounded-[16px] overflow-hidden">
              <Image
                src={tier.image}
                alt={tier.title}
                width={100}
                height={100}
                className="rounded-[16px]"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">* Prices editable anytime. ARTYLST fee 20%.</p>
    </section>
  );
};

export default EnrollTiers;
