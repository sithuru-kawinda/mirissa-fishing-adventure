import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const reasons = [
  { title: "Experienced Fishing Team", text: "A crew that knows these waters and how to read the sea." },
  { title: "Memorable Ocean Experiences", text: "Days on the water that stay with you long after you're home." },
  { title: "Friendly Service", text: "Warm, welcoming hosts who make everyone feel at ease." },
  { title: "Local Knowledge", text: "Insight into Mirissa's coast, wildlife and fishing traditions." },
  { title: "Customer Satisfaction", text: "We care that every guest leaves happy." },
  { title: "Safety and Comfort", text: "Your wellbeing comes first on every trip." },
];

export function WhyChooseUs() {
  return (
    <Section tone="navy">
      <SectionHeading
        invert
        eyebrow="Why choose us"
        title="Fishing the Mirissa way"
        description="What you can expect when you head out with our team."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ title, text }, i) => (
          <li key={title}>
            <Reveal delay={(i % 3) * 0.1} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4a017]/60 hover:from-white/[0.12] hover:shadow-2xl hover:shadow-black/30">
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#d4a017] to-[#f0d36b] transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-poppins text-5xl font-bold leading-none text-[#d4a017]/80 transition-colors duration-300 group-hover:text-[#f0b429]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
                <div className="mt-4 h-px w-12 bg-turquoise/60 transition-all duration-300 group-hover:w-20 group-hover:bg-[#d4a017]" aria-hidden />
                <p className="mt-4 leading-relaxed text-white/70">{text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
