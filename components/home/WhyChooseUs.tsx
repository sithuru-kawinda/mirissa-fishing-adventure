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
    <Section tone="sand" className="!py-10 sm:!py-14">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Fishing the Mirissa Way"
        description="What you can expect when you head out with our team."
        className="!mb-8 sm:!mb-10"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ title, text }, i) => (
          <li key={title}>
            <Reveal delay={(i % 3) * 0.1} className="h-full">
              <article className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a017]/60 hover:shadow-xl hover:shadow-navy/10 sm:p-6">
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#d4a017] to-[#f0d36b] transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-poppins text-4xl font-bold leading-none text-[#d4a017] transition-colors duration-300 group-hover:text-[#b8860b] sm:text-5xl" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-lg font-bold text-navy sm:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">{text}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
