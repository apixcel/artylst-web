"use client";

import { ArtistOrderDetailsSkeleton } from "@/components";
import { statusOption } from "@/constants/orderStatus";
import { useGetMyArtistOrderByIdQuery } from "@/redux/features/order/order.api";
import { cn } from "@/utils";
import dateUtils from "@/utils/date";
import { format } from "date-fns";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  Clock,
  Copy,
  Music,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const chipClass = (status?: string) => {
  if (!status) return "bg-white/10 text-white";
  const cfg = statusOption[status as keyof typeof statusOption];
  return cfg?.className || "bg-white/10 text-white";
};

const fmtMoney = (n?: number | string) => {
  if (n === undefined || n === null) return "-";
  const num = typeof n === "string" ? Number(n) : n;
  if (Number.isNaN(num)) return String(n);
  return `$${num.toFixed(2)}`;
};

const InfoRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-between py-2 border-b border-white/5 ${className}`}
  >
    <span className="text-white/60 text-sm">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl p-5 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);

const ArtistOrderDetailsView = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const orderIdFromRoute = params?.id;

  const { data, isLoading, isError } = useGetMyArtistOrderByIdQuery(orderIdFromRoute);
  const order = data?.data;

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  if (isLoading) return <ArtistOrderDetailsSkeleton />;

  if (isError || !order) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <Card>
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-10 w-10 text-yellow-400 mb-3" />
            <div className="font-heading text-lg">We couldn&apos;t load this order</div>
            <div className="text-white/60 text-sm mt-1">
              The order may not exist or you don&apos;t have access.
            </div>
            <Link
              href="/dashboard/orders"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/10 border border-white/10"
            >
              Go to Orders
            </Link>
          </div>
        </Card>
      </section>
    );
  }

  const lastStatusIndex = (order.status?.length || 1) - 1;
  const status = order.status?.[lastStatusIndex].status;
  const statusCfg = status
    ? statusOption[status as keyof typeof statusOption]
    : undefined;

  const isDeliverDisabled = [
    "delivered",
    "accepted",
    "cancelled",
    "canceled",
    "refunded",
  ].includes(status);

  const eta = order.eta ? dateUtils.formatDate(order.eta) : "-";
  const created = order.createdAt ? dateUtils.formatDate(order.createdAt) : "-";
  const deliveryWindow = order.deliveryWindow ? `${order.deliveryWindow}` : "-";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="space-y-1">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="text-2xl md:text-3xl font-heading">Order #{order.orderId}</h1>
          <p className="text-white/60 text-sm">Placed on {created}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(String(order.orderId));
                setCopied(true);
              } catch (e) {
                setCopied(false);
              }
            }}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy ID"}
          </button>
          <Link
            href="/dashboard/orders"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: order summary */}
        <div className="xl:col-span-2 space-y-4">
          {/* Status strip */}
          <Card className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`chip capitalize ${chipClass(status)}`}>
                {statusCfg?.label || status}
              </span>
              <span className="text-white/60 text-sm">Current status</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CalendarClock className="h-4 w-4" /> ETA: {eta}
              <span className="opacity-30">•</span>
              <Clock className="h-4 w-4" /> Delivery Window: {deliveryWindow}
              <span className="opacity-30">•</span>
              Revisions: {order.revision}/{order.maxRevision || 0}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                <h2 className="font-heading text-lg">Order Summary</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="Order ID" value={`#${order.orderId}`} />
              <InfoRow
                label="Platform"
                value={<span className="capitalize">{order.platform}</span>}
              />
              <InfoRow label="Tier" value={order.tier || "-"} />
              <InfoRow label="Price" value={fmtMoney(order.price)} />
              <InfoRow label="ETA" value={eta} />
              <InfoRow label="Delivery Window" value={deliveryWindow} />
            </div>

            {order.addOn?.label && (
              <div className="mt-4">
                <div className="text-white/60 text-sm mb-2">Add-ons</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">{order.addOn.label}</div>
                  <div className="text-sm">{fmtMoney(order.addOn.price)}</div>
                </div>
              </div>
            )}
          </Card>

          {/* Notes / Activity placeholder (extend later) */}
          <Card>
            <h2 className="font-heading text-lg mb-3">Activity</h2>
            {order.status.length ? (
              <div className="flex flex-col gap-1">
                {order.status.map((s, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`chip capitalize ${chipClass(s.status)}`}>
                        {s.status}
                      </span>
                      {s.createdAt ? (
                        <span className="text-white/60 text-sm">
                          {format(s.createdAt, "MMM do, h:mm a")}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    {!s.note ? <div className="text-sm">{s.note}</div> : ""}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/60 text-sm">
                No activity yet. Updates will appear here.
              </div>
            )}
          </Card>
        </div>

        {/* Right: buyer / delivery info */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5" />
              <h3 className="font-heading">Buyer</h3>
            </div>
            <InfoRow
              className="last:border-b-0"
              label="Name"
              value={order.deliveryInfo?.name || "-"}
            />
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="h-5 w-5" />
              <h3 className="font-heading">Payment</h3>
            </div>
            <InfoRow label="Subtotal" value={fmtMoney(order.price)} />
            {order.addOn?.price ? (
              <InfoRow label="Add-ons" value={fmtMoney(order.addOn.price)} />
            ) : null}
            <div className="flex items-center justify-between pt-3 mt-2">
              <span className="text-white/80">Total</span>
              <span className="text-white font-semibold">
                {fmtMoney((Number(order.price) || 0) + (Number(order.addOn?.price) || 0))}
              </span>
            </div>
            <Link
              href={`/dashboard/deliver?order=${order._id}`}
              aria-disabled={isDeliverDisabled}
              title={
                isDeliverDisabled
                  ? "Delivery is unavailable for this status"
                  : "Deliver now"
              }
              className={cn(
                "btn-secondary w-full mt-3 inline-block text-center",
                isDeliverDisabled && "pointer-events-none opacity-50 cursor-not-allowed"
              )}
            >
              Deliver Now
            </Link>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-heading">Help</h3>
            </div>
            <div className="text-sm text-white/70">Having an issue with this order?</div>
            <button className="mt-3 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Open Dispute
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArtistOrderDetailsView;
