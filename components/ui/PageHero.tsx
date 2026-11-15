import { HeroVideo } from "@/components/home/HeroVideo";
import { Container } from "./Section";
import { SafeImage } from "./SafeImage";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  imageClassName,
  video,
  lightOverlay,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  imageClassName?: string;
  /** Optional looping background video; `image` is optional; without it the hero is video only (plain navy for reduced motion). */
  video?: string;
  /** Use a lighter overlay so the photo shows through; text sits on a soft left-side shade. */
  lightOverlay?: boolean;
}) {
  // Highlight the last word of the title in gold, as the home hero does with "Thrill".
  const words = title.split(" ");
  const accent = words.pop();
  const lead = words.join(" ");
  return (
    <header className="relative isolate overflow-hidden bg-navy pt-32 pb-16 text-white sm:pt-48 sm:pb-32">
      {image && <SafeImage src={image} alt={alt ?? ""} priority imgClassName={imageClassName} />}
      {video && <HeroVideo src={video} poster={image} />}
      {lightOverlay ? (
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/25 to-transparent" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/55 to-navy/85" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,42,29,0.55),transparent_70%)]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a017]/50 bg-navy/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] sm:mb-6 sm:gap-3 sm:px-5 sm:py-2 sm:tracking-[0.3em] text-[#f0d36b] backdrop-blur-sm sm:text-sm">
            <span className="h-px w-6 bg-[#d4a017]" aria-hidden />
            {eyebrow}
            <span className="h-px w-6 bg-[#d4a017]" aria-hidden />
          </p>
          <h1 className="text-3xl font-bold leading-[1.15] min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
            {lead}
            {lead && " "}
            <span className="text-[#f0b429]">{accent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-7 sm:text-xl">{description}</p>
        </Reveal>
      </Container>
    </header>
  );
}
