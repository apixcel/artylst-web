"use client";

import { Pagination } from "@/components";

const ReceiptsPage = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Receipts</h1>
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white/60 border-b border-white/10">
            <tr>
              <th className="text-left py-2 pr-6">Date</th>
              <th className="text-left py-2 pr-6">Order</th>
              <th className="text-left py-2 pr-6">Artist</th>
              <th className="text-left py-2 pr-6">Amount</th>
              <th className="text-left py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-6">Aug 20</td>
              <td className="py-3 pr-6">#2339</td>
              <td className="py-3 pr-6">Marta</td>
              <td className="py-3 pr-6">$49</td>
              <td className="py-3">
                <a className="underline" href="#">
                  Download
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

export default ReceiptsPage;
