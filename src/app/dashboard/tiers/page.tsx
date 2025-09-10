/* "use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useCreatePricingTierMutation,
  useGetMyPricingTierQuery,
  useUpdatePricingTierMutation,
} from "@/redux/features/artist/artist.api";
import { IArtistPricingTier, IQueryMutationErrorResponse, TierKey } from "@/interface";

import { TiersPricingForm } from "@/components";

const ArtistTiersPage = () => {
  const [createTier, { isLoading: isCreating }] = useCreatePricingTierMutation();
  const [updateTier, { isLoading: isUpdating }] = useUpdatePricingTierMutation();

  const { data: myTierResp, isFetching } = useGetMyPricingTierQuery();
  const myTier = myTierResp?.data;
  const mini = myTier?.find((tier) => tier.name === "Mini");
  const standard = myTier?.find((tier) => tier.name === "Standard");
  const pro = myTier?.find((tier) => tier.name === "Pro");

  const [visibleTiers, setVisibleTiers] = useState<string[]>([]);

  useEffect(() => {
    const v = [];
    if (mini) v.push("mini");
    if (standard) v.push("standard");
    if (pro) v.push("pro");
    setVisibleTiers(v);
  }, [mini, standard, pro]);

  const defaults = useMemo(() => {
    if (!myTier) {
      return {
        mini: {
          songs: 10,
          price: 49,
          deliveryTime: "1 - 3 days",
          id: undefined,
          revisionCount: 1,
        },
        standard: {
          songs: 20,
          price: 99,
          deliveryTime: "3 - 5 days",
          id: undefined,
          revisionCount: 2,
        },
        pro: {
          songs: 40,
          price: 149,
          deliveryTime: "5 - 7 days",
          id: undefined,
          revisionCount: 3,
        },
      };
    }
    return {
      mini: {
        songs: mini?.songs ?? 10,
        price: mini?.priceUsd ?? 49,
        deliveryTime: mini?.deliveryTime ?? "1 - 3 days",
        id: mini?._id,
        revisionCount: mini?.revisionCount ?? 1,
      },
      standard: {
        songs: standard?.songs ?? 20,
        price: standard?.priceUsd ?? 99,
        deliveryTime: standard?.deliveryTime ?? "3 - 5 days",
        id: standard?._id,
        revisionCount: (standard?.revisionCount ?? 2) as 2,
      },
      pro: {
        songs: pro?.songs ?? 40,
        price: pro?.priceUsd ?? 149,
        deliveryTime: pro?.deliveryTime ?? "5 - 7 days",
        id: pro?._id,
        revisionCount: (pro?.revisionCount ?? 3) as 3,
      },
    };
  }, [mini, standard, pro]);

  const handleSubmit = async (values: IArtistPricingTier, mode: "create" | "update") => {
    const payload = {
      _id: values._id,
      name: values.name,
      songs: values.songs,
      price: values.priceUsd,
      deliveryTime: values.deliveryTime,
      description: values.description,
      revisionCount: values.revisionCount,
    };

    const createPayload = {
      name: values.name,
      songs: values.songs,
      priceUsd: values.priceUsd,
      deliveryTime: values.deliveryTime,
      description: values.description,
      revisionCount: values.revisionCount,
    };

    // if (mode === "create") {
    //   const res = await createTier(createPayload);
    //   const error = res.error as IQueryMutationErrorResponse;
    //   if (error) {
    //     toast.error(error.data?.message || "Something went wrong");
    //     return;
    //   }
    //   toast.success(`${values.name} tier created successfully`);
    // } 
    
    // if (mode === "update") {
    //   const res = await updateTier(payload);
    //   const error = res.error as IQueryMutationErrorResponse;
    //   if (error) {
    //     toast.error(error.data?.message || "Something went wrong");
    //     return;
    //   }
    //   toast.success(`${values.name} tier updated successfully`);
    // }
  };

  const busy = isCreating || isUpdating || isFetching;

  const order = ["mini", "standard", "pro"] as const;

  const addNextTier = () => {
    const remaining = order.filter((k) => !visibleTiers.includes(k));
    if (remaining.length === 0) return;
    setVisibleTiers((prev) => [...prev, remaining[0]]);
  };

  const hasAnyTier =
    Boolean(mini || standard || pro) || visibleTiers.length > 0;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl">Pricing Tiers</h1>
        <p className="text-muted text-sm mt-1">
          Fans choose between tiers when commissioning a playlist
        </p>
      </div>

      <TiersPricingForm
        hasAnyTier={hasAnyTier}
        visibleTiers={visibleTiers as TierKey[]}
        defaults={defaults}
        busy={busy}
        onAddNextTier={addNextTier}
        onCreateFirstTier={() => setVisibleTiers(["mini"])}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default ArtistTiersPage;
 */

const page = () => {
  return <div>Will be added soon...</div>;
};

export default page;
