import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

const c = site.contact;

const items = [
  { icon: Phone, label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: `+${c.whatsapp}`, href: whatsappLink() },
  { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
  { icon: MapPin, label: "Location", value: c.address },
  { icon: Clock, label: "Hours", value: c.hours },
];

export function ContactInfo() {
  return (
    <div className="flex h-full flex-col">
      <ul className="space-y-6">
        {items.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise-dark">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-navy/50">{label}</p>
              {href ? (
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="break-words text-base font-medium transition-colors hover:text-ocean sm:text-lg"
                >
                  {value}
                </a>
              ) : (
                <p className="text-base font-medium sm:text-lg">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex min-h-64 sm:mt-10 sm:min-h-72 flex-1 overflow-hidden rounded-3xl border border-navy/10 bg-sand-light">
        {c.mapEmbedUrl ? (
          <iframe
            title={`Map of ${site.location}`}
            src={c.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-72 w-full border-0"
          />
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin className="h-9 w-9 text-turquoise-dark" aria-hidden />
            <p className="font-display text-xl">{site.location}</p>
            <p className="text-sm text-navy/60">Google Maps will appear here once the map link is added.</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ocean underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
