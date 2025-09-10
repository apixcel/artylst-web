/* "use client";

import React, { useMemo } from "react";
import { Dropdown } from "@/components";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { IArtistPricingTier, ITierDefaults, TierKey, TierName } from "@/interface";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import { useState, useRef, useEffect } from "react";

export const TIER_NAME_BY_KEY: Record<TierKey, TierName> = {
  mini: "Mini",
  standard: "Standard",
  pro: "Pro",
};

type Option = { value: string; label: string };

const FieldError: React.FC<{ name: string }> = ({ name }) => {
  const [, meta] = useField(name);
  return meta.touched && meta.error ? (
    <p className="text-xs text-red-400 mt-1">{String(meta.error)}</p>
  ) : null;
};

const DescriptionDropdown: React.FC<{
  options: string[];
  selected: string[];
  onSelectChange: (next: string[]) => void;
  onAdd: (val: string) => void;
  disabled?: boolean;
}> = ({ options, selected, onSelectChange, onAdd, disabled }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => !disabled && setOpen((s) => !s);
  const toggleCheck = (val: string) => {
    onSelectChange(
      selected.includes(val) ? selected.filter((x) => x !== val) : [...selected, val]
    );
  };

  const handleAdd = () => {
    const v = draft.trim();
    if (!v) return;
    onAdd(v);
    if (!selected.includes(v)) onSelectChange([...selected, v]);
    setDraft("");
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        disabled={disabled}
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1 flex justify-between disabled:opacity-50"
        onClick={toggle}
      >
        {selected.length > 0 ? `${selected.length} selected` : "Select descriptions"}
        <span>
          {open ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-base-900 p-4 space-y-2">
          {options.length > 0 && (
            <div className="max-h-40 overflow-auto space-y-1 border-b border-white/10 pb-2">
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-4"
                    checked={selected.includes(opt)}
                    onChange={() => toggleCheck(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add description…"
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleAdd}
              className="w-full btn-tertiary disabled:opacity-50"
              disabled={disabled}
            >
              Set
            </button>
          </div>
        </div>
      )}
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
  descriptionOptions: Yup.array().of(Yup.string()),
  selectedDescriptions: Yup.array()
    .of(Yup.string())
    .min(1, "At least one description is required"),
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
  onSubmit?: (payload: IArtistPricingTier, mode: "create" | "update") => void;
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
      className={`rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-4/8 space-y-3 backdrop-blur-2xl ${disabled ? "opacity-60" : ""}`}
    >
      <h3>{name}</h3>

      <Formik
        enableReinitialize
        initialValues={{
          songs,
          price,
          deliveryTime: defaultDeliveryTime,
          descriptionOptions: descriptions,
          selectedDescriptions: descriptions,
          revisionCount: revisionCount,
        }}
        validationSchema={TierSchema}
        onSubmit={(values) => {
          const payload: IArtistPricingTier = {
            _id: id,
            name,
            songs: values.songs,
            priceUsd: values.price,
            deliveryTime: values.deliveryTime,
            description: values.selectedDescriptions,
            revisionCount: values.revisionCount,
          };
          const mode: "create" | "update" = id ? "update" : "create";
          onSubmit?.(payload, mode);
        }}
      >
        {({ values, setFieldValue, handleSubmit, setFieldTouched }) => (
          <Form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
              <label className="text-sm text-white/60">Description</label>
              <DescriptionDropdown
                options={values.descriptionOptions}
                selected={values.selectedDescriptions}
                onSelectChange={(v) => {
                  setFieldValue("selectedDescriptions", v);
                  setFieldTouched("selectedDescriptions", true, false);
                }}
                onAdd={(v) => {
                  const next = values.descriptionOptions.includes(v)
                    ? values.descriptionOptions
                    : [v, ...values.descriptionOptions];
                  setFieldValue("descriptionOptions", next);
                  if (!values.selectedDescriptions.includes(v)) {
                    setFieldValue("selectedDescriptions", [
                      v,
                      ...values.selectedDescriptions,
                    ]);
                  }
                  setFieldTouched("selectedDescriptions", true, false);
                }}
                disabled={disabled || busy}
              />
              <FieldError name="selectedDescriptions" />
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

            <button
              className="btn-secondary w-full disabled:opacity-50"
              type="submit"
              disabled={disabled || busy}
            >
              {id ? "Update" : "Create"}
            </button>
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
  onSubmit: (values: IArtistPricingTier, mode: "create" | "update") => void;

  // NEW props
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
        <div className="flex flex-col gap-4 opacity-100">
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
 */
