"use client";

import { cn } from "@/utils";
import { X } from "lucide-react";

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
  selected: string | undefined;
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
            <label
              key={o.value}
              className={cn(
                "card p-4 flex flex-col gap-2 cursor-pointer transition border relative group",
                active
                  ? "ring-1 ring-light/60 border-light bg-white/5"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              <input
                type="radio"
                name="checkout-addon"
                className="sr-only"
                checked={active}
                onChange={() => onChange(o)}
              />

              <div className="flex items-start gap-3 w-full">
                <div>
                  <div className="font-heading">{o.title}</div>
                  <div className="text-white/70 text-xs">{o.desc}</div>
                </div>
                <div className="ml-auto">${o.price}</div>
              </div>

              {active && (
                <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                  <button
                    type="button"
                    className="text-xs text-light border bg-red-campaign-red border-red-campaign-red flex items-center justify-end gap-2 py-1 px-2 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(undefined);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};

export default CheckoutAddOnns;
