export type Fish = {
  name: string;
  sinhala: string;
  note: string;
  /** Photo in /public/fish. Swap for your own catch photos with the same file name. */
  image: string;
  credit: { author: string; license: string; url: string };
};

export type SpeciesGroup = {
  title: string;
  tag: string;
  description: string;
  fish: Fish[];
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;

export const speciesGroups: SpeciesGroup[] = [
  {
    title: "Big Game and Trolling Fish",
    tag: "Deep sea",
    description: "The main targets on our deep-sea trolling trips, such as the Full-Day Deep-Sea Sport Fishing Expedition.",
    fish: [
      {
        name: "Marlin",
        sinhala: "මර්ලින් / කොප්පරා",
        note: "The largest and most hard-fighting fish of the deep sea, including black marlin and blue marlin.",
        image: "/fish/marlin.jpg",
        credit: { author: "NOAA", license: "Public domain", url: commons("Atlantic blue marlin.jpg") },
      },
      {
        name: "Sailfish",
        sinhala: "තලපතා",
        note: "A striking fish with a sail-like dorsal fin, and one of the fastest swimmers in the water.",
        image: "/fish/sailfish.jpg",
        credit: { author: "Citron", license: "CC BY-SA 3.0", url: commons("Istiophorus platypterus.jpg") },
      },
      {
        name: "Yellowfin Tuna",
        sinhala: "කෙලවල්ලා",
        note: "Very strong, popular with anglers and excellent to eat.",
        image: "/fish/yellowfin-tuna.jpg",
        credit: { author: "OAR/National Undersea Research Program (NURP)", license: "Public domain", url: commons("Yellowfin tuna nurp.jpg") },
      },
      {
        name: "Dorado (Mahi-Mahi)",
        sinhala: "ගල්මාලු / තොරා",
        note: "Bright green and gold, and known for leaping across the surface as it fights.",
        image: "/fish/dorado.jpg",
        credit: { author: "Galomalavasi", license: "CC BY-SA 4.0", url: commons("Mahi Mahi Costa Rica.jpg") },
      },
      {
        name: "Wahoo and Barracuda",
        sinhala: "තෝරා සහ ජෙඩ්ඩා / පරා කුඩයා",
        note: "Very fast, sharp-toothed fish that make for a thrilling fight.",
        image: "/fish/barracuda.jpg",
        credit: { author: "Karelj", license: "Public domain", url: commons("Sphyraena barracuda 2.jpg") },
      },
    ],
  },
  {
    title: "Reef and Bottom Fish",
    tag: "Coral reef",
    description: "Caught on shorter trips around the coral reefs, such as the Half-Day Shore and Reef Fishing Package.",
    fish: [
      {
        name: "Snapper",
        sinhala: "රතු මාළුවා / තැම්බලයා",
        note: "A prized fish caught near the seabed.",
        image: "/fish/snapper.jpg",
        credit: { author: "Geeklikepi", license: "CC BY-SA 3.0", url: commons("Red Snapper.jpg") },
      },
      {
        name: "Grouper",
        sinhala: "කලවාවා / ගල්පර මාළුවා",
        note: "A large-bodied fish that lives among the rocks and reefs.",
        image: "/fish/grouper.jpg",
        credit: { author: "Dan Schofield", license: "CC BY 4.0", url: commons("Epinephelus itajara 279042770.jpg") },
      },
      {
        name: "Trevally (GT)",
        sinhala: "පාරාවා / යක් පාරාවා",
        note: "Fights with huge power and is a top target for sport anglers.",
        image: "/fish/trevally.jpg",
        credit: { author: "Dr. Dwayne Meadows, NOAA/NMFS/OPR", license: "Public domain", url: commons("Caranx ignobilis.jpg") },
      },
      {
        name: "Emperor Fish",
        sinhala: "මිල්ලෝ / මුහුදු වැලියා",
        note: "Commonly found close to the coral reefs.",
        image: "/fish/emperor.jpg",
        credit: {
          author: "Rickard Zerpe",
          license: "CC BY 2.0",
          url: commons("Orange-spotted emperor (Lethrinus erythracanthus) (24463913268).jpg"),
        },
      },
    ],
  },
];
