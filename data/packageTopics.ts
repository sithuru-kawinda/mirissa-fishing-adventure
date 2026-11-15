import type { FishingPackage } from "@/types";

export type TopicId =
  | "price"
  | "included"
  | "foreign-visitors"
  | "best-season"
  | "species"
  | "tour-details"
  | "tips"
  | "transportation"
  | "payments";

export const topicLabels: Record<TopicId, string> = {
  price: "Price",
  included: "What's Included",
  "foreign-visitors": "Info for Visitors",
  "best-season": "Best Season",
  species: "Fish You May Catch",
  "tour-details": "Tour Details",
  tips: "Important Tips",
  transportation: "Transportation",
  payments: "Payments",
};

/** Topics that have content for this package, in display order. Used by the cards and the detail page. */
export function getTopics(pkg: FishingPackage): { id: TopicId; label: string }[] {
  const ids: TopicId[] = [
    "price",
    "included",
    "foreign-visitors",
    ...(pkg.bestSeason ? (["best-season"] as const) : []),
    ...(pkg.species?.length ? (["species"] as const) : []),
    "tour-details",
    "tips",
    "transportation",
    "payments",
  ];
  return ids.map((id) => ({ id, label: topicLabels[id] }));
}

export const foreignVisitorInfo = [
  "Trips depart from Mirissa Fisheries Harbour on Sri Lanka's southern coast.",
  "Free tuk-tuk hotel pick-up and drop-off anywhere in Mirissa; transfers from nearby towns are available for an extra charge.",
  "Pay in cash in USD, EUR, GBP or LKR, or by Visa or MasterCard.",
  "A safety briefing is given before departure, and life jackets must be worn for the whole time on the boat.",
  "Fishing gear, life jackets and drinking water are provided, so you only need to bring personal items.",
];
