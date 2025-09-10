"use client";

import {
  ArtistDeskTopBar,
  ArtistSidebar,
  BusinessSidebar,
  BusinessTopBar,
  DashboardMobileNav,
} from "@/components";
import { artistDashboardLink, businessDashboardLink } from "@/constants";
import { IUser } from "@/interface/user.interface";
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  if (!user) return router.push("/login");

  return (
    <div className="flex min-h-screen">
      {role === "artist" ? (
        <ArtistSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      ) : (
        <BusinessSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        {role === "artist" ? (
          <ArtistDeskTopBar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        ) : (
          <BusinessTopBar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}
        <main className="p-6">{children}</main>
      </div>

      {/* mobile sidebar */}
      <DashboardMobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={role === "artist" ? artistDashboardLink : businessDashboardLink}
        user={user as IUser}
      />
    </div>
  );
};

export default DashboardLayout;
