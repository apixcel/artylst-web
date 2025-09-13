import ProfileSidebar from "@/components/shared/FanProfile/ProfileSidebar";
import ProtectedRoute from "@/provider/ProtectedRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute role="*">
      <div className="w-full flex items-start justify-between gap-3">
        <ProfileSidebar />
        <div className="w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default layout;
