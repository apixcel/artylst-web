"use client";

import { Dropdown, Pagination } from "@/components";
import { statusOption } from "@/constants/orderStatus";
import { useDebounce } from "@/hooks";
import { DropdownOption } from "@/interface";
import { useGetMyFanOrderQuery } from "@/redux/features/order/order.api";
import dateUtils from "@/utils/date";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// --- Filters ---
const statusOptions: DropdownOption<string>[] = [
  { label: "All", value: "" },
  ...Object.entries(statusOption).map(([k, v]) => ({ label: v.label, value: k })),
];

const platformOptions: DropdownOption<string>[] = [
  { label: "All Platforms", value: "" },
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple" },
  { label: "YouTube Music", value: "youtube" },
];

const tierOptions: DropdownOption<string>[] = [
  { label: "All Tiers", value: "" },
  { label: "Mini", value: "Mini" },
  { label: "Standard", value: "Standard" },
  { label: "Deluxe", value: "Deluxe" },
];
const FanOrdersView = () => {
  const [status, setStatus] = useState<DropdownOption<string>>({
    label: "All",
    value: "",
  });
  const [platform, setPlatform] = useState<DropdownOption<string>>({
    label: "All Platforms",
    value: "",
  });
  const [tier, setTier] = useState<DropdownOption<string>>({
    label: "All Tiers",
    value: "",
  });

  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useDebounce("");

  const { data } = useGetMyFanOrderQuery({
    status: status.value,
    platform: platform.value,
    tier: tier.value,
    searchTerm,
  });

  const orderData = data?.data || [];

  return (
    <div className="p-4 flex flex-col gap-4">
      <h4 className="text-lg font-semibold">My Orders</h4>

      {/* Filter bar */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 gap-3 flex items-end sm:justify-start md:justify-between flex-wrap">
        <div className="flex items-center justify-start gap-2 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-muted mr-2">Status</label>
            <Dropdown
              value={status}
              options={statusOptions}
              onChange={(v) => setStatus(v)}
              buttonClassName="md:w-50 w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-muted mr-2">Platform</label>
            <Dropdown
              value={platform}
              options={platformOptions}
              onChange={(v) => setPlatform(v)}
              buttonClassName="md:w-50 w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-muted mr-2">Tier</label>
            <Dropdown
              value={tier}
              options={tierOptions}
              onChange={(v) => setTier(v)}
              buttonClassName="md:w-50 w-40"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 flex-1 w-full md:w-auto">
          <Search className="h-4 w-4 text-white/60" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search By Order Id/Tier"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <table className="w-full overflow-auto">
          <thead className="text-white/60 border-b border-white/10">
            <tr>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Artist</th>
              <th className="text-left py-2 pr-6">Tier</th>
              <th className="text-left py-2 pr-6">Platform</th>
              <th className="text-left py-2 pr-6">Price</th>
              <th className="text-left py-2 pr-6">ETA</th>
              <th className="text-left py-2 pr-6">Revisions</th>
              <th className="text-left py-2 pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((row) => (
              <tr key={row._id} className="border-b border-white/5">
                <td className="py-3 pr-6">#{row.orderId}</td>
                <td className="py-3 pr-6">
                  {typeof row.artist === "string" ? row.artist : row.artist.fullName}
                </td>
                <td className="py-3 pr-6">{row.tier}</td>
                <td className="py-3 pr-6 capitalize">{row.platform}</td>
                <td className="py-3 pr-6">${row.price}</td>
                <td className="py-3 pr-6">
                  {row.eta ? dateUtils.formatDate(row.eta) : "-"}
                </td>
                <td className="py-3 pr-6">
                  {row.revision}/{row.maxRevision || 0}
                </td>
                <td className="py-3 pr-6">
                  <span
                    className={`capitalize chip min-w-22 inline-block text-center ${statusOption[row.status as keyof typeof statusOption]?.className || "bg-white/10 text-white"}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {orderData.length === 0 && (
          <div className="py-12 text-center text-white/70">
            <div className="text-lg font-heading">No orders found</div>
            <div className="text-sm mt-1">Try adjusting filters or search terms</div>
            <Link
              href="/artists"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/10 border border-white/10"
            >
              Browse artists
            </Link>
          </div>
        )}
      </div>

      <Pagination
        totalDocs={data?.meta?.totalDoc || 0}
        page={page}
        setPage={(page) => setPage(page)}
      />
    </div>
  );
};

export default FanOrdersView;
