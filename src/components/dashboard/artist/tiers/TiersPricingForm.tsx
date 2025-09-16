"use client";

import React, { useMemo } from "react";
import { Dropdown } from "@/components";
import { Check, Plus, X } from "lucide-react";
import {
  ITierDefaults,
  TierKey,
  TierName,
  CreateTierPayload,
  UpdateTierPayload,
} from "@/interface";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  useField,
  useFormikContext,
  getIn,
} from "formik";
import * as Yup from "yup";
import { cn } from "@/utils";

type FormValues = {
  songs: number;
  price: number;
  deliveryTime: string;
  descriptionList: string[];
  revisionCount: number;
};

export const TIER_NAME_BY_KEY: Record<TierKey, TierName> = {
  mini: "Mini",
  standard: "Standard",
  pro: "Pro",
};

type Option = { value: string; label: string };

/** --- CHANGE #1: Small, reliable FieldError --- */
const FieldError: React.FC<{ name: string }> = ({ name }) => {
  const [, meta] = useField(name);
  const { submitCount, errors } = useFormikContext<Record<string, unknown>>();
  const error = meta.error ?? getIn(errors, name);

  const show =
    (meta.touched || submitCount > 0) && typeof error === "string" && error.length > 0;

  return show ? <p className="text-xs text-red-400 mt-1">{String(error)}</p> : null;
};
// --- End change ---

