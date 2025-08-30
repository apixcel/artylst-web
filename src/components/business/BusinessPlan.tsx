import { businessPricingData } from "@/constants";
import { cn } from "@/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const BusinessPlan = () => {
  return (
    <section className="px-4 py-4 mb-[60px]">
      <div className="wrapper">
        <h2 className="font-heading text-xl mb-3">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-4">
          {businessPricingData.map((tier, index) => (
            <div
              key={tier.id}
              className={cn(
                "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col",
                index === 0 && "lg:col-span-1 sm:col-span-2 col-span-1",
                index === 1 && "lg:col-span-1 sm:col-span-2 col-span-1",
                index === 2 && "lg:col-span-1 sm:col-span-2 col-span-1 sm:col-start-2"
              )}
            >
              <div>
                <h4 className="text-[16px] text-muted text-center font-bricolage-grotesque uppercase mb-3">
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
              <Link
                href="/checkout"
                className={`btn mt-auto ${tier.name === "Business" ? "btn-primary" : "btn-tertiary"} w-full mt-4`}
              >
                Choose {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessPlan;
