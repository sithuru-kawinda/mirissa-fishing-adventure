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

/**
 * Picks `count` random positions out of `total` where no two are 1, 2 or 4 places apart. Positions are chosen left
 * to right, so every gap is 3 or at least 5 (which also rules out any non-adjacent pair being too close). A gap is
 * only taken if the remaining videos still fit at the minimum gap of 3, so the search finishes immediately.
 */
function placeVideos(count: number, total: number, rand: () => number): Set<number> {
  const MIN_GAP = 3;
  const maxGap = Math.ceil((2 * total) / Math.max(count, 1)); // keeps videos spread across the page
  const chosen: number[] = [];
  const place = (last: number): boolean => {
    if (chosen.length === count) return true;
    const room = MIN_GAP * (count - chosen.length - 1); // space the later videos still need after this one
    const first = last < 0 ? 0 : last + MIN_GAP;
    const candidates: number[] = [];
    for (let i = first; i <= Math.min(total - 1 - room, last < 0 ? maxGap : last + maxGap); i++) {
      if (last >= 0 && i - last === 4) continue;
      candidates.push(i);
    }
    for (let k = candidates.length - 1; k > 0; k--) {
      const j = Math.floor(rand() * (k + 1));
      [candidates[k], candidates[j]] = [candidates[j], candidates[k]];
    }
    for (const i of candidates) {
      chosen.push(i);
      if (place(i)) return true;
      chosen.pop();
    }
    return false;
  };
  // If there are too many videos to keep apart, fall back to evenly spread positions.
  if (!place(-1)) return new Set(Array.from({ length: count }, (_, k) => Math.floor(((k + 0.5) * total) / count)));
  return new Set(chosen);
}
