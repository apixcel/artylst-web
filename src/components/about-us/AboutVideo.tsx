"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export type AboutVideoProps = {
  srcMp4?: string;
  srcWebm?: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  autoPlay?: boolean;
  muted?: boolean; // initial muted
  rounded?: boolean;
  loop?: boolean;
  shieldIdm?: boolean;
};

export default function AboutVideo({
  srcMp4 = "/videos/about-video.mp4",
  srcWebm,
  poster,
  className = "relative",
  videoClassName = "w-full h-full object-cover",
  autoPlay = true,
  muted: initialMuted = true,
  rounded = true,
  loop = true,
  shieldIdm = true,
}: AboutVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blobWebmUrl, setBlobWebmUrl] = useState<string | null>(null);
  const [didSwapToBlob, setDidSwapToBlob] = useState(false);

  // NEW: keep muted as state so we can toggle
  const [isMuted, setIsMuted] = useState<boolean>(initialMuted);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const syncState = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsPlaying(!v.paused && !v.ended);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError("There was a problem loading the video.");
    const onLoadedMeta = () => {
      // apply current mute state to element
      v.muted = isMuted;
      v.playsInline = true;

      if (autoPlay) {
        (async () => {
          try {
            await v.play();
          } catch {
            // Autoplay might fail if not muted—state stays synced below
          } finally {
            syncState();
          }
        })();
      } else {
        syncState();
      }
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("error", onError);

    // keep element in sync if prop/state changes after mount
    v.muted = isMuted;
    v.playsInline = true;
    syncState();

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("error", onError);
    };
  }, [autoPlay, isMuted, syncState]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (blobWebmUrl) URL.revokeObjectURL(blobWebmUrl);
    };
  }, [blobUrl, blobWebmUrl]);

  const swapToBlobIfNeeded = useCallback(async () => {
    if (!shieldIdm || didSwapToBlob) return;

    try {
      const headers: HeadersInit = {};

      if (srcMp4) {
        const res = await fetch(srcMp4, { headers, credentials: "omit" });
        if (!res.ok) throw new Error(`MP4 fetch failed: ${res.status}`);
        const blob = await res.blob();
        setBlobUrl(URL.createObjectURL(blob));
      }

      if (srcWebm) {
        const resW = await fetch(srcWebm, { headers, credentials: "omit" });
        if (!resW.ok) throw new Error(`WEBM fetch failed: ${resW.status}`);
        const blobW = await resW.blob();
        setBlobWebmUrl(URL.createObjectURL(blobW));
      }

      setDidSwapToBlob(true);
    } catch (e) {
      console.error(e);
      setError("Secure load failed; falling back to direct stream.");
    }
  }, [shieldIdm, didSwapToBlob, srcMp4, srcWebm]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await swapToBlobIfNeeded();

      if (v.paused) {
        v.muted = isMuted; // respect current mute state
        v.playsInline = true;
        await v.play();
      } else {
        v.pause();
      }
    } catch (err) {
      console.error("Error playing video:", err);
      setError("Failed to play video");
    } finally {
      syncState();
    }
  }, [isMuted, syncState, swapToBlobIfNeeded]);

  // NEW: mute/unmute handler
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    setIsMuted(next);
    v.muted = next;
    // If unmuting while playing on some browsers, ensure volume > 0
    if (!next && v.volume === 0) {
      v.volume = 1.0;
    }
  }, [isMuted]);

  return (
    <div className={className}>
      <div
        className={["relative", rounded ? "rounded-xl overflow-hidden" : ""].join(" ")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={videoRef}
          className={videoClassName}
          poster={poster}
          muted={isMuted}
          playsInline
          preload="metadata"
          controls={false}
          width={1280}
          height={720}
          controlsList="nodownload noplaybackrate"
          {...(loop ? { loop: true } : {})}
          onClick={togglePlay}
        >
          {/* Prefer blob URLs once created */}
          {didSwapToBlob ? (
            <>
              {blobWebmUrl && <source src={blobWebmUrl} type="video/webm" />}
              {blobUrl && <source src={blobUrl} type="video/mp4" />}
            </>
          ) : (
            <>
              {srcWebm && <source src={srcWebm} type="video/webm" />}
              {srcMp4 && <source src={srcMp4} type="video/mp4" />}
            </>
          )}
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause center overlay */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          aria-pressed={isPlaying}
          className={[
            "absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white text-black p-3 rounded-full shadow",
            "backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            "transition-opacity",
            isTouch
              ? "opacity-100"
              : isPlaying
                ? hovered
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-100",
          ].join(" ")}
        >
          {isPlaying ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>

        {/* NEW: Mute/Unmute button (bottom-right) */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          aria-pressed={!isMuted}
          className={[
            "absolute z-10 bottom-3 right-3",
            "bg-white text-black p-1 rounded-full shadow",
            "backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            "transition-opacity",
            isTouch ? "opacity-100" : hovered ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {isMuted ? (
            <VolumeX size={14} aria-hidden />
          ) : (
            <Volume2 size={14} aria-hidden />
          )}
        </button>

        {error && (
          <div className="absolute inset-x-0 bottom-0 m-2 rounded-md bg-red-600/90 text-white text-xs px-2 py-1 shadow">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
