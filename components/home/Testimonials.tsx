import { ReviewCarousel } from "@/components/home/ReviewCarousel";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow="Guest stories" title="What our guests say" />
      <ReviewCarousel items={testimonials} />
    </Section>
  );
}
