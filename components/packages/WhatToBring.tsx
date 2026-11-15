import { Check, Gift } from "lucide-react";
import { bringGroups, weProvide } from "@/data/whatToBring";

export function WhatToBring() {
  return (
    <>
      <p className="text-navy/70">
        To keep your fishing trip safe, comfortable and as enjoyable as possible, we recommend bringing the following.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {bringGroups.map((group) => (
          <div key={group.title} className="rounded-2xl bg-sand-light p-5">
            <h4 className="font-display text-lg font-semibold">{group.title}</h4>
            <ul className="mt-3 space-y-3 text-sm">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className="font-semibold">{item.name}</span>
                  <span className="block text-navy/70">{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-10 flex items-center gap-2 text-xl font-semibold">
        <Gift className="h-5 w-5 text-turquoise-dark" aria-hidden /> What we provide
      </h3>
      <p className="mt-3 text-navy/70">You don&apos;t need to carry any extra weight. We supply the following.</p>
      <ul className="mt-5 space-y-3">
        {weProvide.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-dark" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
