"use client";
import React from "react";
import { GlobeIcon, InstagramIcon, PlayCircle, YoutubeIcon } from "lucide-react";
import { SpotifyIcon, TiktokIcon } from "@/icons";

export type SocialLinks = {
  spotify: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  website: string;
  playlist: string;
};

export default function ArtistSocialLinks({
  values,
  onChange,
  onSave,
  dirty,
  isSaving,
  title = "Social & links",
}: {
  values: SocialLinks;
  onChange: (key: keyof SocialLinks, val: string) => void;
  onSave: () => void | Promise<void>;
  dirty?: boolean;
  isSaving?: boolean;
  title?: string;
}) {
  return (
    <div className="border-b border-white/10 pb-4">
      <label className="text-sm text-white/60">{title}</label>

      <div className="grid md:grid-cols-2 gap-3 mt-1 mb-3">
        <div className="flex items-center gap-2">
          <SpotifyIcon className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="Spotify artist / playlist URL"
            value={values.spotify}
            onChange={(e) => onChange("spotify", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <YoutubeIcon className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="YouTube channel / video URL"
            value={values.youtube}
            onChange={(e) => onChange("youtube", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <InstagramIcon className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="Instagram profile"
            value={values.instagram}
            onChange={(e) => onChange("instagram", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <TiktokIcon className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="TikTok profile"
            value={values.tiktok}
            onChange={(e) => onChange("tiktok", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <GlobeIcon className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="Website / Linktree"
            value={values.website}
            onChange={(e) => onChange("website", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <PlayCircle className="h-5 w-full max-w-5" />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2"
            placeholder="Sample playlist URL"
            value={values.playlist}
            onChange={(e) => onChange("playlist", e.target.value)}
          />
        </div>
      </div>

      <SaveButton
        label={isSaving ? "Saving…" : "Save links"}
        onClick={onSave}
        disabled={!dirty || isSaving}
      />
    </div>
  );
}

function SaveButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 whitespace-nowrap items-center hover:bg-brand-4/70 disabled:opacity-60"
        onClick={onClick}
        disabled={!!disabled}
      >
        {label}
      </button>
    </div>
  );
}
