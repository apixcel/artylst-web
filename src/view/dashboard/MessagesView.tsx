"use client";

import { MessageView, BusinessMessages } from "@/components";
import { useAppSelector } from "@/hooks";

const MessagesView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;
  return <>{role === "artist" ? <MessageView /> : <BusinessMessages />}</>;
};

export default MessagesView;
