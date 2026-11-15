import type { Metadata } from "next";
import { AutoPlayVideo } from "@/components/gallery/AutoPlayVideo";
import { BookingCta } from "@/components/ui/BookingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { getGalleryItems, type GalleryItem } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from fishing trips off Mirissa, Sri Lanka: sunrise departures, open ocean, boats and the catch.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery | Mirissa Fishing Adventure", url: "/gallery" },
};

function GalleryColumns({ items, count, className }: { items: GalleryItem[]; count: number; className: string }) {
  const columns = Array.from({ length: count }, (_, c) => items.filter((_, i) => i % count === c));
  return (
    <div className={cn("flex items-start gap-3 sm:gap-4", className)}>
      {columns.map((column, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          {column.map((item, i) => (
            <Reveal key={item.src} delay={((i + c) % 4) * 0.05}>
              <figure className="overflow-hidden rounded-2xl bg-navy-800">
                {item.kind === "video" ? (
                  <AutoPlayVideo src={item.src} label={item.alt} />
                ) : (
                  // Plain <img> keeps each photo's original proportions without cropping.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  const galleryItems = getGalleryItems();
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the water"
        description="Sunrise departures, open horizons and the quiet thrill of a line going taut."
        image="/gallery-hero.png"
        alt="Three anglers relaxing on the stern of a fishing boat with rods set"
      />
      <Section tone="sand">
        {/* Items are dealt round-robin into columns, so the first row is all photos. */}
        <GalleryColumns items={galleryItems} count={2} className="lg:hidden" />
        <GalleryColumns items={galleryItems} count={4} className="hidden lg:flex" />
      </Section>
      <BookingCta />
    </>
  );
}
