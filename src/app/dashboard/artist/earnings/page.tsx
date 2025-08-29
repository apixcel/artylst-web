"use client";

import { useState } from "react";
import { Download, DollarSign, Calendar, Wallet } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Dropdown } from "@/components";
import { DropdownOption } from "@/interface";

const ArtistEarningsPage = () => {
  const [range, setRange] = useState("30d");

  const data = [
    { date: "Aug 1", net: 120 },
    { date: "Aug 8", net: 240 },
    { date: "Aug 15", net: 180 },
    { date: "Aug 22", net: 340 },
    { date: "Aug 29", net: 260 },
  ];

  const options = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Year to date", value: "ytd" },
  ];

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="dashboard-title">Earnings</h1>
          <p className="text-muted text-sm mt-1">Commissions, fees, payouts</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-tertiary flex gap-2 py-3">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Key balances */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
          <div className="text-muted text-sm">Available</div>
          <div className="text-2xl font-heading mt-1">$1,120</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
          <div className="text-muted text-sm">Pending</div>
          <div className="text-2xl font-heading mt-1">$220</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
          <div className="text-muted text-sm">30-day total</div>
          <div className="text-2xl font-heading mt-1">$2,340</div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bricolage-grotesque flex items-center gap-2">
            <DollarSign className="h-5 w-5" /> Net earnings
          </h3>
          <Dropdown
            options={options}
            value={
              options.find(
                (option) => option.value === range
              ) as unknown as DropdownOption<string>
            }
            onChange={(value) => setRange(value.value as string)}
            className="bg-transparent"
          />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  background: "rgba(5, 202, 151, 0.2)",
                  border: "1px solid rgba(5, 202, 151, 0.4)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line type="monotone" dataKey="net" stroke="#05ca97" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 backdrop-blur-2xl">
          <h3 className="font-bricolage-grotesque flex items-center gap-2">
            <Wallet className="h-5 w-5" /> Next payout
          </h3>
          <p className="text-sm text-muted mt-2">
            Scheduled for <span className="text-white">Sep 5, 2025</span> to ****4321
            (Bank of America)
          </p>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-b from-brand-1/10 to-brand-4/8 backdrop-blur-2xl">
          <h3 className="font-bricolage-grotesque flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Last payout
          </h3>
          <p className="text-sm text-muted mt-2">Aug 10, 2025 — $890</p>
        </div>
      </div>

      {/* Ledger */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 overflow-x-auto backdrop-blur-2xl">
        <h3 className="font-bricolage-grotesque mb-3">Ledger</h3>
        <table className="min-w-full text-sm">
          <thead className="text-muted border-b border-white/10">
            <tr>
              <th className="text-left py-2 pr-6">Date</th>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Gross</th>
              <th className="text-left py-2 pr-6">ARTYLST 20%</th>
              <th className="text-left py-2 pr-6">Net</th>
              <th className="text-left py-2">Payout</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-6">Aug 20</td>
              <td className="py-3 pr-6">#2339</td>
              <td className="py-3 pr-6">$49</td>
              <td className="py-3 pr-6">$9.80</td>
              <td className="py-3 pr-6">$39.20</td>
              <td className="py-3">
                <span className="chip bg-green-500/10 text-green-500 border-green-500/20">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Aug 25</td>
              <td className="py-3 pr-6">#2340</td>
              <td className="py-3 pr-6">$99</td>
              <td className="py-3 pr-6">$19.80</td>
              <td className="py-3 pr-6">$79.20</td>
              <td className="py-3">
                <span className="chip bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ArtistEarningsPage;
