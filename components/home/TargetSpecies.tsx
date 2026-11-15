import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { Section, SectionHeading } from "@/components/ui/Section";
import { speciesGroups, type Fish } from "@/data/species";
import { cn } from "@/lib/utils";

/** One row on large screens: 5 cards -> 5 columns, otherwise 4. */
const lgColumns = (total: number) => (total === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4");

function FishCard({ fish, tag }: { fish: Fish; tag: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/15">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
        <SafeImage
          src={fish.image}
          alt={`${fish.name} photo`}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean">
          {tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-xl font-semibold">{fish.name}</h4>
        <p className="mt-1 text-sm font-medium text-ocean-light">{fish.sinhala}</p>
        <p className="mt-3 leading-relaxed text-navy/70">{fish.note}</p>
      </div>
    </article>
  );
}

export function TargetSpecies({ tone = "sand" }: { tone?: "white" | "sand" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Target Species"
        title="Fish You Can Catch Off Mirissa"
        description="On our deep-sea trolling and reef fishing trips you have the chance to land these valuable, hard-fighting species."
      />
      <div className="space-y-16">
        {speciesGroups.map((group) => (
          <div key={group.title}>
            <Reveal className="mb-8 flex flex-col gap-2 border-l-4 border-ocean-light pl-5">
              <h3 className="text-2xl font-semibold sm:text-3xl">{group.title}</h3>
              <p className="max-w-2xl text-navy/70">{group.description}</p>
            </Reveal>
            <ul className={cn("grid gap-5 sm:grid-cols-2", lgColumns(group.fish.length))}>
              {group.fish.map((fish, i) => (
                <li key={fish.name}>
                  <Reveal delay={(i % 3) * 0.08} className="h-full">
                    <FishCard fish={fish} tag={group.tag} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </Section>
  );
}
