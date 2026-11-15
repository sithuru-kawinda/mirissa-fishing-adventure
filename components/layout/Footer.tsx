import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { packages } from "@/data/packages";
import { navItems, site } from "@/lib/site";

async function Year() {
  "use cache";
  return new Date().getFullYear();
}

const headingClass = "mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white";
const linkClass = "group inline-flex items-center gap-2 transition-colors hover:text-turquoise";

export function Footer() {
  const socials = site.social.filter((s) => s.href && s.href !== "#");

  return (
    <footer className="bg-navy text-white/70">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block" aria-label={`${site.name} home`}>
            <Image src="/logo-transparent.png" alt={site.name} width={1342} height={908} className="h-24 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {site.tagline}. Friendly local crew, unforgettable days on the water.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-4 py-2 transition-colors hover:border-turquoise hover:text-turquoise"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className={headingClass}>Explore</h2>
          <ul className="space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Packages" className="lg:col-span-3">
          <h2 className={headingClass}>Packages</h2>
          <ul className="space-y-3 text-sm">
            {packages.map((p) => (
              <li key={p.slug}>
                <Link href={`/packages/${p.slug}`} className={linkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/packages" className="inline-flex items-center gap-2 font-semibold text-turquoise hover:text-white">
                All packages <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingClass}>Get in touch</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
              {site.contact.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-turquoise">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
              <a href={`mailto:${site.contact.email}`} className="break-all hover:text-turquoise">
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
              {site.contact.hours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            © <Year /> {site.name}. All rights reserved.
          </p>
          <p>{site.location}</p>
        </Container>
      </div>
    </footer>
  );
}
