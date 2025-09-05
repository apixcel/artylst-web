"use client";

import { Check } from "lucide-react";
import { cn } from "@/utils";
import { artistPricingData } from "@/constants";
import { useState } from "react";

const CheckoutTier = () => {
  const [selected, setSelected] = useState<number>(artistPricingData[1].price);

  const handleSelect = (price: number) => {
    setSelected(price);
  };

  return (
    <div className="card p-5 bg-brand-1/10">
      <h2 className="mb-[20px]">Choose a tier</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-3 gap-4">
        {artistPricingData.map((tier, index) => (
          <div
            key={tier.id}
            className={cn(
              "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col",
              index === 0 && "xl:col-span-1 sm:col-span-2 col-span-1",
              index === 1 && "xl:col-span-1 sm:col-span-2 col-span-1",
              index === 2 && "xl:col-span-1 sm:col-span-2 col-span-1 sm:col-start-2",
              selected === tier.price && "border-brand-4/80 border"
            )}
            onClick={() => handleSelect(tier.price)}
          >
            <div>
              <h4 className="text-[16px] text-muted text-center uppercase mb-3">
                {tier.name}
              </h4>
              <h3 className="text-2xl mb-6">${tier.price}</h3>
            </div>

            <ul className="text-muted space-y-1.5 mb-[20px]">
              {tier.description.map((description) => (
                <li className="flex gap-2 text-left" key={description}>
                  <Check className="w-4 h-4 text-brand-4/80" />
                  {description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutTier;
