"use client";

import { MobileNav, NavSearch, UserDropdown } from "@/components";
import { mainNavLinks } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IUser } from "@/interface";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { logout as logoutAction } from "@/redux/features/auth/user.slice";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MainHeader = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(logoutAction(undefined));
    window.location.href = "/login";
  };

  return (
    <header className="sticky bg-transparent top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] py-[8px]">
        <nav className="flex items-center justify-between lg:mb-0 mb-4">
          {/* menu toggle button */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            {/* mobile logo */}
            <Link className="sm:hidden" href="/">
              <Image
                src="/images/logo/logo-no-text.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[30px] h-[30px]"
              />
            </Link>
          </div>

          <div className="lg:flex items-center gap-4">
            {/* desktop logo */}
            <Link className="lg:flex flex-col hidden items-center gap-[2px]" href="/">
              <Image
                src="/images/logo/logo-no-text.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[50px] h-[55px]"
              />
              <span className="font-logam">ARTYLST</span>
            </Link>

            {/* mobile logo */}
            <Link className="lg:hidden sm:block hidden" href="/">
              <Image
                src="/images/logo/logo-no-text.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[45px] h-[45px]"
              />
            </Link>

            {/* nav links */}
            <ul className="lg:flex hidden items-center">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-light rounded-[20px] hover:bg-brand-2/10 text-[16px] flex-1 py-[8px] px-[12px]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-4 lg:flex-1">
            {/* search */}
            <div className="lg:block hidden max-w-[480px] w-full">
              <NavSearch />
            </div>

            {/* login */}
            {user ? (
              <UserDropdown
                user={user as IUser}
                onLogout={handleLogout}
                items={[
                  { type: "link", label: "Dashboard", href: "/dashboard" },
                  { type: "link", label: "Profile", href: "/dashboard/profile" },
                  { type: "link", label: "Settings", href: "/dashboard/settings" },
                ]}
              />
            ) : (
              <Link
                className="text-light hover:bg-brand-2/10 hover:underline py-[6px] px-[12px] rounded-[20px] text-[14px] font-[500]"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* search bottom mobile */}
        <div className="lg:hidden">
          <NavSearch />
        </div>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen}
        navLinks={mainNavLinks}
      />
    </header>
  );
};

export default MainHeader;
