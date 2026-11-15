import type { NavItem } from "@/types";

/**
 * Public address of the site, used for absolute links in social-sharing tags, the sitemap and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com) on the host; failing that, use the address the host provides.
 */
function siteUrl() {
  const e = process.env;
  const host = e.VERCEL_PROJECT_PRODUCTION_URL ?? e.VERCEL_URL;
  const url = e.NEXT_PUBLIC_SITE_URL || (host ? `https://${host}` : e.URL || e.DEPLOY_PRIME_URL) || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

/**
 * Central business configuration. Replace the placeholder values below with
 * real details; every component reads from here.
 */
export const site = {
  name: "Mirissa Fishing Adventure",
  shortName: "Mirissa Fishing",
  tagline: "Ocean fishing adventures from Mirissa, Sri Lanka",
  description:
    "Deep-sea and coastal fishing adventures from Mirissa, Sri Lanka. Join a friendly local team for an unforgettable day on the Indian Ocean.",
  url: siteUrl(),
  location: "Mirissa, Sri Lanka",
  contact: {
    // TODO: replace with real details
    phone: "+94 77 529 2035",
    whatsapp: "94775292035", // digits only, international format, no "+"
    email: "mirissafishingadventure@gmail.com",
    address: "04 Thappawatta Road, Mirissa 81740, Sri Lanka",
    hours: "Daily, hours to be confirmed",
    /** Paste a Google Maps embed URL (Share → Embed a map → src) to show a live map. */
    mapEmbedUrl: "https://www.google.com/maps?q=5.9373552,80.4798984&z=17&output=embed",
  },
  social: [
    // TODO: replace "#" with real profile URLs. Entries with "#" are hidden.
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TripAdvisor", href: "#" },
  ],
  /**
   * Optional backend. If set, forms POST JSON here. If empty, forms run in
   * local mode and tell the visitor nothing was sent.
   */
  bookingEndpoint: process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "/api/booking",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact",
} as const;

/** Social-sharing (Open Graph) image: the file is `app/opengraph-image.jpg`. Pages that set their own `openGraph` must include it. */
export const ogImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Mirissa Fishing Adventure: ocean fishing trips from Mirissa, Sri Lanka",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
