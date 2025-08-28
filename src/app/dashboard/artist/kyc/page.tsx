import React from "react";

const page = () => {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">KYC &amp; Payout</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Identity verification</div>
          <div className="mt-3 text-sm text-white/70">
            Upload government ID (placeholder UI).
          </div>
          <div className="mt-2">
            <a className="px-4 py-2 rounded-lg bg-white/10" href="#">
              Start KYC
            </a>
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="font-heading">Payouts</div>
          <div className="mt-3 text-sm text-white/70">
            Connect Stripe to receive payouts.
          </div>
          <div className="mt-2">
            <a className="px-4 py-2 rounded-lg bg-brand-500" href="#">
              Connect Stripe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
