import { ButtonLink } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { Container, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Five of the best gallery photos, shown in a slow auto-sliding carousel. */
const tiles = [
  { src: images.crew, alt: "Our crew holding two giant trevally beside the boat", pos: "object-top" },
  { src: images.privateCharter, alt: "Guests in life jackets beside our boat on the beach", pos: "" },
  { src: images.catchGuide, alt: "Our guide holding a giant trevally beside the boat", pos: "" },
  { src: images.catchReef, alt: "A yellow reef fish just caught", pos: "" },
  { src: "/images/family-on-beach.png", alt: "A family in life jackets on the beach with our guide beside the boat", pos: "" },
];

export function ExperienceGallery() {
  return (
    <section className="bg-navy py-16 text-white sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          invert
          eyebrow="The Experience"
          title="Moments from the Water"
          description="Sunrise departures, open horizons and the quiet thrill of a line going taut."
        />
      </Container>
      <div className="overflow-hidden py-10">
        <div className="marquee-track flex w-max gap-5">
          {[...tiles, ...tiles].map((t, i) => (
            <figure
              key={i}
              aria-hidden={i >= tiles.length}
              className="group relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-3xl bg-navy-800 shadow-lg shadow-black/15 sm:w-64"
            >
              <SafeImage
                src={t.src}
                alt={i >= tiles.length ? "" : t.alt}
                sizes="256px"
                imgClassName={cn("transition-transform duration-700 group-hover:scale-105", t.pos)}
              />
            </figure>
          ))}
        </div>
      </div>
      <Container className="mt-4 text-center">
        <ButtonLink href="/gallery" variant="light">
          View Full Gallery
        </ButtonLink>
      </Container>
    </section>
  );
}
