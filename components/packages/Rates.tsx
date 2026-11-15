import { Banknote, CreditCard, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { packages } from "@/data/packages";
import { extraPassengers, paymentMethods, ratesNote } from "@/data/rates";
import { formatPrice } from "@/lib/utils";

export function Rates() {
  const priced = packages.filter((p) => p.price);
  return (
    <Section>
      <SectionHeading eyebrow="Rates" title="Our fishing tour rates" description={ratesNote} />
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-navy/10">
            <table className="w-full min-w-[20rem] text-left text-sm sm:text-base">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold sm:px-8 sm:py-4">Package</th>
                  <th className="px-4 py-3 font-semibold sm:px-8 sm:py-4">Time</th>
                  <th className="px-4 py-3 font-semibold sm:px-8 sm:py-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {priced.map((p) => (
                  <tr key={p.slug} className="align-top">
                    <td className="px-4 py-4 font-semibold sm:px-8 sm:py-5">{p.name}</td>
                    <td className="px-4 py-4 text-navy/75 sm:px-8 sm:py-5">{p.duration}</td>
                    <td className="px-4 py-4 font-semibold text-ocean sm:px-8 sm:py-5">{formatPrice(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-navy/60">Private charter pricing depends on your plans. Contact us for a quote.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-sand-light p-7">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <Users className="h-5 w-5 text-turquoise-dark" aria-hidden /> Extra passengers
            </h3>
            <p className="mt-3 text-navy/75">
              The base package covers up to {extraPassengers.includedGuests} guests. Each additional guest beyond{" "}
              {extraPassengers.includedGuests} is ${extraPassengers.amount} extra, up to a maximum of {extraPassengers.maxGuests} guests.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-sand-light p-7">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <Banknote className="h-5 w-5 text-turquoise-dark" aria-hidden /> Accepted payment methods
            </h3>
            <ul className="mt-3 space-y-2 text-navy/75">
              {paymentMethods.map((m) => (
                <li key={m.title} className="flex gap-2">
                  <CreditCard className="mt-1 h-4 w-4 shrink-0 text-turquoise-dark" aria-hidden />
                  <span>
                    <span className="font-semibold text-navy">{m.title}:</span> {m.detail}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
