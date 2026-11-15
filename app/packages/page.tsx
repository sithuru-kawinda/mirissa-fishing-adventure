import type { Metadata } from "next";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { TargetSpecies } from "@/components/home/TargetSpecies";
import { AddOns, BookingPolicy, Transfers } from "@/components/packages/ExtraInfo";
import { Rates } from "@/components/packages/Rates";
import { BookingCta } from "@/components/ui/BookingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { packages } from "@/data/packages";
import { heroVideos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Fishing Packages",
  description:
    "Browse fishing packages from Mirissa, Sri Lanka. Compare durations, highlights and prices, then book your ocean fishing adventure.",
  alternates: { canonical: "/packages" },
  openGraph: { title: "Fishing Packages | Mirissa Fishing Adventure", url: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Fishing packages from Mirissa"
        description="Find the trip that fits your time, experience and group, then request your date."
        video={heroVideos.packages}
      />
      <Section tone="sand">
        <PackageGrid items={packages} />
      </Section>
      <Rates />
      <TargetSpecies />
      <AddOns />
      <Transfers />
      <BookingPolicy />
      <BookingCta />
    </>
  );
}
