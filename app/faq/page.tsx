import type { Metadata } from "next";
import { ogImage } from "@/lib/site";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { BookingCta } from "@/components/ui/BookingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about fishing trips in Mirissa, Sri Lanka: booking, what to bring, beginners, weather and private trips.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | Mirissa Fishing Adventure", url: "/faq", images: [ogImage] },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you might want to know before heading out to sea."
        image="/faq-hero-sunset.png"
        alt="Fishing rods on the stern of a boat leaving a wake at sunset"
      />
      <Section tone="sand" className="!py-10 sm:!py-12">
        <FaqExplorer items={faqs} />
        <p className="mt-8 text-center text-navy/70">Can&apos;t find your answer? Contact us and we&apos;ll be happy to help.</p>
      </Section>
      <BookingCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
