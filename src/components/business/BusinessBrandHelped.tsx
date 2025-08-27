import Image from "next/image";

const brands = [
  {
    name: "Café Lumen",
    image: "/images/helped-brands/brand-1.png",
    description: "CSwitched to daypart playlists; avg dwell +12%.",
  },
  {
    name: "Studio Flow",
    image: "/images/helped-brands/brand-2.png",
    description: "Instructor-aligned sets; class retention ↑.",
  },
  {
    name: "Nord Retail",
    image: "/images/helped-brands/brand-3.png",
    description: "On-brand sound; customer NPS +0.6.",
  },
];

const BusinessBrandHelped = () => {
  return (
    <section className="mb-[60px]">
      <div className="wrapper">
        <h2 className="mb-[20px]">Brands we’ve helped</h2>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-[20px] relative">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="border border-white/10 rounded-xl 
             bg-gradient-to-br from-brand-2/20 via-brand-3/15 to-brand-5/20 
             p-6 flex flex-col justify-between hover:from-brand-2/30 hover:via-brand-4/20 hover:to-brand-5/30 transition-colors"
            >
              <div className="mb-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={200}
                  height={100}
                  className="w-[140px]"
                />
              </div>

              <h3 className="font-semibold text-lg">{brand.name}</h3>
              <p className="text-white/70 text-sm">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBrandHelped;
