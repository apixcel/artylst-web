"use client";

import { DropdownOption } from "@/interface";
import { Dropdown, Pagination } from "@/components";
import { useState } from "react";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "In progress", value: "in_progress" },
  { label: "Delivered", value: "delivered" },
  { label: "Disputed", value: "disputed" },
];

const OrdersPage = () => {
  const [status, setStatus] = useState<DropdownOption<string>>({
    label: "All",
    value: "all",
  });

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">My Orders</h1>
          <p className="text-white/60 text-sm mt-1">
            Track, review and request revisions
          </p>
        </div>

        <Dropdown
          value={status}
          options={statusOptions}
          onChange={(value) => setStatus(value)}
        />
      </div>

      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white/60 border-b border-white/10">
            <tr>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Artist</th>
              <th className="text-left py-2 pr-6">Tier</th>
              <th className="text-left py-2 pr-6">Price</th>
              <th className="text-left py-2 pr-6">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-6">#2341</td>
              <td className="py-3 pr-6">Sloane Rivers</td>
              <td className="py-3 pr-6">Standard</td>
              <td className="py-3 pr-6">$89</td>
              <td className="py-3 pr-6">
                <span className="chip bg-yellow-500/10 text-yellow-500">In progress</span>
              </td>
              <td className="py-3">
                <a
                  className="px-2 py-1 rounded bg-white/10 text-xs"
                  href="order-detail.html"
                >
                  Open
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-6">#2339</td>
              <td className="py-3 pr-6">Marta</td>
              <td className="py-3 pr-6">Mini</td>
              <td className="py-3 pr-6">$49</td>
              <td className="py-3 pr-6">
                <span className="chip bg-green-500/10 text-green-500">Delivered</span>
              </td>
              <td className="py-3">
                <a
                  className="px-2 py-1 rounded bg-white/10 text-xs"
                  href="order-detail.html"
                >
                  Open
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination totalDocs={100} page={1} setPage={() => {}} />
    </section>
  );
};

export default OrdersPage;
