"use client";

import { cn } from "@/utils";

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

type Props = {
  selected: string | undefined; // still single-select
  onChange: (value: AddOn | undefined) => void;
};

const CheckoutAddOnns = ({ selected, onChange }: Props) => {
  return (
    <div className="card p-5 bg-gradient-to-b from-brand-1/10 to-brand-4/8 backdrop-blur-2xl">
      <h2 className="font-heading text-lg">Add-ons (optional)</h2>

      <fieldset className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
        {ADDONS.map((o) => {
          const active = selected === o.title;
          return (
            <div key={o.value} className="relative">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onChange(active ? undefined : o)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(active ? undefined : o);
                  }
                }}
                className={cn(
                  "card p-4 w-full text-left flex flex-col gap-2 transition border cursor-pointer",
                  active
                    ? "ring-1 ring-light/60 border-light bg-white/5"
                    : "border-white/10 hover:border-white/30"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div>
                    <div className="font-heading">{o.title}</div>
                    <div className="text-white/70 text-xs">{o.desc}</div>
                  </div>
                  <div className="ml-auto">${o.price}</div>
                </div>
              </button>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

export default CheckoutAddOnns;
