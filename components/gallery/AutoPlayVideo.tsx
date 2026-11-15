"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Loads only when it is near the screen, then plays (muted, looped) while at least
 * half visible and pauses when scrolled away.
 */
export function AutoPlayVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preloader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preloader.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    preloader.observe(video);
    player.observe(video);
    return () => {
      preloader.disconnect();
      player.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={near ? `${src}#t=0.1` : undefined}
      muted
      loop
      controls
      playsInline
      preload={near ? "metadata" : "none"}
      aria-label={label}
      className="block aspect-[9/16] h-auto w-full bg-navy-800 object-contain"
    />
  );
}
