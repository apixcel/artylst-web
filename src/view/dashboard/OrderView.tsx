"use client";

import { ArtistOrder, BusinessOrder } from "@/components";
import { useAppSelector } from "@/hooks";

const OrdersPageView = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  return <>{role === "artist" ? <ArtistOrder /> : <BusinessOrder />}</>;
};

export default OrdersPageView;
