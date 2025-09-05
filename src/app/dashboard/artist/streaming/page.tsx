"use client";

import { DropdownOption } from "@/interface";
import { Dropdown } from "@/components";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";

const streamingServices: DropdownOption<string>[] = [
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple-music" },
  { label: "YouTube Music", value: "youtube-music" },
  { label: "SoundCloud", value: "soundcloud" },
  { label: "Tidal", value: "tidal" },
];

const ServiceCard = ({
  name,
  desc,
  status,
  action,
  primary,
}: {
  name: string;
  desc: string;
  status: "connected" | "not";
  action: string;
  primary?: boolean;
}) => (
  <div className="rounded-2xl p-6 border border-white/10 bg-brand-2/10 space-y-2 backdrop-blur-2xl">
    <div className="flex items-center justify-between">
      <h3>{name}</h3>
      {status === "connected" ? (
        <span className="text-emerald-400 text-xs flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Connected
        </span>
      ) : (
        <span className="text-muted text-xs flex items-center gap-1">
          <XCircle className="h-3 w-3" /> Not connected
        </span>
      )}
    </div>
    <div className="text-sm text-muted">{desc}</div>
    <button
      className={`mt-3 inline-block px-4 py-2 rounded-lg ${
        status === "connected" ? "btn-tertiary" : "btn-secondary"
      }`}
    >
      {action}
    </button>
    {primary && (
      <div className="text-xs text-muted mt-1">
        This is your default platform for new orders.
      </div>
    )}
  </div>
);

const ArtistStreamingPage = () => {
  const [defaultPlatform, setDefaultPlatform] = useState<DropdownOption<string>>(
    streamingServices[0]
  );

  return (
    <section className="space-y-6">
      <h1 className="dashboard-page-title">Streaming Connections</h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <ServiceCard
          name="Spotify"
          desc="Create private playlists"
          status="connected"
          action="Disconnect"
          primary
        />
        <ServiceCard
          name="Apple Music"
          desc="Paste playlist links"
          status="not"
          action="Connect"
        />
        <ServiceCard
          name="YouTube Music"
          desc="Unlisted playlist links"
          status="not"
          action="Connect"
        />
        <ServiceCard
          name="SoundCloud"
          desc="Private set/playlist links"
          status="not"
          action="Connect"
        />
        <ServiceCard
          name="Tidal"
          desc="Paste playlist links"
          status="not"
          action="Connect"
        />
      </div>

      {/* Default platform selection */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-5/10 backdrop-blur-xl">
        <h3 className="mb-2">Default platform</h3>
        <Dropdown
          value={defaultPlatform}
          options={streamingServices}
          onChange={(v) => setDefaultPlatform(v)}
          buttonClassName=""
        />

        <div className="text-xs text-muted mt-2">
          Orders will auto-select this platform unless buyer specifies otherwise.
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl p-6 border border-white/10 bg-brand-2/15 text-sm space-y-2">
        <div className="flex items-center gap-2 text-base">
          <ShieldCheck className="h-5 w-5" /> Privacy & Tips
        </div>
        <p className="text-muted">
          Fans only receive the playlist link passed through LYSTN. Your personal account
          details stay private.
        </p>
        <p className="text-muted">
          Always create <span className="text-white">private or unlisted</span> playlists
          when possible.
        </p>
      </div>
    </section>
  );
};

export default ArtistStreamingPage;
