"use client";

import { DeskTopBar, MobTopBar, Sidebar } from "@/components";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* mobile top bar */}
      <MobTopBar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* desktop top bar */}
        <DeskTopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
