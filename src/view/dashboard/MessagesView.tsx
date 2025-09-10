"use client";

import { ArtistMessages, BusinessMessages } from "@/components";
import { useAppSelector } from "@/hooks";

const MessagesView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;
  return <>{role === "artist" ? <ArtistMessages /> : <BusinessMessages />}</>;
};

export default MessagesView;
