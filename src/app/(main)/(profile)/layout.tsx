import ProfileSidebar from "@/components/shared/FanProfile/ProfileSidebar";
import ProtectedRoute from "@/provider/ProtectedRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute role="*">
      <div className="w-full flex items-start justify-between gap-5 min-h-[100vh] flex-col lg:flex-row">
        <ProfileSidebar />
        <div className="w-full card min-h-[400px]">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default layout;
