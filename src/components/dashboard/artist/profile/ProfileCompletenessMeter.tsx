"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useGetArtistProfileCompletenessQuery } from "@/redux/features/artist/artist.api";
import ProfileCompletenessSkeleton from "./ProfileCompletenessSkeleton";
import { useEffect } from "react";

const labelMap: Record<string, string> = {
  coverPhoto: "Cover Photo",
  avatar: "Avatar",
  bio: "Bio",
  plan: "Tier",
};

const startCase = (str: string) =>
  str
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));

const getLabel = (field: string) => labelMap[field] ?? startCase(field);

const ProfileCompletenessMeter = () => {
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

  const renderField = (field: string, isCompleted: boolean) => (
    <li
      key={field}
      className={`flex items-center gap-1 ${
        isCompleted ? "text-brand-4" : "text-light opacity-90"
      }`}
    >
      <CheckCircle2 className="h-3 w-3" />
      {getLabel(field)}
    </li>
  );

  if (isLoading) return <ProfileCompletenessSkeleton />;

  const ordered = (
    requiredFields?.length ? requiredFields : [...completed, ...pending]
  ) as string[];
  const completedSet = new Set(completed);

  return (
    <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Profile completeness
        </div>
        <div className="text-base text-muted">{completedPercent}%</div>
      </div>

      <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white/70 rounded-full transition-all"
          style={{ width: `${completedPercent}%` }}
        />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
        {ordered.map((field) => renderField(field, completedSet.has(field)))}
      </ul>
    </div>
  );
};

export default ProfileCompletenessMeter;
