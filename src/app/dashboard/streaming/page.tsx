"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { UnauthorizedMsgBox } from "@/components";
import { DialogProvider } from "@/components";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

type ServiceKey = "spotify" | "apple" | "ytmusic" | "soundcloud";

type ServiceState = {
  status: "connected" | "not";
  primary?: boolean;
  externalUserId?: string;
};

// ------------------------------------------------------------
// Reusable card
// ------------------------------------------------------------

const ServiceCard: React.FC<{
  name: string;
  desc: string;
  status: "connected" | "not";
  actionLabel: string;
  primary?: boolean;
  onAction: () => void;
}> = ({ name, desc, status, actionLabel, primary, onAction }) => (
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
      onClick={onAction}
      className={`mt-3 inline-block px-4 py-2 rounded-lg ${
        status === "connected" ? "btn-tertiary" : "btn-secondary"
      }`}
    >
      {actionLabel}
    </button>
    {primary && (
      <div className="text-xs text-muted mt-1">
        This is your default platform for new orders.
      </div>
    )}
  </div>
);

// ------------------------------------------------------------
// Base Connect Modal (internal) – used by per-service modals below
// ------------------------------------------------------------

interface BaseConnectModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  serviceName: string;
  helpText?: string;
  inputLabel?: string;
  placeholder?: string;
  validate: (v: string) => string | null; // returns error string or null if valid
  onSubmit: (userId: string) => Promise<void> | void;
}

const BaseConnectModal: React.FC<BaseConnectModalProps> = ({
  open,
  setOpen,
  serviceName,
  helpText,
  inputLabel = "User ID",
  placeholder = "your-id",
  validate,
  onSubmit,
}) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const error = useMemo(
    () => (touched ? validate(value) : null),
    [touched, value, validate]
  );
  const canSubmit = !error && value.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validate(value);
    if (err) return;
    try {
      setSubmitting(true);
      await onSubmit(value.trim());
      setOpen(false);
      setValue("");
      setTouched(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogProvider
      state={open}
      setState={setOpen as React.Dispatch<React.SetStateAction<boolean>>}
      className="w-[min(92vw,480px)]"
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-2xl"
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Connect {serviceName}</h3>
          {helpText && <p className="text-sm text-muted">{helpText}</p>}
        </div>

        <label className="block text-sm">
          <span className="text-muted">{inputLabel}</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={placeholder}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/10"
          />
        </label>
        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-tertiary px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {submitting ? "Connecting…" : "Connect"}
          </button>
        </div>
      </form>
    </DialogProvider>
  );
};

// ------------------------------------------------------------
// Per‑service modals (separate components as requested)
// ------------------------------------------------------------

export const SpotifyConnectModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void;
}> = ({ open, setOpen, onConnected }) => (
  <BaseConnectModal
    open={open}
    setOpen={setOpen}
    serviceName="Spotify"
    helpText="Enter your Spotify user ID. We'll use it to create private playlists only."
    inputLabel="Spotify User ID"
    placeholder="e.g. rifaj_music_23"
    validate={(v) => {
      if (!v.trim()) return "User ID is required.";
      if (!/^[A-Za-z0-9_\.\-]{3,30}$/.test(v))
        return "3–30 chars; letters, numbers, _ . - allowed.";
      return null;
    }}
    onSubmit={(uid) => onConnected(uid)}
  />
);

export const AppleMusicConnectModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void;
}> = ({ open, setOpen, onConnected }) => (
  <BaseConnectModal
    open={open}
    setOpen={setOpen}
    serviceName="Apple Music"
    helpText="Paste your Apple Music profile or playlist owner name."
    inputLabel="Apple Music ID"
    placeholder="e.g. rifaj.dev"
    validate={(v) => {
      if (!v.trim()) return "ID is required.";
      if (v.length < 3) return "Too short.";
      return null;
    }}
    onSubmit={(uid) => onConnected(uid)}
  />
);

export const YTMusicConnectModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void;
}> = ({ open, setOpen, onConnected }) => (
  <BaseConnectModal
    open={open}
    setOpen={setOpen}
    serviceName="YouTube Music"
    helpText="Provide your channel handle or channel ID."
    inputLabel="Channel Handle/ID"
    placeholder="e.g. @rifaj"
    validate={(v) => {
      if (!v.trim()) return "Handle or ID is required.";
      if (v.startsWith("@") && v.length < 4) return "Handle looks too short.";
      return null;
    }}
    onSubmit={(uid) => onConnected(uid)}
  />
);

