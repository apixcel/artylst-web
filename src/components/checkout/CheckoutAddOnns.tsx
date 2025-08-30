"use client";

import { useState } from "react";

type AddOn = {
  value: string;
  title: string;
  desc: string;
  price: number;
};

const ADDONS: AddOn[] = [
  {
    value: "rush",
    title: "Rush delivery",
    desc: "Move to front of queue (where possible).",
    price: 12,
  },
  {
    value: "length",
    title: "Extra length",
    desc: "+8–10 tracks on top of selected tier.",
    price: 10,
  },
  {
    value: "business",
    title: "Business license",
    desc: "For cafés/salons/gyms. Non-exclusive use.",
    price: 25,
  },
  {
    value: "notes",
    title: "High-level mix notes",
    desc: "Short rationale about sequencing.",
    price: 5,
  },
];

const CheckoutAddOnns = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="card p-5 bg-gradient-to-b from-brand-1/10 to-brand-4/8 backdrop-blur-2xl">
      <h2 className="font-heading text-lg">Add-ons (optional)</h2>

      <fieldset className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
        {ADDONS.map((o) => {
          const active = selected === o.value;
          return (
            <label
              key={o.value}
              className={`card p-4 flex items-start gap-3 cursor-pointer transition
                border ${active ? "ring-1 ring-light/60 border-light bg-white/5" : "border-white/10 hover:border-white/30"}`}
            >
              <input
                type="radio"
                name="checkout-addon"
                className="sr-only"
                checked={active}
                onChange={() => setSelected(o.value)}
              />
              <div>
                <div className="font-heading">{o.title}</div>
                <div className="text-white/70 text-xs">{o.desc}</div>
              </div>
              <div className="ml-auto">${o.price}</div>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};

export default CheckoutAddOnns;
