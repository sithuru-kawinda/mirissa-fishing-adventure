import fs from "node:fs";
import path from "node:path";
import { galleryVideos } from "./videos";

export type GalleryItem = {
  kind: "image" | "video";
  src: string;
  alt: string;
};

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Small seeded PRNG so the "random" order is stable between builds and renders. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Photos come from whatever is in `public/images`, so dropping new photos in that folder is enough.
 * Videos are hosted on Cloudinary and listed in `data/videos.ts`. Items are shuffled with a fixed seed; change `SEED` for a different arrangement.
 */
const SEED = 7;

export function getGalleryItems(): GalleryItem[] {
  const dir = path.join(process.cwd(), "public", "images");
  const items = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort()
    .map((file): GalleryItem => ({
      kind: "image",
      src: `/images/${encodeURIComponent(file)}`,
      alt: "Photo from a Mirissa fishing trip",
    }));
  const videos = galleryVideos.map((src): GalleryItem => ({ kind: "video", src, alt: "Video from a Mirissa fishing trip" }));

  const rand = mulberry32(SEED);
  const shuffle = (list: GalleryItem[]) => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };
  // Photos and videos are mixed at random, but no two videos touch: the gallery deals items into 2 columns on
  // phones and 4 on desktop, so tiles that sit side by side or stacked are 1, 2 or 4 places apart in this list.
  const photos = shuffle(items);
  const total = photos.length + videos.length;
  const slots = placeVideos(videos.length, total, rand);
  const mixedVideos = shuffle([...videos]);
  let p = 0;
  let v = 0;
  return Array.from({ length: total }, (_, i) => (slots.has(i) ? mixedVideos[v++] : photos[p++]));
}

const TOUCHING = [1, 2, 4];

/** Picks `count` random positions out of `total` where no two positions are touching distances apart. */
function placeVideos(count: number, total: number, rand: () => number): Set<number> {
  const chosen: number[] = [];
  const place = (): boolean => {
    if (chosen.length === count) return true;
    const open = Array.from({ length: total }, (_, i) => i).filter(
      (i) => !chosen.includes(i) && chosen.every((c) => !TOUCHING.includes(Math.abs(c - i))),
    );
    for (let k = open.length - 1; k > 0; k--) {
      const j = Math.floor(rand() * (k + 1));
      [open[k], open[j]] = [open[j], open[k]];
    }
    for (const i of open.slice(0, 6)) {
      chosen.push(i);
      if (place()) return true;
      chosen.pop();
    }
    return false;
  };
  // If there are too many videos to keep apart, fall back to evenly spread positions.
  if (!place()) return new Set(Array.from({ length: count }, (_, k) => Math.floor(((k + 0.5) * total) / count)));
  return new Set(chosen);
}
