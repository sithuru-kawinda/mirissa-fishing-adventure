import type { Metadata } from "next";
import { TeamCard } from "@/components/team/TeamCard";
import { BookingCta } from "@/components/ui/BookingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the friendly, experienced crew behind Mirissa Fishing Adventure, your hosts on the water in Sri Lanka.",
  alternates: { canonical: "/team" },
  openGraph: { title: "Our Team | Mirissa Fishing Adventure", url: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet your crew"
        description="Local people, local knowledge and a shared love of the ocean."
        image="/team/team-hero-reel.png"
        alt="Hands gripping a fishing rod and gold reel at sunset over the sea"
      />
      <Section>
        <SectionHeading
          eyebrow="The people"
          title="Hosts who know these waters"
          description="From the first message to the last cast, our team is here to make your day safe, relaxed and memorable."
        />
        {team.length ? (
          <ul className="flex flex-wrap justify-center gap-6">
            {team.map((m, i) => (
              <li key={`${m.role}-${i}`} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                <Reveal delay={(i % 4) * 0.08} className="h-full">
                  <TeamCard member={m} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-navy/70">Our team profiles are coming soon.</p>
        )}
      </Section>
      <BookingCta title="Come fishing with us" />
    </>
  );
}
