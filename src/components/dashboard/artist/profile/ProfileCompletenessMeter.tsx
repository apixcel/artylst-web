"use client";

import { CheckCircle2, Sparkles, X } from "lucide-react";
import { useGetArtistProfileCompletenessQuery } from "@/redux/features/artist/artist.api";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

const labelMap: Record<string, { label: string; description: string }> = {
  avatar: {
    label: "Profile Picture",
    description: "Upload a clear photo so fans can instantly recognize you.",
  },
  coverPhoto: {
    label: "Cover Photo",
    description: "Add a high‑quality banner image that represents your artistry.",
  },
  bio: {
    label: "Bio",
    description: "Share a short introduction to tell fans who you are.",
  },
  plan: {
    label: "Tiers",
    description:
      "Create at least 3 Business or Personal tiers to start offering playlists.",
  },
};

const startCase = (str: string) =>
  str
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));

const getLabel = (field: string) =>
  labelMap[field] ?? {
    label: startCase(field),
    description: "Complete this step to improve your profile.",
  };

const ProfileCompletenessMeter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { data, isLoading } = useGetArtistProfileCompletenessQuery(undefined);

  const { completedPercent, completed, pending, requiredFields } = data?.data || {
    completedPercent: 0,
    completed: [],
    pending: [],
    requiredFields: [],
  };

  useEffect(() => {
    document.title = `Profile Completeness - ${completedPercent}%`;
  }, [completedPercent]);

  if (isLoading) return <></>;

  const ordered = (
    requiredFields?.length ? requiredFields : [...completed, ...pending]
  ) as string[];
  const completedSet = new Set(completed);

  const renderField = (field: string, isCompleted: boolean) => {
    const { label, description } = getLabel(field);

    const basePill =
      "inline-flex items-center gap-1.5 rounded-full border px-1 py-[2px] text-xs font-medium shadow-sm backdrop-blur transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 relative group";

    const completedStyles =
      "border-emerald-500/30 bg-emerald-400/10 text-emerald-300 ring-emerald-400/20 hover:bg-emerald-400/15";
    const pendingStyles =
      "border-amber-500/30 bg-amber-400/10 text-amber-200 ring-amber-400/20 hover:bg-amber-400/15";

    const iconWrap =
      "flex h-4 w-4 items-center justify-center rounded-full ring-1 ring-inset ring-white/10";

    return (
      <li key={field} className="relative group">
        <span
          className={[
            basePill,
            isCompleted ? completedStyles : pendingStyles,
            "ring-1",
          ].join(" ")}
          aria-label={`${label} ${isCompleted ? "completed" : "pending"}`}
        >
          <span className={iconWrap} aria-hidden>
            <CheckCircle2
              className={`h-3.5 w-3.5 ${isCompleted ? "opacity-100" : "opacity-80"}`}
            />
          </span>
          <span>{label}</span>
          {description && (
            <div className="absolute left-0 top-full !z-[9999999999999999999999999] mt-2 w-[18rem] rounded-xl border border-white/10 bg-neutral-900/95 p-2.5 text-[11px] leading-snug text-white/90 shadow-2xl ring-1 ring-black/20 backdrop-blur-xl opacity-0 translate-y-1 pointer-events-none transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              {description}
            </div>
          )}
        </span>
      </li>
    );
  };

  return (
    <div
      className={cn(
        "relative isolate rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl mx-4 mt-4 justify-between items-start gap-10",
        isOpen ? "flex" : "hidden",
        completedPercent === 100 && "hidden"
      )}
    >
      <div className="flex-1">
        <div className="flex justify-between md:items-start items-end">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Profile completeness
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {ordered.map((field) => renderField(field, completedSet.has(field)))}
            </ul>
          </div>
          <div className="text-base text-muted">{completedPercent}%</div>
        </div>

        <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full transition-all"
            style={{ width: `${completedPercent}%` }}
          />
        </div>
      </div>

      <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProfileCompletenessMeter;
