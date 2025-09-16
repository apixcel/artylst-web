"use client";

import { ArtistOrder, BusinessOrder, UnauthorizedMsgBox } from "@/components";
import { useAppSelector } from "@/hooks";

const OrdersPageView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  if (role === "business") {
    return <BusinessOrder />;
  } else if (role === "artist") {
    return <ArtistOrder />;
  } else {
    return <UnauthorizedMsgBox />;
  }
};

export default OrdersPageView;
