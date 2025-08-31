"use client";

import { Dropdown } from "@/components";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type TierPayload = {
  id?: string;
  title: string;
  songs: number;
  price: number;
  deliveryTime: string;
  descriptionOptions: string[];
  selectedDescriptions: string[];
  revisionCount: number;
};

type Option = { value: string; label: string };

const DescriptionDropdown: React.FC<{
  options: string[];
  selected: string[];
  onSelectChange: (next: string[]) => void;
  onAdd: (val: string) => void;
}> = ({ options, selected, onSelectChange, onAdd }) => {
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

  const toggle = () => setOpen((s) => !s);
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
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1 flex justify-between"
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
            />
            <button type="button" onClick={handleAdd} className="w-full btn-tertiary">
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TierPricingCard: React.FC<{
  id?: string;
  title: string;
  songs: number;
  price: number;
  defaultDeliveryTime: string;
  orderIndex?: 1 | 2 | 3;
  onSubmit?: (payload: TierPayload, mode: "create" | "update") => void;
}> = ({
  id,
  title,
  songs: songsDefault,
  price: priceDefault,
  defaultDeliveryTime,
  orderIndex = 1,
  onSubmit,
}) => {
  const [songs, setSongs] = useState(songsDefault);
  const [price, setPrice] = useState(priceDefault);
  const [deliveryTime, setDeliveryTime] = useState(defaultDeliveryTime);

  const [descriptionOptions, setDescriptionOptions] = useState<string[]>([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>([]);

  const [revisionCount, setRevisionCount] = useState(orderIndex);

  const deliveryOptions: Option[] = [
    { value: "1 - 3 days", label: "1 - 3 days" },
    { value: "3 - 5 days", label: "3 - 5 days" },
    { value: "5 - 7 days", label: "5 - 7 days" },
    { value: "7 - 10 days", label: "7 - 10 days" },
  ];

  const addDescription = (val: string) => {
    setDescriptionOptions((prev) => (prev.includes(val) ? prev : [val, ...prev]));
  };

  const submit = () => {
    const payload: TierPayload = {
      id,
      title,
      songs,
      price,
      deliveryTime,
      descriptionOptions,
      selectedDescriptions,
      revisionCount,
    };
    const mode: "create" | "update" = id ? "update" : "create";
    onSubmit?.(payload, mode);
  };

  return (
    <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-4/8 space-y-3 backdrop-blur-2xl">
      <h3 className="font-bricolage-grotesque">{title}</h3>

      {/* songs */}
      <div>
        <label className="text-sm text-white/60">Songs</label>
        <input
          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
          type="number"
          value={songs}
          onChange={(e) => setSongs(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="text-sm text-white/60">Price</label>
        <input
          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/60">Delivery time</label>
        <Dropdown
          options={deliveryOptions}
          value={{ value: deliveryTime, label: deliveryTime }}
          onChange={(opt: Option) => setDeliveryTime(opt.value)}
          buttonClassName="w-full"
        />
      </div>

      <div>
        <label className="text-sm text-white/60">Description</label>
        <DescriptionDropdown
          options={descriptionOptions}
          selected={selectedDescriptions}
          onSelectChange={setSelectedDescriptions}
          onAdd={addDescription}
        />
      </div>

      <div>
        <label className="text-sm text-white/60">Revision count</label>
        <input
          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
          type="number"
          value={revisionCount}
          onChange={(e) => setRevisionCount(Number(e.target.value) as 1 | 2 | 3)}
        />
      </div>

      <button className="btn-secondary w-full" type="button" onClick={submit}>
        {id ? "Update" : "Create"}
      </button>
    </div>
  );
};

const TiersPricingForm = () => {
  const [cards, setCards] = useState<{ key: string; payload?: TierPayload }[]>([
    { key: "mini" },
    { key: "standard" },
    { key: "pro" },
  ]);

  const handleSubmit = (payload: TierPayload, mode: "create" | "update") => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.key === payload.title.toLowerCase());
      const next = [...prev];
      if (idx >= 0)
        next[idx] = {
          key: next[idx].key,
          payload: {
            ...payload,
            id:
              payload.id ??
              (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)),
          },
        };
      return next;
    });
    console.log(mode.toUpperCase(), payload);
    alert(`${mode.toUpperCase()} → ${payload.title}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <TierPricingCard
        title="Mini"
        songs={10}
        price={49}
        defaultDeliveryTime="1 - 3 days"
        orderIndex={1}
        id={cards[0].payload?.id}
        onSubmit={handleSubmit}
      />
      <TierPricingCard
        title="Standard"
        songs={20}
        price={99}
        defaultDeliveryTime="3 - 5 days"
        orderIndex={2}
        id={cards[1].payload?.id}
        onSubmit={handleSubmit}
      />
      <TierPricingCard
        title="Pro"
        songs={40}
        price={149}
        defaultDeliveryTime="5 - 7 days"
        orderIndex={3}
        id={cards[2].payload?.id}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TiersPricingForm;
