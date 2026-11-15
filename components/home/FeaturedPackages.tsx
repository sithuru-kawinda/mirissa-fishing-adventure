import { featuredPackages } from "@/data/packages";
import { PackageGrid } from "@/components/packages/PackageGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

export function FeaturedPackages() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Featured Packages"
        title="Choose Your Ocean Adventure"
        description="Pick the trip that suits you. Every package is led by our experienced local crew."
      />
      <PackageGrid items={featuredPackages()} />
      <div className="mt-14 text-center">
        <ButtonLink href="/packages" variant="outline">
          See All Packages
        </ButtonLink>
      </div>
    </Section>
  );
}
