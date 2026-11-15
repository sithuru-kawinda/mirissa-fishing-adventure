import type { NavItem } from "@/types";

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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
