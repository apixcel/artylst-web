"use client";

import { useState } from "react";

const CheckoutTier = () => {
  const [selected, setSelected] = useState<"39" | "59" | "99">("59");

  return (
    <div className="card p-5">
      <h2 className="font-heading text-lg">Choose a tier</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
        {/* Mini */}
        <label
          className={`card p-4 cursor-pointer ${
            selected === "39" ? "ring-1 ring-brand/40" : ""
          }`}
        >
          <input
            type="radio"
            name="tier"
            value="39"
            className="peer sr-only"
            checked={selected === "39"}
            onChange={() => setSelected("39")}
          />
          <div className="text-sm text-white/70">Mini • 10–12 tracks</div>
          <div className="text-2xl font-heading mt-1">$39</div>
          <ul className="mt-2 text-xs text-white/70 space-y-1">
            <li>Private playlist link</li>
            <li>30s auth video</li>
          </ul>
          <div className="mt-3 text-[11px] text-emerald-300/90">~48h</div>
        </label>

        {/* Standard */}
        <label
          className={`card p-4 cursor-pointer ${
            selected === "59" ? "ring-1 ring-brand/40" : ""
          }`}
        >
          <input
            type="radio"
            name="tier"
            value="59"
            className="peer sr-only"
            checked={selected === "59"}
            onChange={() => setSelected("59")}
          />
          <div className="text-sm text-white/70">Standard • 20–24 tracks</div>
          <div className="text-2xl font-heading mt-1">$59</div>
          <ul className="mt-2 text-xs text-white/70 space-y-1">
            <li>Deeper curation</li>
            <li>30s auth video</li>
          </ul>
          <div className="mt-3 text-[11px] text-emerald-300/90">~48h</div>
        </label>

        {/* Deep Dive */}
        <label
          className={`card p-4 cursor-pointer ${
            selected === "99" ? "ring-1 ring-brand/40" : ""
          }`}
        >
          <input
            type="radio"
            name="tier"
            value="99"
            className="peer sr-only"
            checked={selected === "99"}
            onChange={() => setSelected("99")}
          />
          <div className="text-sm text-white/70">Deep Dive • 35+ tracks</div>
          <div className="text-2xl font-heading mt-1">$99</div>
          <ul className="mt-2 text-xs text-white/70 space-y-1">
            <li>1 revision within 7 days</li>
            <li>30s auth video</li>
          </ul>
          <div className="mt-3 text-[11px] text-emerald-300/90">~72h</div>
        </label>
      </div>
    </div>
  );
};

export default CheckoutTier;
