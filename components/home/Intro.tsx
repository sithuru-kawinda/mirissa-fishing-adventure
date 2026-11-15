import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

const stats = [
  { value: "20", suffix: "+", label: "Years of experience" },
  { value: "5", suffix: "★", label: "Rated by our customers" },
  { value: "1K", suffix: "+", label: "Kilos of fish caught" },
];

export function Intro() {
  return (
    <section id="intro" className="bg-sand-light py-14 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ocean-light">
            <span className="h-px w-8 bg-[#d4a017]" aria-hidden />
            Welcome aboard
            <span className="h-px w-8 bg-[#d4a017]" aria-hidden />
          </p>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            Real Fishing, On The <span className="text-ocean">Real Indian Ocean</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/75 sm:text-lg">
            Join us for a genuine day at sea off Sri Lanka&apos;s southern coast, relaxed, safe and memorable for every angler.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <ul className="grid grid-cols-3 divide-x divide-[#d4a017]/40">
            {stats.map(({ value, suffix, label }) => (
              <li key={label} className="px-2 text-center font-poppins sm:px-6">
                <p className="text-4xl font-bold leading-none text-[#14532d] sm:text-6xl lg:text-7xl">
                  {value}
                  <span className="text-[#d4a017]">{suffix}</span>
                </p>
                <p className="mx-auto mt-3 max-w-[9rem] text-[11px] font-medium uppercase leading-snug tracking-[0.15em] text-navy/70 sm:max-w-none sm:text-sm">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
