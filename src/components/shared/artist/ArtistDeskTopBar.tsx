"use client";

import {
  NotificationDropdown,
  ProfileCompletenessMeter,
  UserDropdown,
} from "@/components";
import { businessAvatarFallback } from "@/constants/fallBack";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IUser } from "@/interface/user.interface";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { logout as logoutAction } from "@/redux/features/auth/user.slice";
import { AlignJustify } from "lucide-react";

const sample = [
  {
    _id: "1",
    title: "Jonathan Smith place order #123456",
    user: { name: "Jonathon Smith", avatar: "/avatars/1.jpg" },
    timeAgo: "9 hours ago",
    read: false,
  },
  {
    _id: "2",
    title: "Welcome to the app",
    user: { name: "Jonathon Smith", avatar: businessAvatarFallback },
    read: true,
    timeAgo: "9 hours ago",
  },
  {
    _id: "3",
    title: "Billing updated",
    user: { name: "Jonathon Smith", avatar: businessAvatarFallback },
    read: false,
    timeAgo: "9 hours ago",
  },
  {
    _id: "4",
    title: "New comment on your post",
    user: { name: "Jonathon Smith", avatar: businessAvatarFallback },
    read: false,
    timeAgo: "9 hours ago",
  },
];

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
    <div>
      <header className="sticky left-0 right-0 top-0 z-20 backdrop-blur-xl border-b border-white/10 bg-gradient-to-r from-brand-3/10 to-base-900/10">
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
            <NotificationDropdown
              items={sample}
              align="right"
              allHref="/dashboard/notifications"
              onMarkAllRead={() => Promise.resolve()}
              footer={[
                { type: "separator" },
                { type: "button", label: "Clear all", onClick: () => {} },
              ]}
            />

            {user && (
              <UserDropdown
                user={user as IUser}
                align="right"
                onLogout={handleLogout}
                items={[
                  { type: "link", label: "Profile", href: "/dashboard/profile" },
                  { type: "link", label: "Settings", href: "/dashboard/settings" },
                ]}
                className="ml-auto"
              />
            )}
          </div>
        </div>
      </header>
      <ProfileCompletenessMeter />
    </div>
  );
};

export default ArtistDeskTopBar;
