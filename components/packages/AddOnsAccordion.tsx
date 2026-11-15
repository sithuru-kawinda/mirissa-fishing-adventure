"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function AddOnsAccordion({ items }: { items: readonly { title: string; text: string }[] }) {
  const [openAt, setOpenAt] = useState<string | null>(items[0]?.title ?? null);
  const uid = useId();

  return (
    <div className="space-y-2.5 font-sans">
      {items.map((item, i) => {
        const isOpen = openAt === item.title;
        const id = `${uid}-${i}`;
        return (
          <div key={item.title} className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
            <h3 className="!font-sans text-sm font-semibold sm:text-base">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                onClick={() => setOpenAt(isOpen ? null : item.title)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:text-ocean sm:px-5 sm:py-3.5"
              >
                {item.title}
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-navy/60 transition-transform duration-300", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-navy/70 sm:px-5">{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
