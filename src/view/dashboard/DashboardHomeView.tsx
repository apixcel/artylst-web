"use client";

import { DashboardArtistHome, DashboardBusinessHome } from "@/components";
import { useAppSelector } from "@/hooks";

const DashboardHomeView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  return <>{role === "artist" ? <DashboardArtistHome /> : <DashboardBusinessHome />}</>;
};

export default DashboardHomeView;
