import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Book Your Fishing Adventure",
  description: "Request your fishing trip in Mirissa, Sri Lanka. Choose a package, date and group size and our team will be in touch.",
  alternates: { canonical: "/booking" },
  openGraph: { title: "Book | Mirissa Fishing Adventure", url: "/booking" },
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book now"
        title="Book your fishing adventure"
        description="Tell us what you have in mind and we'll confirm availability with you."
        image={images.goldenShore}
        alt="Sunrise over a calm turquoise sea"
      />
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white" aria-label="Loading booking form" />}>
            <BookingForm />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
