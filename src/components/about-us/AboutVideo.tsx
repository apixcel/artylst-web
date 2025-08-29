"use client";
import { useEffect, useRef } from "react";

const AboutVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/videos/about-video.mp4")
      .then((res) => res.blob())
      .then((blob) => {
        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(blob);
        }
      });
  }, []);

  return (
    <div className="card p-4 lg:block hidden">
      <video
        ref={videoRef}
        autoPlay
        controls
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default AboutVideo;