// Live preview for a single tier
const TierPreview: React.FC<{
  name: TierName;
  values: {
    songs: number;
    price: number;
    deliveryTime: string;
    descriptionList: string[];
    revisionCount: number;
  };
}> = ({ name, values }) => {
  const cleanedDescriptions = values.descriptionList.map((s) => s.trim()).filter(Boolean);

  return (
    <div>
      <h3 className="text-center mb-3">Preview</h3>
      <div
        className={cn(
          "card rounded-2xl p-6 space-y-3 text-center relative",
          name === "Standard" && "border-brand-4/80"
        )}
      >
        <div className="mb-2">
          <h4 className="text-[16px] text-muted text-center uppercase mb-3">{name}</h4>
          <h3 className="text-2xl">
            ${values.price}/
            <span className="text-[14px] font-britania-ligature font-normal text-muted">
              month
            </span>
          </h3>
        </div>

        <div className="mb-[12px] flex gap-2 justify-center">
          <span>{values.songs || 0}</span>
          <span>Songs</span>
          <span>-</span>
          <span>{values.deliveryTime || "—"}</span>
          <span>Delivery</span>

          <span>-</span>
          <span>{values.revisionCount || 0}</span>
          <span>Revisions</span>
        </div>

        <p className="text-left mb-[6px]">Features:</p>
        {cleanedDescriptions.length > 0 ? (
          <ul className="text-muted space-y-1.5">
            {cleanedDescriptions.map((description: string, idx: number) => (
              <li className="flex gap-2 text-left" key={idx}>
                <Check className="w-4 h-4 text-brand-4/80" />
                {description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm opacity-60">No descriptions yet.</p>
        )}

        {name === "Standard" && (
          <div className="absolute top-0 right-0 uppercase text-xs text-light bg-brand-4/80 rounded-tr-xl rounded-bl-[12px] px-3 py-1">
            Popular
          </div>
        )}
      </div>
    </div>
  );
};

const TierSchema = Yup.object({
  songs: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .min(1, "Min 1 song")
    .required("Songs is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .min(0, "Min price 0")
    .required("Price is required"),
  deliveryTime: Yup.string().required("Delivery time is required"),
  descriptionList: Yup.array()
    .of(Yup.string().trim().required("Description is required"))
    .min(1, "At least one description is required")
    .max(5, "Maximum 5 descriptions"),
  revisionCount: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .min(1, "Min 1")
    .required("Revision count is required"),
});

export const TierPricingCard: React.FC<{
  id?: string;
  name: TierName;
  songs: number;
  price: number;
  defaultDeliveryTime: string;
  revisionCount: number;
  descriptions?: string[];
  disabled?: boolean;
  busy?: boolean;
  onSubmit?: (
    payload: CreateTierPayload | UpdateTierPayload,
    mode: "create" | "update"
  ) => void;
}> = ({
  id,
  name,
  songs,
  price,
  defaultDeliveryTime,
  revisionCount,
  descriptions = [],
  disabled = false,
  busy = false,
  onSubmit,
}) => {
  const deliveryOptions: Option[] = useMemo(
    () => [
      { value: "1 - 3 days", label: "1 - 3 days" },
      { value: "3 - 5 days", label: "3 - 5 days" },
      { value: "5 - 7 days", label: "5 - 7 days" },
      { value: "7 - 10 days", label: "7 - 10 days" },
    ],
    []
  );

  return (
    <div
      className={`rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-4/8 backdrop-blur-2xl ${disabled ? "opacity-60" : ""}`}
    >
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      <Formik<FormValues>
        enableReinitialize
        initialValues={{
          songs,
          price,
          deliveryTime: defaultDeliveryTime,
          descriptionList: descriptions.length > 0 ? descriptions : [""],
          revisionCount: revisionCount,
        }}
        validationSchema={TierSchema}
        onSubmit={(values) => {
          const cleanedDescriptions = values.descriptionList
            .map((d) => d.trim())
            .filter(Boolean);

          const mode: "create" | "update" = id ? "update" : "create";

          if (mode === "update") {
            const payload: UpdateTierPayload = {
              _id: id!,
              name,
              songs: values.songs,
              priceUsd: values.price,
              deliveryTime: values.deliveryTime,
              description: cleanedDescriptions,
              revisionCount: values.revisionCount,
            };
            onSubmit?.(payload, mode);
          } else {
            const payload: CreateTierPayload = {
              name,
              songs: values.songs,
              priceUsd: values.price,
              deliveryTime: values.deliveryTime,
              description: cleanedDescriptions,
              revisionCount: values.revisionCount,
            };
            onSubmit?.(payload, mode);
          }
        }}
      >
        {({ values, setFieldValue, setFieldTouched, handleSubmit }) => (
          <Form
            className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-6"
            onSubmit={handleSubmit}
          >
            {/* LEFT: Form */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/60">Songs</label>
                  <Field
                    name="songs"
                    type="number"
                    disabled={disabled || busy}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1 disabled:opacity-50"
                  />
                  <FieldError name="songs" />
                </div>

                <div>
                  <label className="text-sm text-white/60">Price</label>
                  <Field
                    name="price"
                    type="number"
                    disabled={disabled || busy}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1 disabled:opacity-50"
                  />
                  <FieldError name="price" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-white/60">Delivery time</label>
                  <Dropdown
                    options={deliveryOptions}
                    value={{ value: values.deliveryTime, label: values.deliveryTime }}
                    onChange={(opt: Option) => setFieldValue("deliveryTime", opt.value)}
                    buttonClassName="w-full"
                    disabled={disabled || busy}
                  />
                  <FieldError name="deliveryTime" />
                </div>
                <div>
                  <label className="text-sm text-white/60">Revision count</label>
                  <Field
                    name="revisionCount"
                    type="number"
                    disabled={disabled || busy}
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1 disabled:opacity-50"
                  />
                  <FieldError name="revisionCount" />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60">Descriptions</label>
                <FieldArray name="descriptionList">
                  {({ push, remove }) => {
                    const allFilled = values.descriptionList.every(
                      (v) => typeof v === "string" && v.trim().length > 0
                    );
                    const canAdd = values.descriptionList.length < 5 && allFilled;

                    const markArrayTouched = () =>
                      setFieldTouched("descriptionList", true, true);

                    return (
                      <div className="mt-2 space-y-2">
                        {values.descriptionList.map((_, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Field
                                name={`descriptionList.${idx}`}
                                type="text"
                                placeholder={`Description ${idx + 1}`}
                                disabled={disabled || busy}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
                                onBlur={markArrayTouched}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  remove(idx);
                                  markArrayTouched();
                                }}
                                disabled={disabled || busy}
                                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-2 py-2 hover:bg-white/10 disabled:opacity-50"
                                aria-label={`Remove description ${idx + 1}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <FieldError name={`descriptionList.${idx}`} />
                          </div>
                        ))}

                        <div className="flex items-center justify-between pt-1">
                          <p className="text-xs text-white/60">
                            {values.descriptionList.length}/5 items
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              if (canAdd) {
                                push("");
                                markArrayTouched();
                              }
                            }}
                            disabled={disabled || busy || !canAdd}
                            className="btn-tertiary inline-flex items-center gap-2 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" /> Add item
                          </button>
                        </div>

                        <FieldError name="descriptionList" />
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <button
                className="btn-secondary w-full disabled:opacity-50"
                type="submit"
                disabled={disabled || busy}
              >
                {id ? "Update" : "Create"}
              </button>
            </div>

            {/* RIGHT: Live Preview */}
            <div className="lg:sticky lg:top-4 self-start">
              <TierPreview name={name} values={values} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const TiersPricingForm: React.FC<{
  hasAnyTier: boolean;
  visibleTiers: TierKey[];
  defaults: Record<TierKey, ITierDefaults>;
  busy: boolean;
  onCreateFirstTier: () => void;
  onSubmit: (
    values: CreateTierPayload | UpdateTierPayload,
    mode: "create" | "update"
  ) => void;
  isUpdateMode: boolean;
  createdIds: Record<TierKey, string | undefined>;
}> = ({
  hasAnyTier,
  visibleTiers,
  defaults,
  busy,
  onCreateFirstTier,
  onSubmit,
  createdIds,
}) => {
  const renderCard = (key: TierKey) => {
    const def = defaults[key];
    const name = TIER_NAME_BY_KEY[key];

    // disable rules
    let disabled = false;

    if (!def.id && !createdIds[key]) {
      if (key === "mini") {
        disabled = false;
      }
      if (key === "standard") {
        disabled = !(def.id || createdIds.mini);
      }
      if (key === "pro") {
        disabled = !(def.id || createdIds.standard);
      }
    }

    return (
      <TierPricingCard
        key={key}
        id={def.id}
        name={name}
        songs={def.songs}
        price={def.price}
        defaultDeliveryTime={def.deliveryTime}
        revisionCount={def.revisionCount}
        descriptions={def.description}
        disabled={disabled}
        busy={busy}
        onSubmit={onSubmit}
      />
    );
  };

  return (
    <>
      {hasAnyTier ? (
        <div className="flex flex-col gap-6">
          {visibleTiers.includes("mini") && renderCard("mini")}
          {visibleTiers.includes("standard") && renderCard("standard")}
          {visibleTiers.includes("pro") && renderCard("pro")}
          {busy && <p className="col-span-full text-sm text-white/60">Saving…</p>}
        </div>
      ) : (
        <div className="text-center card max-w-2xl mx-auto p-6">
          <p className="text-sm text-muted mb-2">
            Currently, you have no tiers. Please, create one to get started!
          </p>
          <button
            className="btn-secondary"
            type="button"
            onClick={onCreateFirstTier}
            disabled={busy}
          >
            Create your first tier
          </button>
        </div>
      )}
    </>
  );
};

export default TiersPricingForm;
