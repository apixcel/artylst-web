"use client";

import Image from "next/image";

const brandSliders = [
  { image: "/images/brands/brand-1.png", name: "Brand Name" },
  { image: "/images/brands/brand-2.png", name: "Brand Name" },
  { image: "/images/brands/brand-3.png", name: "Brand Name" },
  { image: "/images/brands/brand-4.png", name: "Brand Name" },
  { image: "/images/brands/brand-5.png", name: "Brand Name" },
  { image: "/images/brands/brand-6.png", name: "Brand Name" },
  { image: "/images/brands/brand-7.png", name: "Brand Name" },
];

const AboutUsBrandSlider = () => {
  return (
    <section className="overflow-hidden relative w-full mb-[60px]">
      <h2 className="text-center mb-[20px]">Trusted By</h2>
      <div className="flex gap-12 animate-slide">
        {[...brandSliders, ...brandSliders].map((brand, i) => (
          <div key={i} className="flex items-center justify-center flex-shrink-0">
            <Image
              src={brand.image}
              alt={brand.name}
              width={160}
              height={64}
              className="h-14 md:h-16  md:w-[160px] object-contain"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsBrandSlider;
