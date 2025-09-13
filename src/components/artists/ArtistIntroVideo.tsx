"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export default function ArtistIntroVideo({ introVideo }: { introVideo: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Create a detached node for the portal so we don't need a #modal-root
  const portalEl = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.setAttribute("data-artist-video-portal", "true");
    return el;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mount/unmount portal element on body
  useEffect(() => {
    if (!portalEl) return;
    document.body.appendChild(portalEl);
    return () => {
      if (portalEl.parentNode) portalEl.parentNode.removeChild(portalEl);
    };
  }, [portalEl]);

  // Lock scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="lg:block hidden w-1/2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative group cursor-pointer focus:outline-none flex items-center gap-1 text-brand-4 my-3"
          aria-label="Play hero video"
        >
          Artist Intro Video
          <span className="relative flex items-center justify-center">
            <span className="relative inline-flex items-center justify-center rounded-full p-1 bg-white/90 backdrop-blur shadow-lg transition transform group-hover:scale-110 group-hover:bg-white">
              <Play className="w-3 h-3 text-black" />
            </span>
          </span>
        </button>
      </div>

      {mounted && open && portalEl
        ? createPortal(
            <div
              className={clsx(
                // Full-screen overlay, highest z to beat site chrome
                "fixed inset-0 z-[999999]",
                "bg-black/70 backdrop-blur-sm",
                "flex items-center justify-center p-4"
              )}
              onClick={close}
            >
              <div
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()} // prevent backdrop click
              >
                <button
                  type="button"
                  onClick={close}
                  className="absolute -top-12 right-0 text-white/90 hover:text-white"
                  aria-label="Close video"
                  title="Close"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-black">
                  <video
                    src={introVideo || "/videos/home-hero.mp4"}
                    className="w-full h-full"
                    autoPlay
                    loop
                    controls
                  />
                </div>
              </div>
            </div>,
            portalEl
          )
        : null}
    </>
  );
}
