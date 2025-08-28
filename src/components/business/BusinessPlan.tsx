import Link from "next/link";
import React from "react";

const BusinessPlan = () => {
  return (
    <section className="px-4 py-4 mb-[60px]">
      <div className="wrapper">
        <h2 className="font-heading text-xl mb-3">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card p-5">
            <h2 className="text-[16px] text-muted text-center font-bricolage-grotesque uppercase mb-3">
              Starter
            </h2>
            <h3 className="text-2xl text-center mb-3">$49</h3>
            <ul className="text-sm text-light space-y-1 text-center">
              <li>• 1 playlist</li>
              <li>• 30s auth video</li>
              <li>• 1 revision</li>
            </ul>
            <Link href="/checkout" className="btn btn-ghost w-full mt-4">
              Choose Starter
            </Link>
          </div>

          <div className="card p-5 border-brand/40">
            <h2 className="text-[16px] text-muted text-center font-bricolage-grotesque uppercase mb-3">
              Business
            </h2>
            <h3 className="text-2xl text-center mb-3">$99</h3>
            <ul className="text-sm text-light space-y-1 text-center">
              <li>• 2 dayparts</li>
              <li>• 30s auth video</li>
              <li>• 2 revisions</li>
            </ul>
            <Link href="/checkout" className="btn btn-primary w-full mt-4">
              Choose Business
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="text-[16px] text-muted text-center font-bricolage-grotesque uppercase mb-3">
              Premium
            </h2>
            <h3 className="text-2xl text-center mb-3">$149</h3>
            <ul className="text-sm text-light space-y-1 text-center">
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
