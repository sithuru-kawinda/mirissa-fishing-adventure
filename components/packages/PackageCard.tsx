import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { getTopics } from "@/data/packageTopics";
import { formatPrice } from "@/lib/utils";
import type { FishingPackage } from "@/types";

export function PackageCard({ pkg }: { pkg: FishingPackage }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/10">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
        <SafeImage
          src={pkg.image}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName={`transition-transform duration-700 group-hover:scale-105 ${pkg.imageClass ?? ""}`}
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy">
          <Clock className="h-3.5 w-3.5 text-turquoise-dark" aria-hidden />
          {pkg.duration}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold text-[#14532d]">{pkg.name}</h3>
        <p className="mt-2 leading-relaxed text-navy/70">{pkg.shortDescription}</p>
        <ul className="mt-5 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
          {getTopics(pkg).map((t) => (
            <li key={t.id}>
              <Link
                href={`/packages/${pkg.slug}#${t.id}`}
                className="group/topic flex items-center gap-1.5 py-1 font-bold text-[#14532d] transition-colors hover:text-ocean-light"
              >
                <ChevronRight className="h-4 w-4 shrink-0 text-turquoise-dark transition-transform group-hover/topic:translate-x-0.5" aria-hidden />
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <p className="mb-4 border-t border-navy/10 pt-5 text-lg font-semibold text-ocean">{formatPrice(pkg.price)}</p>
          <div className="grid grid-cols-2 gap-3">
            <ButtonLink href={`/packages/${pkg.slug}`} variant="goldOutline" size="sm">
              View Details
            </ButtonLink>
            <ButtonLink href={`/packages/${pkg.slug}#book`} variant="forest" size="sm">
              Book Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