export const SoundCloudConnectModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void;
}> = ({ open, setOpen, onConnected }) => (
  <BaseConnectModal
    open={open}
    setOpen={setOpen}
    serviceName="SoundCloud"
    helpText="Enter your SoundCloud username (not the display name)."
    inputLabel="SoundCloud Username"
    placeholder="e.g. rifaj_official"
    validate={(v) => {
      if (!v.trim()) return "Username is required.";
      if (!/^[A-Za-z0-9_\-]{3,25}$/.test(v))
        return "3–25 chars; letters, numbers, _ - allowed.";
      return null;
    }}
    onSubmit={(uid) => onConnected(uid)}
  />
);

// ------------------------------------------------------------
// Page – wires up cards and per‑service modals
// ------------------------------------------------------------

const ArtistStreamingPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const [services, setServices] = useState<Record<ServiceKey, ServiceState>>({
    spotify: { status: "connected", primary: true, externalUserId: "rifaj_music_23" },
    apple: { status: "not" },
    ytmusic: { status: "not" },
    soundcloud: { status: "not" },
  });

  // modal state
  const [openSpotify, setOpenSpotify] = useState(false);
  const [openApple, setOpenApple] = useState(false);
  const [openYT, setOpenYT] = useState(false);
  const [openSC, setOpenSC] = useState(false);

  if (role !== "artist") return <UnauthorizedMsgBox />;

  const updateService = (key: ServiceKey, next: Partial<ServiceState>) =>
    setServices((prev) => ({ ...prev, [key]: { ...prev[key], ...next } }));

  const makePrimary = (key: ServiceKey) =>
    setServices((prev) => {
      const next: Record<ServiceKey, ServiceState> = { ...prev };
      (Object.keys(next) as ServiceKey[]).forEach(
        (k) => (next[k] = { ...next[k], primary: false })
      );
      next[key] = { ...next[key], primary: true };
      return next;
    });

  return (
    <section className="space-y-6">
      <h1 className="dashboard-page-title">Streaming Connections</h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <ServiceCard
          name="Spotify"
          desc="Create private playlists"
          status={services.spotify.status}
          actionLabel={services.spotify.status === "connected" ? "Disconnect" : "Connect"}
          primary={services.spotify.primary}
          onAction={() => {
            if (services.spotify.status === "connected") {
              // quick disconnect (you can replace with your API call + toast)
              updateService("spotify", {
                status: "not",
                externalUserId: undefined,
                primary: false,
              });
            } else setOpenSpotify(true);
          }}
        />

        <ServiceCard
          name="Apple Music"
          desc="Paste playlist links"
          status={services.apple.status}
          actionLabel={services.apple.status === "connected" ? "Disconnect" : "Connect"}
          primary={services.apple.primary}
          onAction={() => {
            if (services.apple.status === "connected") {
              updateService("apple", {
                status: "not",
                externalUserId: undefined,
                primary: false,
              });
            } else setOpenApple(true);
          }}
        />

        <ServiceCard
          name="YouTube Music"
          desc="Unlisted playlist links"
          status={services.ytmusic.status}
          actionLabel={services.ytmusic.status === "connected" ? "Disconnect" : "Connect"}
          primary={services.ytmusic.primary}
          onAction={() => {
            if (services.ytmusic.status === "connected") {
              updateService("ytmusic", {
                status: "not",
                externalUserId: undefined,
                primary: false,
              });
            } else setOpenYT(true);
          }}
        />

        <ServiceCard
          name="SoundCloud"
          desc="Private set/playlist links"
          status={services.soundcloud.status}
          actionLabel={
            services.soundcloud.status === "connected" ? "Disconnect" : "Connect"
          }
          primary={services.soundcloud.primary}
          onAction={() => {
            if (services.soundcloud.status === "connected") {
              updateService("soundcloud", {
                status: "not",
                externalUserId: undefined,
                primary: false,
              });
            } else setOpenSC(true);
          }}
        />
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

      {/* Per‑service modals */}
      <SpotifyConnectModal
        open={openSpotify}
        setOpen={setOpenSpotify}
        onConnected={(uid) => {
          updateService("spotify", { status: "connected", externalUserId: uid });
          makePrimary("spotify");
          // TODO: call your API here
        }}
      />

      <AppleMusicConnectModal
        open={openApple}
        setOpen={setOpenApple}
        onConnected={(uid) => {
          updateService("apple", { status: "connected", externalUserId: uid });
          // do not auto-primary; user can choose later if you prefer
        }}
      />

      <YTMusicConnectModal
        open={openYT}
        setOpen={setOpenYT}
        onConnected={(uid) => {
          updateService("ytmusic", { status: "connected", externalUserId: uid });
        }}
      />

      <SoundCloudConnectModal
        open={openSC}
        setOpen={setOpenSC}
        onConnected={(uid) => {
          updateService("soundcloud", { status: "connected", externalUserId: uid });
        }}
      />
    </section>
  );
};

export default ArtistStreamingPage;
