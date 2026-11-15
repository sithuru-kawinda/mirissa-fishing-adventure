import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { Container } from "@/components/ui/Section";
import { heroVideos } from "@/data/videos";
import { images } from "@/lib/images";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-white">
      <SafeImage src={images.hero} alt="Traditional fishing boats on turquoise water off the coast of Mirissa" priority />
      <HeroVideo src={heroVideos.home} poster="/videos/home-hero-poster.jpg" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,42,29,0.55),transparent_70%)]" />
      <Container className="relative pb-24 pt-32 sm:pt-36">
        <Reveal className="mx-auto max-w-4xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a017]/50 bg-navy/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] sm:mb-6 sm:gap-3 sm:px-5 sm:py-2 sm:tracking-[0.3em] text-[#f0d36b] backdrop-blur-sm sm:text-sm">
            <span className="h-px w-6 bg-[#d4a017]" aria-hidden />
            Mirissa · Sri Lanka
            <span className="h-px w-6 bg-[#d4a017]" aria-hidden />
          </p>
          <h1 className="text-3xl font-bold leading-[1.15] min-[400px]:text-4xl sm:text-6xl lg:text-7xl">
            Experience the <span className="text-[#f0b429]">Thrill</span> of{" "}
            <span className="text-turquoise">Mirissa Fishing Adventures</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:mt-7 leading-relaxed text-white/90 sm:text-xl">
            Head out onto the Indian Ocean with a <strong className="font-semibold text-[#f0d36b]">friendly local crew</strong> and discover
            the very best of Sri Lanka&apos;s southern coast.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <ButtonLink href="/packages" variant="gold" size="lg">
              Explore Packages
            </ButtonLink>
            <ButtonLink href="/packages" variant="light" size="lg">
              Book Your Adventure
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
      <a
        href="#intro"
        aria-label="Scroll to introduction"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/70 hover:text-white sm:block"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}
