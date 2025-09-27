"use client";
import { DeliverForm } from "@/components";
import { useGetMyArtistOrderByIdQuery } from "@/redux/features/order/order.api";
import dateUtils from "@/utils/date";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ArtistDeliverView = () => {
  const searchParams = useSearchParams();
  const orderIdFromQuery = searchParams.get("order");

  const { data, isLoading, isError } = useGetMyArtistOrderByIdQuery(orderIdFromQuery!, {
    skip: !orderIdFromQuery,
  });
  const order = data?.data;

  // if (order?.status?.includes("delivered")) {
  //   return <div>Order already delivered</div>;
  // }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl">Deliver • Order #{order?.orderId}</h1>

        <div className="flex items-center gap-2">
          <Link href={`/dashboard/messages?order=${order?._id}`} className="btn-tertiary">
            <MessageSquare className="inline h-4 w-4 mr-1" /> Message buyer
          </Link>
        </div>
      </div>

      {/* Body */}
      <div>
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
          {/* Order details */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Buyer</h4>
              <p className="text-base">{order?.deliveryInfo?.name}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Platform</h4>
              <p className="text-base">{order?.platform}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Due</h4>
              <p className="text-base">
                {dateUtils.formatDateWithTime(order?.eta) || "-"}
              </p>
            </div>
          </div>

          <DeliverForm order={order!} />
        </div>
      </div>
    </section>
  );
};

export default ArtistDeliverView;
