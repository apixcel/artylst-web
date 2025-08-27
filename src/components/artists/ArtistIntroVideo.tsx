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
};

export default function ArtistIntroVideo({
  srcMp4 = "/videos/artists/artist-video-intro.mp4",
  srcWebm,
  poster,
  className = "relative",
  videoClassName = "w-full h-40 object-cover",
  autoPlay = true,
  muted = true,
  rounded = true,
  loop = false,
}: ArtistIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoadedSrc] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncState = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsPlaying(!v.paused && !v.ended);
  }, []);

  const attemptPlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = muted;
      v.playsInline = true;

      if (v.paused) {
        await v.play();
      }
    } catch {
    } finally {
      syncState();
    }
  }, [muted, syncState]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPlaying = syncState;
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError("There was a problem loading the video.");
    const onLoadedMeta = () => {
      if (autoPlay) attemptPlay();
      syncState();
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("error", onError);

    if (autoPlay) attemptPlay();
    else syncState();

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("error", onError);
    };
  }, [attemptPlay, syncState, autoPlay]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        v.muted = muted;
        v.playsInline = true;
        await v.play();
      } else {
        v.pause();
      }
    } finally {
      syncState();
    }
  }, [muted, syncState]);

  return (
    <div className={className}>
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
          {...(loop ? { loop: true } : {})}
          {...(autoPlay ? { autoPlay: true } : {})}
        >
          {hasLoadedSrc && (
            <>
              {srcWebm && <source src={srcWebm} type="video/webm" />}
              <source src={srcMp4} type="video/mp4" />
            </>
          )}
          Your browser does not support the video tag.
        </video>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          aria-pressed={isPlaying}
          className="absolute bottom-2 left-2 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          {isPlaying ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
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
