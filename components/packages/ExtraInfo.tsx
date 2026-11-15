import { Binoculars, Camera, CalendarX2, Car, Check, MapPin, UtensilsCrossed, Waves, Wine } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { addOns, policy, transfer } from "@/data/extras";

const addOnIcons = {
  catch: UtensilsCrossed,
  snorkel: Waves,
  camera: Camera,
  celebrate: Wine,
  whale: Binoculars,
};

export function AddOns({ tone = "white" }: { tone?: "white" | "sand" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Add-ons"
        title="Additional services"
        description="Make your fishing trip even more memorable with these extras. Ask us when booking to add any of them."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addOns.map((a, i) => {
          const Icon = addOnIcons[a.icon];
          return (
            <li key={a.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="h-full rounded-3xl bg-sand-light p-7">
                  <Icon className="h-7 w-7 text-turquoise-dark" aria-hidden />
                  <h3 className="mt-4 text-xl font-semibold">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy/70">{a.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function Transfers({ tone = "sand" }: { tone?: "white" | "sand" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Getting here"
        title="Transport and transfers"
        description={`We arrange safe, easy transport from your hotel to ${transfer.harbour}.`}
      />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <Reveal className="rounded-3xl bg-white p-7">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Car className="h-5 w-5 text-turquoise-dark" aria-hidden /> Free in Mirissa
          </h3>
          <p className="mt-3 leading-relaxed text-navy/75">{transfer.free}</p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-3xl bg-white p-7">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <MapPin className="h-5 w-5 text-turquoise-dark" aria-hidden /> Nearby areas
          </h3>
          <p className="mt-3 leading-relaxed text-navy/75">{transfer.nearbyIntro}</p>
          <ul className="mt-3 space-y-1.5">
            {transfer.nearby.map((n) => (
              <li key={n} className="flex items-center gap-2 text-navy/80">
                <Check className="h-4 w-4 shrink-0 text-turquoise-dark" aria-hidden /> {n}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-navy/60">{transfer.vehicles}</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function BookingPolicy({ tone = "white" }: { tone?: "white" | "sand" }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow="Policy" title="Booking and cancellation" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {policy.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} className="rounded-3xl bg-sand-light p-7">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <CalendarX2 className="h-5 w-5 text-turquoise-dark" aria-hidden /> {p.title}
            </h3>
            <p className="mt-3 leading-relaxed text-navy/75">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
