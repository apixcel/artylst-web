import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">Earnings</h1>
          <p className="text-white/60 text-sm mt-1">Commissions, fees, payouts</p>
        </div>
        <div className="flex gap-2">
          <a className="px-3 py-2 rounded-lg bg-white/10" href="#">
            Export CSV
          </a>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Available</div>
          <div className="text-2xl font-heading mt-1">$1,120</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">Pending</div>
          <div className="text-2xl font-heading mt-1">$220</div>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-white/70 text-sm">30‑day total</div>
          <div className="text-2xl font-heading mt-1">$2,340</div>
        </div>
      </div>
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <div className="font-heading mb-3">Ledger</div>
        <table className="min-w-full text-sm">
          <thead className="text-white/60 border-b border-white/10">
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
                <span className="chip">Paid</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default page;
