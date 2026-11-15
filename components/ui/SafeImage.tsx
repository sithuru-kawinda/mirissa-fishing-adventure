"use client";

import Image from "next/image";
import { Waves } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Fills its (relatively positioned) parent. Shows an ocean-toned fallback if the image fails. */
export function SafeImage({ src, alt, sizes = "100vw", priority, className, imgClassName }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-navy-800", className)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-ocean"
        >
          <Waves className="h-10 w-10 text-white/40" aria-hidden />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
