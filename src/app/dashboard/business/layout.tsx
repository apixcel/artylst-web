"use client";

import { BusinessSidebar, BusinessTopBar, DashboardMobileNav } from "@/components";
import { useState } from "react";
import { businessDashboardLink } from "@/constants";

const user = {
  name: "Example Business Name",
  email: "example@example.com",
  image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
};

const BusinessDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <BusinessSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <BusinessTopBar
          user={user}
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
        user={user}
      />
    </div>
  );
};

export default BusinessDashboardLayout;
