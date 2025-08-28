"use client";

import { BusinessDeskTopBar, MobTopBar, BusinessSidebar } from "@/components";
import { useState } from "react";

const user = {
  name: "Example Business Name",
  email: "example@example.com",
  image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
};

const BusinessDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <BusinessSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />

      {/* mobile top bar */}
      <MobTopBar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <BusinessDeskTopBar user={user} />
        <main className="p-6">{children}</main>
      </div>
      {/* <footer>© 2025 ARTYLST</footer> */}
    </div>
  );
};

export default BusinessDashboardLayout;
