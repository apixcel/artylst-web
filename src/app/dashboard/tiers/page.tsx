/* "use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useCreatePricingTierMutation,
  useGetMyPricingTierQuery,
  useUpdatePricingTierMutation,
} from "@/redux/features/artist/pricingTier.api";
import { IArtistPricingTier, IQueryMutationErrorResponse, TierKey } from "@/interface";

import { TiersPricingForm, UnauthorizedMsgBox } from "@/components";
import { useAppSelector } from "@/hooks";

const ArtistTiersPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [createTier, { isLoading: isCreating }] = useCreatePricingTierMutation();
  const [updateTier, { isLoading: isUpdating }] = useUpdatePricingTierMutation();

  const { data: myTierResp, isFetching } = useGetMyPricingTierQuery();
  const myTier = myTierResp?.data;

  const mini = myTier?.find((tier) => tier.name === "Mini");
  const standard = myTier?.find((tier) => tier.name === "Standard");
  const pro = myTier?.find((tier) => tier.name === "Pro");

  const isUpdateMode = Boolean(mini || standard || pro);

  const [showForms, setShowForms] = useState<boolean>(isUpdateMode);

  const [createdIds, setCreatedIds] = useState<Record<TierKey, string | undefined>>({
    mini: mini?._id,
    standard: standard?._id,
    pro: pro?._id,
  });

  useEffect(() => {
    if (isUpdateMode) setShowForms(true);
    setCreatedIds({
      mini: mini?._id,
      standard: standard?._id,
      pro: pro?._id,
    });
  }, [isUpdateMode, mini?._id, standard?._id, pro?._id]);

  // Always render 3 cards; defaults come from server if any, else from fallback
  const defaults = useMemo(() => {
    const base = {
      mini: {
        songs: 10,
        price: 49,
        deliveryTime: "1 - 3 days",
        revisionCount: 1,
        description: [] as string[],
      },
      standard: {
        songs: 20,
        price: 99,
        deliveryTime: "3 - 5 days",
        revisionCount: 2,
        description: [] as string[],
      },
      pro: {
        songs: 40,
        price: 149,
        deliveryTime: "5 - 7 days",
        revisionCount: 3,
        description: [] as string[],
      },
    };
    return {
      mini: {
        songs: mini?.songs ?? base.mini.songs,
        price: mini?.priceUsd ?? base.mini.price,
        deliveryTime: mini?.deliveryTime ?? base.mini.deliveryTime,
        id: mini?._id,
        revisionCount: mini?.revisionCount ?? base.mini.revisionCount,
        description: mini?.description ?? base.mini.description,
      },
      standard: {
        songs: standard?.songs ?? base.standard.songs,
        price: standard?.priceUsd ?? base.standard.price,
        deliveryTime: standard?.deliveryTime ?? base.standard.deliveryTime,
        id: standard?._id,
        revisionCount: standard?.revisionCount ?? base.standard.revisionCount,
        description: standard?.description ?? base.standard.description,
      },
      pro: {
        songs: pro?.songs ?? base.pro.songs,
        price: pro?.priceUsd ?? base.pro.price,
        deliveryTime: pro?.deliveryTime ?? base.pro.deliveryTime,
        id: pro?._id,
        revisionCount: pro?.revisionCount ?? base.pro.revisionCount,
        description: pro?.description ?? base.pro.description,
      },
    };
  }, [mini, standard, pro]);

  // Create/Update submit handler
  const handleSubmit = async (values: IArtistPricingTier, mode: "create" | "update") => {
    const createPayload = {
      name: values.name,
      songs: values.songs,
      priceUsd: values.priceUsd,
      deliveryTime: values.deliveryTime,
      description: values.description,
      revisionCount: values.revisionCount,
    };
    const updatePayload = {
      _id: values._id,
      name: values.name,
      songs: values.songs,
      priceUsd: values.priceUsd,
      deliveryTime: values.deliveryTime,
      description: values.description,
      revisionCount: values.revisionCount,
    };

    if (mode === "create") {
      const res = await createTier(createPayload);
      const err = res?.error as IQueryMutationErrorResponse;
      if (err) {
        toast.error(err.data?.message || "Something went wrong");
        return;
      }
      toast.success(`${values.name} tier created successfully`);

      // local unlock
      const key =
        values.name === "Mini" ? "mini" : values.name === "Standard" ? "standard" : "pro";
      setCreatedIds((prev) => ({ ...prev, [key as TierKey]: "created" }));
    } else {
      const res = await updateTier(updatePayload as IArtistPricingTier);
      const err = res?.error as IQueryMutationErrorResponse;
      if (err) {
        toast.error(err.data?.message || "Something went wrong");
        return;
      }
      toast.success(`${values.name} tier updated successfully`);
    }
  };

  const busy = isCreating || isUpdating || isFetching;

  if (role !== "artist") return <UnauthorizedMsgBox />;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl">Pricing Tiers</h1>
        <p className="text-muted text-sm mt-1">
          Fans choose between tiers when commissioning a playlist
        </p>
      </div>

      <TiersPricingForm
        hasAnyTier={showForms}
        visibleTiers={["mini", "standard", "pro"]}
        defaults={defaults}
        busy={busy}
        onCreateFirstTier={() => setShowForms(true)}
        onSubmit={handleSubmit}
        isUpdateMode={isUpdateMode}
        createdIds={createdIds}
      />
    </section>
  );
};

export default ArtistTiersPage;
 */
