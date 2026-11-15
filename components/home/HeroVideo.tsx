"use client";

import { useEffect, useRef } from "react";

/** Silent looping background video. The poster shows until it plays, and for visitors who prefer reduced motion. */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not reliably render the `muted` attribute on the server, and browsers only autoplay muted video.
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
    />
  );
}
