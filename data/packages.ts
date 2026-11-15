import { images } from "@/lib/images";
import type { FishingPackage } from "@/types";

/**
 * To add a package: append an object. Pages, cards, detail routes and the
 * booking selector all read from this array. Omit `price` to show
 * "Price on request".
 */
export const packages: FishingPackage[] = [
  {
    slug: "half-day-shore-reef-fishing",
    name: "Half-Day Shore and Reef Fishing Package",
    shortDescription:
      "An ideal half-day excursion for those who love sea fishing and want to enjoy the experience within a short timeframe.",
    description:
      "An ideal package for those who love sea fishing and wish to enjoy the experience within a short timeframe. Choose a morning or afternoon departure and spend four hours reef fishing and light-tackle fishing with an experienced maritime guide, with all the gear and safety equipment provided.",
    image: images.reefFishing,
    duration: "4 hours (5:30 AM – 9:30 AM or 2:00 PM – 6:00 PM)",
    price: { amount: 250, currency: "USD", unit: "for the whole boat (1–4 guests)" },
    highlights: [
      "Reef fishing and light-tackle fishing",
      "Morning (5:30 AM – 9:30 AM) or afternoon (2:00 PM – 6:00 PM) departure",
      "Target species: snapper, grouper, emperor and other coral reef fish",
    ],
    included: [
      "High-quality fishing gear (fishing rods and reels)",
      "Life jackets for guaranteed safety",
      "Fresh fruit refreshments",
      "An experienced maritime expert/guide",
    ],
    species: ["Snapper", "Grouper", "Emperor", "Other coral reef fish"],
    tourDetails: [
      { label: "Duration", value: "4 hours" },
      { label: "Departure", value: "5:30 AM – 9:30 AM or 2:00 PM – 6:00 PM" },
      { label: "Activity", value: "Reef fishing and light-tackle fishing" },
      { label: "Group", value: "1–4 guests on the boat (up to 6 with an extra fee per guest)" },
    ],
    featured: true,
  },
  {
    slug: "full-day-deep-sea-sport-fishing",
    name: "Full-Day Deep-Sea Sport Fishing Expedition",
    shortDescription:
      "A deep-sea trip for anglers who want to chase large, hard-fighting big game fish in the waters off Mirissa.",
    description:
      "Made for sport anglers keen to catch large, hard-fighting big game fish in the deep waters off Mirissa. Troll and sport-fish the open ocean with world-class tackle, full safety equipment, refreshments and lunch, and a crew who will help you capture photos and video of your catch.",
    image: images.crew,
    imageClass: "object-[50%_35%]",
    duration: "4–5 hours (6:00 AM – 11:00 AM)",
    price: { amount: 100, currency: "USD", unit: "per person" },
    highlights: [
      "Trolling and deep-sea sport fishing",
      "Target species: marlin, sailfish, yellowfin tuna, dorado (mahi-mahi) and barracuda",
      "World-class tackle such as the Shimano TLD 25",
    ],
    included: [
      "World-class fishing equipment and tackle, such as the Shimano TLD 25",
      "Life jackets and full safety equipment",
      "Drinking water, cold drinks and a lunch package",
      "Help capturing photos and videos",
    ],
    species: ["Marlin", "Sailfish", "Yellowfin Tuna", "Dorado (Mahi-Mahi)", "Barracuda"],
    tourDetails: [
      { label: "Duration", value: "4–5 hours" },
      { label: "Departure", value: "6:00 AM – 11:00 AM" },
      { label: "Activity", value: "Trolling and deep-sea sport fishing" },
      { label: "Tackle", value: "World-class equipment such as the Shimano TLD 25" },
    ],
    featured: true,
  },
  {
    slug: "customized-private-charter",
    name: "Customized Private Charter",
    shortDescription:
      "Take the whole boat for your family or close friends, with the trip shaped around what you want to do.",
    description:
      "If you want to head out to sea with only your family or close friends, this package is fully tailored to you. The entire boat is reserved for your group, and you choose the hours, the start time and the mix of sightseeing, snorkelling and fishing. Special food and drink requests can be arranged too.",
    image: images.privateCharter,
    duration: "Flexible: hours and start time are up to you",
    highlights: [
      "The whole boat reserved for your group, with no outside guests",
      "Combine a sea cruise, snorkelling and fishing however you like",
      "Special food and drink requests catered for",
    ],
    included: [
      "Exclusive use of the boat for your group",
      "Your own choice of trip length and start time",
      "Sea cruising, snorkelling and fishing, mixed to suit you",
      "Arrangements for special food and drink needs",
      "Safety briefing and life jackets for every guest",
    ],
    tourDetails: [
      { label: "Duration", value: "Your choice of hours" },
      { label: "Departure", value: "Your choice of start time" },
      { label: "Activity", value: "Sea cruising, snorkelling and fishing, mixed to suit you" },
      { label: "Boat", value: "The whole boat reserved for your group" },
    ],
    featured: true,
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const featuredPackages = () => {
  const f = packages.filter((p) => p.featured);
  return f.length ? f : packages.slice(0, 3);
};
