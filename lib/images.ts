const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70`;

/** Central image registry. Swap any URL (or a /public path) for real photos. */
export const images = {
  hero: unsplash("1506929562872-bb421503ef21"), // boats over turquoise water
  boats: unsplash("1506929562872-bb421503ef21"),
  rod: unsplash("1529230117010-b6c436154f25"), // fishing rod over the sea
  fish: unsplash("1544551763-77ef2d0cfc6c"), // school of fish
  sunrise: unsplash("1439405326854-014607f694d7"),
  wave: unsplash("1500375592092-40eb2168fd21"),
  aerialSurf: unsplash("1505118380757-91f5f5632de0"),
  deepBlue: unsplash("1530053969600-caed2596d242"),
  calmSea: unsplash("1518837695005-2083093ee35b"),
  sailing: unsplash("1498623116890-37e912163d5d"),
  beach: unsplash("1468413253725-0d5181091126"),
  sunset: unsplash("1473116763249-2faaef81ccda"),
  goldenShore: unsplash("1507525428034-b723cf961d3e"),
  dusk: unsplash("1559827260-dc66d52bef19"),
  reef: unsplash("1582967788606-a171c1080cb0"),
  galleryHero: "/images/WhatsApp%20Image%202026-11-06%20at%2009.24.03%20(1).jpeg", // own photo: guests and boat on the beach
  reefFishing: "/images/WhatsApp%20Image%202026-11-06%20at%2009.25.07.jpeg", // own photo: guest fishing on the boat with a catch
  privateCharter: "/images/WhatsApp%20Image%202026-11-06%20at%2009.24.03%20(1).jpeg", // own photo: guests beside the boat on the beach
  catchGuide: "/images/WhatsApp%20Image%202026-11-06%20at%2009.24.06.jpeg", // own photo: guide with a giant trevally
  catchReef: "/images/WhatsApp%20Image%202026-11-06%20at%2009.24.08.jpeg", // own photo: yellow reef fish
  catchGuest: "/images/WhatsApp%20Image%202026-11-06%20at%2009.25.09.jpeg", // own photo: smiling guest with a catch
  crew: "/team/crew.png", // own photo: the three crew members with their catch
} as const;
