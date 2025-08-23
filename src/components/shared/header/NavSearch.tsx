import { Search } from "lucide-react";

const NavSearch = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute w-4.5 h-4.5 left-3 top-1/2 -translate-y-1/2 text-black" />
      <input
        type="text"
        placeholder="Search for Dallas Cowboys"
        className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-200 text-black placeholder:text-gray-40 focus:outline-none bg-white text-[16px]"
      />
    </div>
  );
};

export default NavSearch;
