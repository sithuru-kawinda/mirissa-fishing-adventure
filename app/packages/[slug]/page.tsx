import { Check, Clock, Fish, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { TopicAccordion } from "@/components/packages/TopicAccordion";
import { WhatToBring } from "@/components/packages/WhatToBring";
import { BookingCta } from "@/components/ui/BookingCta";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { transfer } from "@/data/extras";
import { getPackage, packages } from "@/data/packages";
import { foreignVisitorInfo, getTopics, type TopicId } from "@/data/packageTopics";
import { extraPassengers, paymentMethods, ratesNote } from "@/data/rates";
import { ogImage } from "@/lib/site";
import { packagePrice } from "@/lib/utils";
import type { FishingPackage } from "@/types";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-dark" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function topicContent(pkg: FishingPackage): Record<TopicId, ReactNode> {
  return {
    price: (
      <div className="font-inter">
        <p className="text-3xl font-bold text-ocean">{packagePrice(pkg)}</p>
        {pkg.price?.unit?.includes("boat") && (
          <p className="mt-2 text-navy/75">
            Covers up to {extraPassengers.includedGuests} guests. Each additional guest is ${extraPassengers.amount} extra, up to{" "}
            {extraPassengers.maxGuests} guests.
          </p>
        )}
        {!pkg.price && !pkg.priceLabel && <p className="mt-2 text-navy/75">Contact us for a quote based on your plans.</p>}
        <p className="mt-3 text-sm text-navy/60">{pkg.priceNote ?? ratesNote}</p>
      </div>
    ),
    included: <CheckList items={pkg.included} />,
    "foreign-visitors": <CheckList items={foreignVisitorInfo} />,
    "best-season": <p className="text-navy/75">{pkg.bestSeason}</p>,
    species: (
      <ul className="flex flex-wrap gap-3">
        {pkg.species?.map((f) => (
          <li key={f} className="flex items-center gap-2 rounded-full bg-sand-light px-4 py-2">
            <Fish className="h-4 w-4 text-turquoise-dark" aria-hidden /> {f}
          </li>
        ))}
      </ul>
    ),
    "tour-details": (
      <dl className="divide-y divide-navy/10 rounded-2xl bg-sand-light">
        {pkg.tourDetails.map((d) => (
          <div key={d.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[160px_1fr]">
            <dt className="font-semibold">{d.label}</dt>
            <dd className="text-navy/75">{d.value}</dd>
          </div>
        ))}
      </dl>
    ),
    tips: <WhatToBring />,
    transportation: (
      <>
        <p className="text-navy/75">{transfer.free}</p>
        <p className="mt-3 text-navy/75">
          {transfer.nearbyIntro} {transfer.nearby.join(", ")}. {transfer.vehicles}
        </p>
      </>
    ),
    payments: (
      <>
        {pkg.paymentNote && <p className="mb-3 font-semibold text-navy">{pkg.paymentNote}</p>}
        <ul className="space-y-2">
          {paymentMethods.map((m) => (
            <li key={m.title} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-dark" aria-hidden />
              <span>
                <span className="font-semibold">{m.title}:</span> {m.detail}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-navy/60">
          Free cancellation up to 24 hours before departure, and a full refund or new date if weather cancels the trip.
        </p>
      </>
    ),
  };
}

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return {
    title: pkg.name,
    description: pkg.shortDescription,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: { title: `${pkg.name} | Mirissa Fishing Adventure`, description: pkg.shortDescription, images: [ogImage] },
  };
}

export default async function PackageDetailPage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const content = topicContent(pkg);
  const items = getTopics(pkg).map((t) => ({ ...t, content: content[t.id] }));

  return (
    <>
      <PageHero
        eyebrow="Fishing Package"
        title={pkg.name}
        description={pkg.shortDescription}
        image={pkg.image}
        alt={`${pkg.name} fishing package`}
        imageClassName={pkg.imageClass}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold">{pkg.name}</h2>
            <p className="mt-2 flex items-center gap-1.5 font-semibold text-turquoise-dark">
              <MapPin className="h-4 w-4" aria-hidden /> Mirissa, Sri Lanka
            </p>
            <p className="mt-5 text-base leading-relaxed text-navy/75 sm:text-lg">{pkg.description}</p>
            {pkg.priceLabel && (
              <p className="mt-4 rounded-2xl border border-[#d4a017]/50 bg-[#d4a017]/10 px-4 py-3 text-sm font-semibold text-navy sm:text-base">
                Note: {pkg.priceLabel}. Add it to any other package you book with us.
              </p>
            )}

            <TopicAccordion items={items} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div id="book" className="scroll-mt-28 rounded-3xl font-inter border border-navy/10 bg-white p-6 sm:p-8 shadow-xl shadow-navy/5 transition-shadow target:ring-4 target:ring-[#d4a017]/60">
              <h3 className="text-center text-xl font-bold text-[#14532d]">{pkg.name}</h3>
              <div className="mx-auto mt-4 h-px w-12 bg-[#d4a017]" aria-hidden />
              <p className="mt-5 text-center text-sm font-semibold uppercase tracking-wider text-navy/50">Price</p>
              <p className="mt-1 text-center text-3xl font-bold text-ocean">{packagePrice(pkg)}</p>
              <p className="mt-5 flex items-center justify-center gap-2 text-center text-navy/75">
                <Clock className="h-5 w-5 shrink-0 text-turquoise-dark" aria-hidden /> {pkg.duration}
              </p>
              {pkg.bookable !== false && (
                <ButtonLink href={`/booking?package=${pkg.slug}`} variant="forest" size="lg" className="mt-8 w-full">
                  Book This Package
                </ButtonLink>
              )}
              <ButtonLink href="/contact" variant="outline" className={pkg.bookable === false ? "mt-8 w-full" : "mt-3 w-full"}>
                Ask a Question
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
