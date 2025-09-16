import ProfileSidebar from "@/components/shared/FanProfile/ProfileSidebar";
import ProtectedRoute from "@/provider/ProtectedRoute";
import React from "react";

export const metadata = { title: "Fan Profile" };

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute role={["fan"]}>
      <div className="w-full min-h-[100vh] p-3 sm:p-4 md:p-6 flex flex-col xl:flex-row gap-2 xl:gap-3">
        <div className="w-full xl:w-[300px] 2xl:w-[320px]">
          <ProfileSidebar />
        </div>

        <div className="flex-1 min-w-0">
          <div className="card rounded-[8px] min-h-[400px]">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default layout;
