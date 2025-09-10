"use client";

import { ArtistSettings, BusinessSettings } from "@/components";
import { useAppSelector } from "@/hooks";

const SettingsView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  return <>{role === "artist" ? <ArtistSettings /> : <BusinessSettings />}</>;
};

export default SettingsView;
