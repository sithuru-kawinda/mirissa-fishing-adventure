import { AddOnsAccordion } from "@/components/packages/AddOnsAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { addOns } from "@/data/extras";

export function AddOns({ tone = "white" }: { tone?: "white" | "sand" }) {
  return (
    <Section tone={tone} className="!py-10 sm:!py-12">
      <div className="grid gap-5 lg:grid-cols-[18rem_1fr] lg:gap-8">
        <aside className="h-fit rounded-3xl border border-navy/10 bg-white p-5 shadow-sm lg:p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-turquoise-dark">Add-Ons</p>
          <h2 className="!font-sans text-xl font-semibold">Additional Services</h2>
          <p className="mt-3 text-sm leading-relaxed text-navy/70">
            Make your fishing trip even more memorable with these extras. Ask us when booking to add any of them.
          </p>
        </aside>
        <Reveal>
          <AddOnsAccordion items={addOns} />
        </Reveal>
      </div>
    </Section>
  );
}
