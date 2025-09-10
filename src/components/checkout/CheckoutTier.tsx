"use client";

import { IArtistPricingTier } from "@/interface";
import { useGetPricingTierByUserNameQuery } from "@/redux/features/artist/pricingTier.api";
import { cn } from "@/utils";
import { ErrorMessage } from "formik";
import { Check } from "lucide-react";

type Props = {
  selected: string | null;
  onSelect: (price: IArtistPricingTier) => void;
  userName: string;
};

const CheckoutTier = ({ selected, onSelect, userName }: Props) => {
  const { data } = useGetPricingTierByUserNameQuery({ userName });
  return (
    <div className="card p-5 bg-brand-1/10">
      <h2 className="mb-[20px]">Choose a tier</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-3 gap-4">
        {data?.data.map((tier, index) => {
          const active = selected === tier._id;
          return (
            <div
              key={tier._id}
              className={cn(
                "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col cursor-pointer",
                index === 0 && "xl:col-span-1 sm:col-span-2 col-span-1",
                index === 1 && "xl:col-span-1 sm:col-span-2 col-span-1",
                index === 2 && "xl:col-span-1 sm:col-span-2 col-span-1 sm:col-start-2",
                active ? "border-brand-4/80 border" : "hover:scale-[1.03] duration-[0.3s]"
              )}
              onClick={() => onSelect(tier)}
            >
              <div className="flex flex-col gap-5 mb-6">
                <h4 className="text-[16px] text-muted text-center uppercase">
                  {tier.name}
                </h4>
                <h3 className="text-2xl">${tier.priceUsd}</h3>
              </div>

              <ul className="text-muted space-y-1.5 mb-[20px]">
                {tier.description.map((d: string) => (
                  <li className="flex gap-2 text-left" key={d}>
                    <Check className="w-4 h-4 text-brand-4/80" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ErrorMessage
        name="tierId"
        component="span"
        className="text-xs text-red-400 mt-1"
      />
    </div>
  );
};

export default CheckoutTier;
