"use client";

import { useSetSearchParams } from "@/hooks";
import { useGetGenresQuery } from "@/redux/features/meta/meta.api";

const CategoryChips = () => {
  const { data, isLoading } = useGetGenresQuery({});
  const categories = data?.data || [];

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
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`chip whitespace-nowrap ${activeCategories.includes(category.slug) && "chip-active"}`}
          >
            {category.slug}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryChips;
