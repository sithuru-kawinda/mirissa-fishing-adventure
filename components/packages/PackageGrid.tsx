import { Fish } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import type { FishingPackage } from "@/types";
import { PackageCard } from "./PackageCard";

export function PackageGrid({ items }: { items: FishingPackage[] }) {
  if (!items.length) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-dashed border-navy/20 p-12 text-center">
        <Fish className="mx-auto h-10 w-10 text-turquoise-dark" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Packages coming soon</h3>
        <p className="mt-2 text-navy/70">We&apos;re finalising our fishing packages. Get in touch and we&apos;ll help plan your trip.</p>
        <ButtonLink href="/contact" className="mt-6">
          Contact Us
        </ButtonLink>
      </div>
    );
  }
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((pkg, i) => (
        <li key={pkg.slug}>
          <Reveal delay={(i % 3) * 0.1} className="h-full">
            <PackageCard pkg={pkg} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
