"use client";

import Link from "next/link";

const categories = [
  { label: "House", value: "house", bgColor: "bg-cyan/80" },
  { label: "Techno", value: "techno", bgColor: "bg-turquoise/80" },
  { label: "Down Tempo", value: "down-tempo", bgColor: "bg-light-blue/80" },
  { label: "Indie Dance", value: "indie-dance", bgColor: "bg-azure/80" },
  { label: "Bass", value: "bass", bgColor: "bg-cyan/80" },
  { label: "Hip Hop", value: "hip-hop", bgColor: "bg-gray/80" },
  { label: "Trance", value: "trance", bgColor: "bg-light-blue/80" },
];

const Categories = () => {
  return (
    <section className="mb-[64px]">
      <div className="mb-[20px]">
        <h2 className="mb-[20px]">Categories</h2>

        <div className="grid grid-cols-3 gap-4">
          {categories.map((item) => (
            <div key={item.value}>
              <Link href={`/artists?category=${item.value}`}>
                <div className={`rounded-[12px] ${item.bgColor} py-10 px-5`}>
                  <span className="mb-[8px] inline-block">Category</span>
                  <h3 className="text-2xl font-bold">{item.label}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
