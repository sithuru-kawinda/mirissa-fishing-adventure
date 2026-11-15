import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";

export function FaqPreview() {
  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Good Questions, Honest Answers" />
      <Reveal className="mx-auto max-w-3xl">
        <Accordion items={faqs.slice(0, 4)} />
        <div className="mt-10 text-center">
          <ButtonLink href="/faq" variant="outline">
            View All FAQs
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
