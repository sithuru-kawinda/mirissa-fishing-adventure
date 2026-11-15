import { SafeImage } from "@/components/ui/SafeImage";
import type { TeamMember } from "@/types";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function TeamCard({ member, showBio = true }: { member: TeamMember; showBio?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10">
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-gradient-to-br from-navy-800 to-ocean">
        {member.image ? (
          <SafeImage
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            imgClassName="object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center" role="img" aria-label={`${member.name}, ${member.role} (photo coming soon)`}>
            <span className="font-display text-6xl text-white/70">{initials(member.name)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-turquoise-dark">{member.role}</p>
        {showBio && <p className="mt-3 text-sm leading-relaxed text-navy/70">{member.bio}</p>}
      </div>
    </article>
  );
}
