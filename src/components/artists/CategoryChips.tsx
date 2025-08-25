"use client";

import { useSetSearchParams } from "@/hooks";
import { categories } from "@/constants";

const CategoryChips = () => {
  const { searchParams, updateSearchParams } = useSetSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const activeCategories = categoryParam ? categoryParam.split(",") : [];

  const handleCategoryClick = (category: string) => {
    let newValues: string[];

    if (activeCategories.includes(category)) {
      newValues = activeCategories.filter((c) => c !== category);
    } else {
      newValues = [...activeCategories, category];
    }

    updateSearchParams({
      category: newValues.length ? newValues.join(",") : undefined,
    });
  };

  return (
    <section className="max-w-7xl mx-auto py-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryClick(category.value)}
            className={`chip ${activeCategories.includes(category.value) && "chip-active"}`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryChips;
