"use client";

import { ArtistDeskTopBar, ArtistSidebar, DashboardMobileNav } from "@/components";
import { artistDashboardLink } from "@/constants";
import { IUser } from "@/interface/user.interface";
import { useState } from "react";
import { useAppSelector } from "@/hooks";

const ArtistDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <ArtistSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <ArtistDeskTopBar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="p-6">{children}</main>
      </div>

      {/* mobile sidebar */}
      <DashboardMobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={artistDashboardLink}
        user={user as IUser}
      />
    </div>
  );
};

export default ArtistDashboardLayout;
