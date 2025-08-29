"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Dropdown } from "@/components";
import { Pagination } from "@/components";
import { DropdownOption } from "@/interface";
import { Download, Search, AlertTriangle } from "lucide-react";

// --- Filters ---
const statusOptions: DropdownOption<string>[] = [
  { label: "All", value: "all" },
  { label: "In progress", value: "in_progress" },
  { label: "Delivered", value: "delivered" },
  { label: "Revisions", value: "revisions" },
  { label: "Disputed", value: "disputed" },
];

const platformOptions: DropdownOption<string>[] = [
  { label: "All Platforms", value: "all" },
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple" },
  { label: "YouTube Music", value: "youtube" },
];

const tierOptions: DropdownOption<string>[] = [
  { label: "All Tiers", value: "all" },
  { label: "Mini", value: "mini" },
  { label: "Standard", value: "standard" },
  { label: "Deluxe", value: "deluxe" },
];

// --- Dummy rows (replace with data hook later) ---
const ROWS = [
  {
    id: 2341,
    artist: "Sloane Rivers",
    tier: "Standard",
    price: 89,
    platform: "spotify",
    status: "in_progress",
    eta: "Aug 28",
    revisionsUsed: 0,
    revisionsLimit: 2,
    lastUpdate: "2h ago",
  },
  {
    id: 2339,
    artist: "Marta",
    tier: "Mini",
    price: 49,
    platform: "apple",
    status: "delivered",
    eta: "—",
    revisionsUsed: 1,
    revisionsLimit: 2,
    lastUpdate: "Yesterday",
  },
  {
    id: 2338,
    artist: "Noah Lane",
    tier: "Deluxe",
    price: 149,
    platform: "spotify",
    status: "revisions",
    eta: "Aug 30",
    revisionsUsed: 2,
    revisionsLimit: 3,
    lastUpdate: "1h ago",
  },
  {
    id: 2335,
    artist: "Kira",
    tier: "Standard",
    price: 89,
    platform: "youtube",
    status: "disputed",
    eta: "—",
    revisionsUsed: 1,
    revisionsLimit: 2,
    lastUpdate: "Aug 20",
  },
];

const OrdersPage = () => {
  const [status, setStatus] = useState<DropdownOption<string>>({
    label: "All",
    value: "all",
  });
  const [platform, setPlatform] = useState<DropdownOption<string>>({
    label: "All Platforms",
    value: "all",
  });
  const [tier, setTier] = useState<DropdownOption<string>>({
    label: "All Tiers",
    value: "all",
  });
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return ROWS.filter((r) => {
      const matchStatus = status.value === "all" || r.status === status.value;
      const matchPlatform = platform.value === "all" || r.platform === platform.value;
      const matchTier = tier.value === "all" || r.tier.toLowerCase() === tier.value;
      const qtext = `${r.id} ${r.artist} ${r.tier}`.toLowerCase();
      const matchQ = !q || qtext.includes(q.toLowerCase());
      return matchStatus && matchPlatform && matchTier && matchQ;
    });
  }, [status, platform, tier, q]);

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? filtered.map((r) => r.id) : []);
  };

  const toggleOne = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)
    );
  };

  const isAllChecked = filtered.length > 0 && selected.length === filtered.length;
  const anyChecked = selected.length > 0;

  return (
    <section className="space-y-6">
      {/* Header + actions */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bricolage-grotesque">My Orders</h1>
          <p className="text-muted text-sm mt-1">Track, review and request revisions</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className={`px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2 ${anyChecked ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
            disabled={!anyChecked}
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            className={`px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2 ${anyChecked ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
            disabled={!anyChecked}
          >
            <AlertTriangle className="h-4 w-4" /> Open Dispute
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 backdrop-blur-2xl grid gap-3 md:grid-cols-4">
        <div className="md:col-span-1">
          <label className="text-muted mr-2">Status</label>
          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(v) => setStatus(v)}
          />
        </div>
        <div className="md:col-span-1">
          <label className="text-muted mr-2">Platform</label>
          <Dropdown
            value={platform}
            options={platformOptions}
            onChange={(v) => setPlatform(v)}
          />
        </div>
        <div className="md:col-span-1">
          <label className="text-muted mr-2">Tier</label>
          <Dropdown value={tier} options={tierOptions} onChange={(v) => setTier(v)} />
        </div>
        <div className="md:col-span-1 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search by order, artist, tier"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <table className="w-full">
          <thead className="text-muted border-b border-white/10">
            <tr>
              <th className="py-2 pr-4">
                <input
                  type="checkbox"
                  className="accent-brand-4 w-4 h-4"
                  checked={isAllChecked}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Artist</th>
              <th className="text-left py-2 pr-6">Tier</th>
              <th className="text-left py-2 pr-6">Platform</th>
              <th className="text-left py-2 pr-6">Price</th>
              <th className="text-left py-2 pr-6">ETA</th>
              <th className="text-left py-2 pr-6">Revisions</th>
              <th className="text-left py-2 pr-6">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-white/5">
                <td className="py-3 px-2">
                  <input
                    type="checkbox"
                    className="accent-brand-4 w-4 h-4"
                    checked={selected.includes(row.id)}
                    onChange={(e) => toggleOne(row.id, e.target.checked)}
                  />
                </td>
                <td className="py-3 pr-6">#{row.id}</td>
                <td className="py-3 pr-6">{row.artist}</td>
                <td className="py-3 pr-6">{row.tier}</td>
                <td className="py-3 pr-6 capitalize">{row.platform}</td>
                <td className="py-3 pr-6">${row.price}</td>
                <td className="py-3 pr-6">{row.eta}</td>
                <td className="py-3 pr-6">
                  {row.revisionsUsed}/{row.revisionsLimit}
                </td>
                <td className="py-3 pr-6">
                  {row.status === "in_progress" && (
                    <span className="chip bg-yellow-500/10 text-yellow-500">
                      In progress
                    </span>
                  )}
                  {row.status === "delivered" && (
                    <span className="chip bg-green-500/10 text-green-500">Delivered</span>
                  )}
                  {row.status === "revisions" && (
                    <span className="chip bg-blue-500/10 text-blue-400">Revisions</span>
                  )}
                  {row.status === "disputed" && (
                    <span className="chip bg-red-500/10 text-red-500">Disputed</span>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      className="px-2 py-1 rounded bg-white/10 text-xs"
                      href={`/dashboard/business/orders/${row.id}`}
                    >
                      Open
                    </Link>
                    <Link
                      className="px-2 py-1 rounded bg-white/10 text-xs"
                      href={`/messages?order=${row.id}`}
                    >
                      Message
                    </Link>
                    <button className="px-2 py-1 rounded bg-white/10 text-xs">
                      Dispute
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {filtered.length === 0 && (
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

      {/* Legend & helpers */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 text-xs text-white/70 flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="chip bg-yellow-500/10 text-yellow-500">In progress</span> Work
          started • ETA active
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="chip bg-green-500/10 text-green-500">Delivered</span> Awaiting
          your review
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="chip bg-blue-500/10 text-blue-400">Revisions</span> Changes
          requested
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="chip bg-red-500/10 text-red-500">Disputed</span> Under Artylst
          review
        </div>
      </div>

      <Pagination totalDocs={100} page={1} setPage={() => {}} />
    </section>
  );
};

export default OrdersPage;
