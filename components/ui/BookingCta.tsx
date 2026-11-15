import { images } from "@/lib/images";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { SafeImage } from "./SafeImage";
import { Container } from "./Section";

export function BookingCta({
  title = "Ready for Your Fishing Adventure?",
  text = "Tell us when you'd like to join us on the water and our team will get back to you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-16 text-white sm:py-32">
      <SafeImage src={images.sunset} alt="Sunset over the ocean at Mirissa" />
      <div className="absolute inset-0 bg-navy/70" />
      <Container className="relative text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold leading-tight min-[400px]:text-3xl sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base text-white/80 sm:mt-5 sm:text-lg">{text}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
            <ButtonLink href="/booking" size="lg">
              Book Your Trip
            </ButtonLink>
            <ButtonLink href="/contact" variant="light" size="lg">
              Contact Us
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
