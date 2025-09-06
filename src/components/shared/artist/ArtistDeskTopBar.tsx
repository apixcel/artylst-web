import { UserDropdown } from "@/components";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

const ArtistDeskTopBar = ({
  user,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  user: { name: string; email: string; image: string };
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl border-b border-white/10 bg-gradient-to-r from-brand-3/10 to-base-900/10">
      <div className="px-6 py-4 flex justify-between items-center gap-4">
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AlignJustify className="h-6 w-6" />
        </button>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <input
              className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-white rounded-xl pl-10 pr-4 py-2.5 placeholder-white/40"
              placeholder="Search orders, artists, users…"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-white/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm7 1.5-3.25-3.25"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/artist/join-as-featured"
            className="text-light hover:bg-brand-2/10 hover:underline py-[6px] px-[12px] rounded-[20px] text-[14px] font-[500]"
          >
            Join as Featured
          </Link>

          <UserDropdown
            user={user}
            align="right"
            onLogout={() => console.log("logout")}
            items={[
              { type: "link", label: "Profile", href: "/dashboard/artist/profile" },
              { type: "link", label: "Settings", href: "/dashboard/artist/settings" },
            ]}
            className="ml-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default ArtistDeskTopBar;
