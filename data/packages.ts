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
  {
    slug: "snorkeling-with-turtles",
    name: "Snorkeling with Turtles",
    shortDescription: "A relaxed, family-friendly snorkel out to a turtle feeding site just off Mirissa. Free with any other booking.",
    description:
      "A gentle morning snorkel to a turtle feeding site near Mirissa, suitable for families. Life jackets are provided, so non-swimmers can join too. Your guide keeps a respectful distance so you can watch the turtles without disturbing them.",
    image: images.reef,
    duration: "About 3–3.5 hours (7:30 – 8:00 AM start, back by around 11:00 AM)",
    bookable: false,
    priceLabel: "Free with any other booking",
    paymentNote:
      "There is nothing to pay for this experience. It is free when you book any other package, and your main booking is paid in the usual way:",
    priceNote: "Add it at no extra cost when you book any other package. Includes snorkel mask, fins and life jacket, an experienced guide, drinking water and fruit or biscuits.",
    highlights: [
      "Free with any other booking",
      "Snorkel at a turtle feeding site, from the boat or from the beach",
      "Family-friendly, and non-swimmers can join with a life jacket",
      "Free hotel pick-up and drop-off from Mirissa and nearby areas",
    ],
    included: [
      "Snorkel mask, fins and life jacket",
      "An experienced snorkelling guide",
      "Drinking water, fruit and biscuits",
      "GoPro underwater photos and video (on some packages)",
    ],
    tourDetails: [
      { label: "Duration", value: "About 3–3.5 hours" },
      { label: "Departure", value: "7:30 – 8:00 AM, returning by around 11:00 AM" },
      { label: "Activity", value: "Snorkelling at a turtle feeding site" },
      { label: "What to bring", value: "Swimwear, towel, reef-safe sunscreen, sunglasses, a change of clothes and a dry bag" },
      { label: "Turtle safety", value: "Never touch or ride the turtles, and keep 1–2 metres away" },
    ],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const featuredPackages = () => {
  const f = packages.filter((p) => p.featured);
  return f.length ? f : packages.slice(0, 3);
};
