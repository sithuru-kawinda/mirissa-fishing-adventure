import { TeamCard } from "@/components/team/TeamCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { team } from "@/data/team";

export function TeamPreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our team"
        title="The people behind your day at sea"
        description="Meet the crew who'll welcome you aboard."
      />
      <ul className="flex flex-wrap justify-center gap-6">
        {team.slice(0, 4).map((m, i) => (
          <li key={`${m.role}-${i}`} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <Reveal delay={i * 0.08} className="h-full">
              <TeamCard member={m} showBio={false} />
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <ButtonLink href="/team" variant="outline">
          Meet the Whole Team
        </ButtonLink>
      </div>
    </Section>
  );
}
