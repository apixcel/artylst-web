"use server";

import { IArtistPricingTier } from "@/interface";
import { baseUrl } from "@/redux/api/api";
import { cn } from "@/utils";
import { Check } from "lucide-react";
import Link from "next/link";

const ArtistPricingTier = async ({ userName }: { userName: string }) => {
  const res = await fetch(`${baseUrl}/artist/get-pricing/${userName}`, {
    cache: "no-store",
  });
  const data = (await res.json()) as { data: IArtistPricingTier[] };
  const artistPricingData = data?.data || [];
  console.log(artistPricingData);

  return (
    <section className="mb-[40px]">
      <h2 className="mb-3">Business Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-4">
        {artistPricingData.map((tier, index) => (
          <div
            key={tier._id}
            className={cn(
              "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col relative",
              index === 0 && "lg:col-span-1 sm:col-span-2 col-span-1",
              index === 1 && "lg:col-span-1 sm:col-span-2 col-span-1",
              index === 2 && "lg:col-span-1 sm:col-span-2 col-span-1 sm:col-start-2",
              tier.order === 2 && "border-brand-4/80"
            )}
          >
            <div className="mb-2">
              <h4 className="text-[16px] text-muted text-center uppercase mb-3">
                {tier.name}
              </h4>
              <h3 className="text-2xl">
                ${tier.priceUsd}/
                <span className="text-[14px] font-britania-ligature font-normal text-muted">
                  month
                </span>
              </h3>
            </div>

            <div className="mb-[8px] flex gap-2 justify-center">
              <span>{tier.songs}</span>
              <span>Songs</span>
              <span>-</span>
              <span>{tier.deliveryTime}</span>
              <span>Delivery</span>

              <span>-</span>
              <span>{tier.revisionCount}</span>
              <span>Revisions</span>
            </div>

            <p className="text-left mb-[6px]">Features:</p>
            <ul className="text-muted space-y-1.5 mb-[20px]">
              {tier.description.map((description: string) => (
                <li className="flex gap-2 text-left" key={description}>
                  <Check className="w-4 h-4 text-brand-4/80" />
                  {description}
                </li>
              ))}
            </ul>
            <Link
              href={`/artists/${userName}/checkout`}
              className={`btn mt-auto ${tier.order === 2 ? "btn-primary" : "btn-tertiary"} w-full mt-4`}
            >
              Choose {tier.name}
            </Link>

            {tier.order === 2 && (
              <div className="absolute top-0 right-0 uppercase text-xs text-light bg-brand-4/80 rounded-tr-xl rounded-bl-[12px] px-3 py-1">
                Popular
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistPricingTier;
