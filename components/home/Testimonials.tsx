import { ReviewCarousel } from "@/components/home/ReviewCarousel";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow="Guest Stories" title="What Our Guests Say" />
      <ReviewCarousel items={testimonials} />
    </Section>
  );
}
