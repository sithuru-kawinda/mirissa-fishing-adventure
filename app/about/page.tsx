import type { Metadata } from "next";
import { Anchor, HeartHandshake, Sunrise, Telescope } from "lucide-react";
import { BookingCta } from "@/components/ui/BookingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { heroVideos } from "@/data/videos";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mirissa Fishing Adventure: our story, mission and commitment to unforgettable, safe and friendly fishing trips on Sri Lanka's southern coast.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Mirissa Fishing Adventure", url: "/about" },
};

const pillars = [
  {
    icon: Anchor,
    title: "Our Mission",
    text: "To share the joy of ocean fishing from Mirissa with guests from around the world, in a safe, friendly and respectful way.",
  },
  {
    icon: Telescope,
    title: "Our Vision",
    text: "To be the most trusted and welcoming fishing adventure in Mirissa, loved by guests and by the local community.",
  },
  {
    icon: HeartHandshake,
    title: "Our Commitment",
    text: "Clear communication, honest advice and attentive service from your first message to the moment you step back on shore.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Born from the sea, shared with the world"
        description="Mirissa Fishing Adventure invites you to experience Sri Lanka's southern coast the way the locals know it: from the water."
        video={heroVideos.about}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-turquoise-dark">Our story</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">A coastline that calls you out to sea</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy/75">
              <p>
                Mirissa sits on Sri Lanka&apos;s southern coast, where golden beaches meet the deep blue of the Indian Ocean. For
                generations, life here has been shaped by the sea.
              </p>
              <p>
                Mirissa Fishing Adventure grew from a simple idea: to let visitors share in that experience, with a welcoming team who
                love the ocean and love showing it to others.
              </p>
              <p className="text-base text-navy/50">
                (Editable: replace this story with the real history of the business, including who started it and when.)
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/15 lg:max-w-none">
              <SafeImage
                src="/about-story.png"
                alt="A family in life jackets on the beach with our guide beside the boat"
                sizes="(min-width: 1024px) 45vw, 100vw"
                imgClassName="object-top"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="What drives us" title="Mission, vision & promise" />
        <ul className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.1} className="h-full">
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise-dark">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-navy/70">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/15">
              <SafeImage src="/about-why.jpg" alt="Two smiling members of our team posing together on the beach" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-turquoise-dark">Why we started</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">The fishing experience, done properly</h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/75">
              We wanted travellers to experience fishing as more than an activity: the early start, the calm of the open sea and the
              satisfaction of working together as a crew.
            </p>
            <p className="mt-4 flex items-start gap-3 text-lg leading-relaxed text-navy/75">
              <Sunrise className="mt-1.5 h-5 w-5 shrink-0 text-turquoise-dark" aria-hidden />
              Beginners are looked after, and experienced anglers are welcome to ask for more.
            </p>
          </Reveal>
        </div>
      </Section>

      <BookingCta title="Join us on the water" text="Choose a package, pick a date and we'll take it from there." />
    </>
  );
}
