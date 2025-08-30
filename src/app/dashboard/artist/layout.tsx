"use client";

import { ArtistDeskTopBar, ArtistSidebar } from "@/components";
import { useState } from "react";

const user = {
  name: "Example Artist Name",
  email: "example@example.com",
  image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
};

const ArtistDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <ArtistSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <ArtistDeskTopBar user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default ArtistDashboardLayout;
