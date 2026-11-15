export type FishingPackage = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  /** Optional Tailwind object-position class to keep faces in frame, e.g. "object-[50%_35%]". */
  imageClass?: string;
  duration: string;
  /** Leave undefined until real pricing is supplied; UI shows "Price on request". */
  price?: { amount: number; currency: string; unit?: string };
  highlights: string[];
  included: string[];
  featured?: boolean;
  /** Fish guests may catch. Omit to hide the "Fish You May Catch" topic. */
  species?: string[];
  /** Omit to hide the "Best Season" topic. */
  bestSeason?: string;
  tourDetails: { label: string; value: string }[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Optional photo. Without one, an initials avatar is shown. */
  image?: string;
};

export type Faq = { question: string; answer: string };

export type Testimonial = {
  name: string;
  origin: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type NavItem = { label: string; href: string };

export type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "sent"; message: string }
  | { state: "local"; message: string }
  | { state: "error"; message: string };
