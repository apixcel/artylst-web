"use client";

import { BusinessSidebar, BusinessTopBar, DashboardMobileNav } from "@/components";
import { useState } from "react";
import { businessDashboardLink } from "@/constants";
import { IUser } from "@/interface/user.interface";
import { useAppSelector } from "@/hooks";

const BusinessDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <BusinessSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <BusinessTopBar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="p-6">{children}</main>
      </div>

      {/* mobile sidebar */}
      <DashboardMobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={businessDashboardLink}
        user={user as IUser}
      />
    </div>
  );
};

export default BusinessDashboardLayout;
