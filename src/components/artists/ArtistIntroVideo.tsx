"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";

export type ArtistIntroVideoProps = {
  srcMp4?: string;
  srcWebm?: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  rounded?: boolean;
  loop?: boolean;
  shieldIdm?: boolean;
};

export default function ArtistIntroVideo({
  srcMp4,
  srcWebm,
  poster,
  className = "relative",
  videoClassName = "w-full h-40 object-cover",
  muted = true,
  rounded = true,
  loop = false,
  shieldIdm = false,
}: ArtistIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blobWebmUrl, setBlobWebmUrl] = useState<string | null>(null);
  const [didSwapToBlob, setDidSwapToBlob] = useState(false);

  const syncState = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsPlaying(!v.paused && !v.ended);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPlaying = syncState;
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError("There was a problem loading the video.");
    const onLoadedMeta = () => syncState();

    v.addEventListener("play", onPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("error", onError);

    syncState();

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("error", onError);
    };
  }, [syncState]);

  // Cleanup blob URLs on unmount or source change
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (blobWebmUrl) URL.revokeObjectURL(blobWebmUrl);
    };
  }, [blobUrl, blobWebmUrl]);

  const swapToBlobIfNeeded = useCallback(async () => {
    if (!shieldIdm || didSwapToBlob) return;

    try {
      // Important: CORS must allow fetch from this origin
      // (Access-Control-Allow-Origin for cross-origin assets)
      const headers: HeadersInit = {
        // You can add non-cache headers if you want
        // "Cache-Control": "no-store",
      };

      if (srcMp4) {
        const res = await fetch(srcMp4, { headers, credentials: "omit" });
        if (!res.ok) throw new Error(`MP4 fetch failed: ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      }

      if (srcWebm) {
        const resW = await fetch(srcWebm, { headers, credentials: "omit" });
        if (!resW.ok) throw new Error(`WEBM fetch failed: ${resW.status}`);
        const blobW = await resW.blob();
        const urlW = URL.createObjectURL(blobW);
        setBlobWebmUrl(urlW);
      }

      setDidSwapToBlob(true);
    } catch (e) {
      console.error(e);
      setError("Secure load failed; falling back to direct stream.");
      // If blob swap fails, we simply keep normal URLs.
    }
  }, [shieldIdm, didSwapToBlob, srcMp4, srcWebm]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      // On first interaction, swap to blob URLs to avoid IDM hook
      await swapToBlobIfNeeded();

      if (v.paused) {
        v.muted = muted;
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
  }, [muted, syncState, swapToBlobIfNeeded]);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={["relative", rounded ? "rounded-xl overflow-hidden" : ""].join(" ")}
      >
        <video
          ref={videoRef}
          className={videoClassName}
          poster={poster}
          muted={muted}
          playsInline
          preload="metadata"
          controls={false}
          width={1280}
          height={720}
          // hides native download/extra controls in some browsers (not a security measure)
          controlsList="nodownload noplaybackrate"
          {...(loop ? { loop: true } : {})}
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

        {/* Center play/pause control (auto-hide unless hover) */}
        {(!isPlaying || hovered) && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            aria-pressed={isPlaying}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black text-sm px-3 py-3 rounded-full backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition-opacity"
          >
            {isPlaying ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          </button>
        )}

        {error && (
          <div className="absolute inset-x-0 bottom-0 m-2 rounded-md bg-red-600/90 text-white text-xs px-2 py-1 shadow">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
