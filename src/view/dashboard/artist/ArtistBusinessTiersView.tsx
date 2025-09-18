"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useCreateBusinessPricingTierMutation,
  useGetMyBusinessPricingTierQuery,
  useUpdateBusinessPricingTierMutation,
} from "@/redux/features/artist/pricingTier.api";
import {
  IArtistPricingTier,
  IQueryMutationErrorResponse,
  TierKey,
  CreateTierPayload,
  UpdateTierPayload,
} from "@/interface";

import { TiersPricingForm, TiersSkeleton, UnauthorizedMsgBox } from "@/components";
import { useAppSelector } from "@/hooks";
import { cn } from "@/utils";

const ArtistBusinessTiersView = () => {
  const [activeTier, setActiveTier] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [createTier, { isLoading: isCreating }] = useCreateBusinessPricingTierMutation();
  const [updateTier, { isLoading: isUpdating }] = useUpdateBusinessPricingTierMutation();

  const { data: myTierResp, isLoading, isFetching } = useGetMyBusinessPricingTierQuery();
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
    setCreatedIds({
      mini: mini?._id,
      standard: standard?._id,
      pro: pro?._id,
    });
  }, [isUpdateMode, mini?._id, standard?._id, pro?._id]);

  useEffect(() => {
    const tiers = [mini, standard, pro].filter(Boolean) as IArtistPricingTier[];

    const allExistAndActive =
      tiers.length === 3 && tiers.every((t) => t.isActive === true);

    setActiveTier(allExistAndActive);
  }, [
    mini?.isActive,
    standard?.isActive,
    pro?.isActive,
    mini?._id,
    standard?._id,
    pro?._id,
  ]);

  const handleToggleAll = async () => {
    if (busy) return;

    const tiers = [mini, standard, pro].filter(Boolean) as IArtistPricingTier[];
    const wantActive = !activeTier;

    try {
      await Promise.all(
        tiers.map((t) =>
          updateTier({
            ...t,
            isActive: wantActive,
          } as IArtistPricingTier)
        )
      );

      setActiveTier(wantActive);
      toast.success(wantActive ? "All tiers activated" : "All tiers deactivated");
    } catch (e) {
      toast.error("Something went wrong while toggling tiers");
    }
  };

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
  const handleSubmit = async (
    values: CreateTierPayload | UpdateTierPayload,
    mode: "create" | "update"
  ) => {
    const createPayload = values;
    const updatePayload = values;

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

  const hasAnyTier = isUpdateMode || showForms;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl">Pricing Tiers for Business Playlists</h1>
          <p className="text-muted text-sm mt-1">
            Fans choose between tiers when commissioning a business playlist
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <label className="text-muted">Active/Deactivate Tier</label>
            <button
              type="button"
              onClick={handleToggleAll}
              disabled={busy}
              aria-pressed={activeTier}
              aria-label="Toggle all pricing tiers active state"
              className={cn(
                "relative inline-flex h-4.5 sm:h-7 w-8 sm:w-12 items-center rounded-full transition-colors duration-300 outline-none",
                activeTier
                  ? "bg-brand-4/80 border-brand-4/40"
                  : "bg-white/10 border-white/20",
                busy ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "inline-block h-3 sm:h-5 w-3 sm:w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                  activeTier ? "translate-x-4 sm:translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <TiersSkeleton />
      ) : (
        <TiersPricingForm
          hasAnyTier={hasAnyTier}
          visibleTiers={["mini", "standard", "pro"]}
          defaults={defaults}
          busy={busy}
          onCreateFirstTier={() => setShowForms(true)}
          onSubmit={handleSubmit}
          isUpdateMode={isUpdateMode}
          createdIds={createdIds}
        />
      )}
    </section>
  );
};

export default ArtistBusinessTiersView;
