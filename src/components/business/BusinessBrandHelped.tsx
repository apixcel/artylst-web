import Image from "next/image";

const brands = [
  {
    name: "Café Lumen",
    image: "/images/artists/artist-1.jpg",
    description: "CSwitched to daypart playlists; avg dwell +12%.",
  },
  {
    name: "Studio Flow",
    image: "/images/artists/artist-2.png",
    description: "Instructor-aligned sets; class retention ↑.",
  },
  {
    name: "Nord Retail",
    image: "/images/artists/artist-3.jpg",
    description: "On-brand sound; customer NPS +0.6.",
  },
];

const BusinessBrandHelped = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="mb-[20px]">Brands we’ve helped</h2>

      <div className="grid grid-cols-3 gap-[40px]">
        {brands.map((brand) => (
          <div key={brand.name}>
            <Image src={brand.image} alt={brand.name} width={100} height={100} />
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessBrandHelped;
