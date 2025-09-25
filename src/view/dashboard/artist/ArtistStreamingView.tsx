"use client";

import React, { useState } from "react";
import {
  ServiceCard,
  SpotifyConnectModal,
  AppleMusicConnectModal,
  SoundCloudConnectModal,
} from "@/components";
import type { ServiceKey, ServiceState } from "@/interface/artist/streaming.interface";

const ArtistStreamingView = () => {
  const [services, setServices] = useState<Record<ServiceKey, ServiceState>>({
    spotify: { status: "not" },
    apple: { status: "not" },
    ytmusic: { status: "not" },
    soundcloud: { status: "not" },
  });

  const [openModal, setOpenModal] = useState<ServiceKey | null>(null);

  const handleConnected = (key: ServiceKey, userId: string) => {
    setServices((prev) => ({
      ...prev,
      [key]: { status: "connected", externalUserId: userId },
    }));
  };

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="dashboard-page-title">Streaming</h1>
        <p className="text-muted text-sm mt-1">
          Connect your streaming platforms to start receiving orders
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <ServiceCard
          name="Spotify"
          desc="Connect with your Spotify user ID."
          status={services.spotify.status}
          actionLabel={services.spotify.status === "connected" ? "Disconnect" : "Connect"}
          onAction={() =>
            services.spotify.status === "connected"
              ? setServices((p) => ({ ...p, spotify: { status: "not" } }))
              : setOpenModal("spotify")
          }
        />

        <ServiceCard
          name="Apple Music"
          desc="Provide your Apple Music profile name."
          status={services.apple.status}
          actionLabel={services.apple.status === "connected" ? "Disconnect" : "Connect"}
          onAction={() =>
            services.apple.status === "connected"
              ? setServices((p) => ({ ...p, apple: { status: "not" } }))
              : setOpenModal("apple")
          }
        />

        <ServiceCard
          name="SoundCloud"
          desc="Enter your SoundCloud username."
          status={services.soundcloud.status}
          actionLabel={
            services.soundcloud.status === "connected" ? "Disconnect" : "Connect"
          }
          onAction={() =>
            services.soundcloud.status === "connected"
              ? setServices((p) => ({ ...p, soundcloud: { status: "not" } }))
              : setOpenModal("soundcloud")
          }
        />
      </div>

      {/* Modals */}
      <SpotifyConnectModal
        open={openModal === "spotify"}
        setOpen={() => setOpenModal(null)}
        onConnected={(id) => handleConnected("spotify", id)}
      />

      <AppleMusicConnectModal
        open={openModal === "apple"}
        setOpen={() => setOpenModal(null)}
        onConnected={(id) => handleConnected("apple", id)}
      />

      <SoundCloudConnectModal
        open={openModal === "soundcloud"}
        setOpen={() => setOpenModal(null)}
        onConnected={(id) => handleConnected("soundcloud", id)}
      />
    </section>
  );
};

export default ArtistStreamingView;
