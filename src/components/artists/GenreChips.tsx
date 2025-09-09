"use client";

import { useSetSearchParams } from "@/hooks";
import { useGetGenresQuery } from "@/redux/features/meta/meta.api";

const GenreChips = () => {
  const { data, isLoading } = useGetGenresQuery({});
  const genres = data?.data || [];

  const { searchParams, updateSearchParams } = useSetSearchParams();

  const genreParam = searchParams.get("genre") || "";
  const activeGenres = genreParam ? genreParam.split(",") : [];

  const handleGenreClick = (genre: string) => {
    let newValues: string[];

    if (activeGenres.includes(genre)) {
      newValues = activeGenres.filter((g) => g !== genre);
    } else {
      newValues = [...activeGenres, genre];
    }

    updateSearchParams({
      genre: newValues.length ? newValues.join(",") : undefined,
    });
  };

  return (
    <section className="max-w-7xl mx-auto py-4">
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {genres.map((genre) => (
          <button
            key={genre._id}
            onClick={() => handleGenreClick(genre.slug)}
            className={`chip whitespace-nowrap ${activeGenres.includes(genre.slug) && "chip-active"}`}
          >
            {genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GenreChips;
