"use client";

import { UserDropdown } from "@/components";
import { AlignJustify } from "lucide-react";
import { useLogoutMutation } from "@/redux/features/user/user.api";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { IUser } from "@/interface/user.interface";

const ArtistDeskTopBar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(logoutAction(undefined));
    window.location.href = "/login";
  };

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

        {user && (
          <div className="flex items-center gap-4">
            <UserDropdown
              user={user as IUser}
              align="right"
              onLogout={handleLogout}
              items={[
                { type: "link", label: "Profile", href: "/dashboard/artist/profile" },
                { type: "link", label: "Settings", href: "/dashboard/artist/settings" },
              ]}
              className="ml-auto"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default ArtistDeskTopBar;
