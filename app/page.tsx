import type { Metadata } from "next";
import { ExperienceGallery } from "@/components/home/ExperienceGallery";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { TargetSpecies } from "@/components/home/TargetSpecies";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BookingCta } from "@/components/ui/BookingCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Fishing Trips in Mirissa, Sri Lanka` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedPackages />
      <TargetSpecies />
      <WhyChooseUs />
      <ExperienceGallery />
      <Testimonials />
      <BookingCta />
    </>
  );
}
