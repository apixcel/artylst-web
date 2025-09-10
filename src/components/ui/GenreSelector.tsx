"use client";

import { useDebounce } from "@/hooks";
import { IGenre } from "@/interface";
import { useGetGenresQuery } from "@/redux/features/meta/meta.api";
import { useState } from "react";
import Dropdown from "../shared/Dropdown";

interface GenreSelectorProps {
  onChange?: (genre: IGenre | undefined) => void;
  className?: string;
}
const GenreSelector: React.FC<GenreSelectorProps> = ({ onChange, className }) => {
  const [searchTerm, setSearchTerm] = useDebounce("");

  const [selected, setSelected] = useState<Pick<IGenre, "label" | "slug">>();

  const { data } = useGetGenresQuery({ searchTerm });
  const genres = data?.data || [];
  return (
    <Dropdown
      value={
        selected
          ? { label: selected?.label, value: selected?.slug }
          : { label: "All", value: "" }
      }
      options={[
        { label: "All", value: "" },
        ...genres.map((g) => ({ label: g.label, value: g.slug })),
      ]}
      onChange={(e) => {
        const data = genres.find((g) => g.slug === e.value);
        setSelected(data);
        onChange?.(data);
      }}
      onInputChange={setSearchTerm}
      className={className}
      buttonClassName="bg-transparent border-transparent w-full"
      panelClassName="bg-black"
    />
  );
};

export default GenreSelector;
