"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useGetArtistProfileCompletenessQuery } from "@/redux/features/artist/artist.api";
import ProfileCompletenessSkeleton from "./ProfileCompletenessSkeleton";
import { useEffect } from "react";

const ProfileCompletenessMeter = () => {
  const { data, isLoading } = useGetArtistProfileCompletenessQuery(undefined);
  const { completedPercent, completed, pending } = data?.data || {
    completedPercent: 0,
    completed: [],
    pending: [],
  };

  useEffect(() => {
    document.title = `Profile Completeness - ${completedPercent}%`;
  }, [completedPercent]);

  const renderField = (field: string, isCompleted: boolean) => (
    <li
      key={field}
      className={`flex items-center gap-1 ${
        isCompleted ? "opacity-100 text-light" : "opacity-60"
      }`}
    >
      <CheckCircle2 className="h-3 w-3" />
      {field.charAt(0).toUpperCase() + field.slice(1)}
    </li>
  );

  if (isLoading) return <ProfileCompletenessSkeleton />;

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
        {completed?.map((field: string) => renderField(field, true))}
        {pending?.map((field: string) => renderField(field, false))}
      </ul>
    </div>
  );
};

export default ProfileCompletenessMeter;
