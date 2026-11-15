import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Mirissa Fishing Adventure by phone, WhatsApp, email or our enquiry form to plan your fishing trip in Mirissa, Sri Lanka.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Mirissa Fishing Adventure", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Plan Your Day on the Water"
        description="Questions about trips, dates or groups? Send us a message and we'll help."
        image="/contact-hero.png"
        alt="A fishing boat in the turquoise bay at Mirissa beach, framed by palm trees"
      />
      <Section tone="sand" className="!py-10 sm:!py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="flex flex-col">
            <h2 className="mb-5 text-2xl font-semibold">Get in touch</h2>
            <div className="flex flex-1 flex-col [&>*]:flex-1"><ContactInfo /></div>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-5 text-2xl font-semibold">Send us a message</h2>
            <div className="flex flex-1 flex-col [&>*]:flex-1"><ContactForm /></div>
          </div>
        </div>
      </Section>
    </>
  );
}
