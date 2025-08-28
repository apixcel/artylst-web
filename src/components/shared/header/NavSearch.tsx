import { Search } from "lucide-react";

const NavSearch = () => {
  return (
    <div className="relative">
      <Search className="absolute w-4.5 h-4.5 left-3 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        placeholder="Search artists, genres…"
        className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2"
      />
    </div>
  );
};

export default NavSearch;
