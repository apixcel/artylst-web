"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Pagination } from "@/components";
import { Calendar, Download, FileText, Search, X } from "lucide-react";

// Dummy data — replace with real API data
const ROWS = [
  {
    id: "INV-2339",
    orderId: 2339,
    date: "2025-08-20",
    artist: "Marta",
    amount: 49,
    platform: "Apple Music",
    fee: 9.8, // 20%
    payout: 39.2,
  },
  {
    id: "INV-2341",
    orderId: 2341,
    date: "2025-08-26",
    artist: "Sloane Rivers",
    amount: 89,
    platform: "Spotify",
    fee: 17.8,
    payout: 71.2,
  },
];

const formatMoney = (n: number) => `$${n.toFixed(2)}`;

const ReceiptDrawer = ({
  row,
  onClose,
}: {
  row: (typeof ROWS)[number] | null;
  onClose: () => void;
}) => {
  if (!row) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-base-900 bg-gradient-to-b from-brand-4/10 to-brand-2/10 border-l border-white/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Invoice</div>
            <div className="text-xl font-heading">{row.id}</div>
          </div>
          <button className="px-3 py-2 rounded-lg bg-white/10" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-white/70 text-sm">Bill to</div>
          <div className="mt-1 text-sm">Arif • Café Horizon Ltd.</div>
          <div className="text-xs text-white/60">VAT/TIN: 123456789</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/60">Order</div>
            <div className="font-medium">#{row.orderId}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/60">Date</div>
            <div className="font-medium">{new Date(row.date).toLocaleDateString()}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/60">Artist</div>
            <div className="font-medium">{row.artist}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/60">Platform</div>
            <div className="font-medium">{row.platform}</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-white/60 border-b border-white/10">
              <tr>
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-right py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">Custom playlist by {row.artist}</td>
                <td className="py-3 px-4 text-right">{formatMoney(row.amount)}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">LYSTN Service Fee (20%)</td>
                <td className="py-3 px-4 text-right">-{formatMoney(row.fee)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Total Paid</td>
                <td className="py-3 px-4 text-right font-medium">
                  {formatMoney(row.amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-white/70">
          <div>
            Artist payout: <span className="text-white">{formatMoney(row.payout)}</span>
          </div>
          <div className="text-white/60 text-xs mt-1">
            Payouts are handled securely; personal details are masked for privacy.
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 inline-flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <Link
            href={`/orders/${row.orderId}`}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 inline-flex items-center gap-2"
          >
            <FileText className="h-4 w-4" /> View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

const ReceiptsPage = () => {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openInvoice, setOpenInvoice] = useState<(typeof ROWS)[number] | null>(null);

  const filtered = useMemo(() => {
    return ROWS.filter((r) => {
      const matchesQ =
        !q || `${r.id} ${r.orderId} ${r.artist}`.toLowerCase().includes(q.toLowerCase());
      const date = new Date(r.date).getTime();
      const after = from ? new Date(from).getTime() <= date : true;
      const before = to ? date <= new Date(to).getTime() : true;
      return matchesQ && after && before;
    });
  }, [q, from, to]);

  const totals = useMemo(() => {
    const gross = filtered.reduce((acc, r) => acc + r.amount, 0);
    const fees = filtered.reduce((acc, r) => acc + r.fee, 0);
    return { gross, fees, net: gross - fees };
  }, [filtered]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Receipts</h1>

      {/* Filters */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            className="bg-transparent flex-1 py-2 outline-none"
            placeholder="Search by invoice, order, artist"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
          <Calendar className="h-4 w-4 text-muted" />
          <input
            type="date"
            className="bg-transparent flex-1 py-2 outline-none"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
          <Calendar className="h-4 w-4 text-muted" />
          <input
            type="date"
            className="bg-transparent flex-1 py-2 outline-none"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      {/* Totals */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Gross</div>
          <div className="text-2xl font-heading mt-1">{formatMoney(totals.gross)}</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Artylst Fees</div>
          <div className="text-2xl font-heading mt-1">{formatMoney(totals.fees)}</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Net (after fees)</div>
          <div className="text-2xl font-heading mt-1">{formatMoney(totals.net)}</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-muted border-b border-white/10">
            <tr>
              <th className="text-left py-2 pr-6">Date</th>
              <th className="text-left py-2 pr-6">Invoice</th>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Artist</th>
              <th className="text-right py-2 pr-6">Gross</th>
              <th className="text-right py-2 pr-6">Fee (20%)</th>
              <th className="text-right py-2 pr-6">Net</th>
              <th className="text-left py-2 pl-6">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="py-3 pr-6">{new Date(r.date).toLocaleDateString()}</td>
                <td className="py-3 pr-6">{r.id}</td>
                <td className="py-3 pr-6">#{r.orderId}</td>
                <td className="py-3 pr-6">{r.artist}</td>
                <td className="py-3 pr-6 text-right">{formatMoney(r.amount)}</td>
                <td className="py-3 pr-6 text-right">{formatMoney(r.fee)}</td>
                <td className="py-3 pr-6 text-right">{formatMoney(r.payout)}</td>
                <td className="py-3 pl-6">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 rounded bg-brand-4/40 text-xs inline-flex items-center gap-2 cursor-pointer"
                      onClick={() => setOpenInvoice(r)}
                    >
                      <FileText className="h-3.5 w-3.5" /> View
                    </button>
                    <button className="px-2 py-1 rounded bg-brand-4/40 text-xs inline-flex items-center gap-2 cursor-pointer">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/70">
            <div className="text-lg font-heading">No receipts found</div>
            <div className="text-sm mt-1">
              Try changing the date range or search query
            </div>
          </div>
        )}
      </div>

      <Pagination totalDocs={50} page={1} setPage={() => {}} />

      {/* Drawer */}
      <ReceiptDrawer row={openInvoice} onClose={() => setOpenInvoice(null)} />
    </section>
  );
};

export default ReceiptsPage;
