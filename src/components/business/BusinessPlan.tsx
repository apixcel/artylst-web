import Link from "next/link";
import React from "react";

const BusinessPlan = () => {
  return (
    <section className="px-4 py-4 mb-[60px]">
      <div className="wrapper">
        <h2 className="font-heading text-xl mb-3">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="text-sm text-white/70">Starter</div>
            <div className="text-2xl font-heading mt-1">$49</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• 1 playlist</li>
              <li>• 30s auth video</li>
              <li>• 1 revision</li>
            </ul>
            <Link href="/checkout" className="btn btn-ghost w-full mt-4">
              Choose Starter
            </Link>
          </div>

          <div className="card p-5 border-brand/40">
            <div className="text-sm text-white/70">Business</div>
            <div className="text-2xl font-heading mt-1">$99</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• 2 dayparts</li>
              <li>• 30s auth video</li>
              <li>• 2 revisions</li>
            </ul>
            <Link href="/checkout" className="btn btn-primary w-full mt-4">
              Choose Business
            </Link>
          </div>

          <div className="card p-5">
            <div className="text-sm text-white/70">Premium</div>
            <div className="text-2xl font-heading mt-1">$149</div>
            <ul className="mt-3 text-sm text-white/75 space-y-1">
              <li>• 3+ dayparts</li>
              <li>• 30s auth video</li>
              <li>• Priority curation</li>
            </ul>
            <Link href="/checkout" className="btn btn-ghost w-full mt-4">
              Choose Premium
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlan;
