"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types";

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function FaqExplorer({ items }: { items: Faq[] }) {
  const categories = Array.from(new Set(items.map((f) => f.category)));
  const [active, setActive] = useState(categories[0]);
  const [openAt, setOpenAt] = useState<string | null>(null);
  const uid = useId();

  // Highlight the category whose section is currently near the top of the viewport.
  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(`faq-${slugify(c)}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(categories.find((c) => `faq-${slugify(c)}` === hit.target.id) ?? categories[0]);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const goTo = (c: string) => {
    setActive(c);
    document.getElementById(`faq-${slugify(c)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid grid-cols-1 gap-5 font-sans lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8">
      <aside className="top-24 z-10 h-fit min-w-0 rounded-3xl border border-navy/10 bg-white p-3 shadow-sm max-lg:sticky sm:p-4 lg:sticky lg:top-28 lg:p-5">
        <h2 className="mb-3 hidden !font-sans text-xl font-semibold lg:block">Categories</h2>
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {categories.map((c) => (
            <li key={c} className="shrink-0">
              <button
                type="button"
                aria-current={c === active ? "true" : undefined}
                onClick={() => goTo(c)}
                className={cn(
                  "w-full whitespace-nowrap rounded-xl px-4 py-2 text-left text-sm font-medium transition-colors lg:whitespace-normal",
                  c === active ? "bg-[#d4a017] text-navy shadow-md" : "text-navy/70 hover:bg-navy/5 hover:text-navy",
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 space-y-8">
        {categories.map((c) => (
          <section key={c} id={`faq-${slugify(c)}`} aria-labelledby={`faq-${slugify(c)}-title`} className="scroll-mt-40 lg:scroll-mt-28">
            <h2 id={`faq-${slugify(c)}-title`} className="border-b border-navy/10 pb-3 !font-sans text-2xl font-semibold sm:text-3xl">
              {c}
            </h2>
            <div className="mt-4 space-y-2.5">
              {items
                .filter((f) => f.category === c)
                .map((item) => {
                  const isOpen = openAt === item.question;
                  const id = `${uid}-${slugify(item.question)}`;
                  return (
                    <div key={item.question} className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
                      <h3 className="!font-sans text-sm font-semibold sm:text-base">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                          id={`${id}-btn`}
                          onClick={() => setOpenAt(isOpen ? null : item.question)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:text-ocean sm:px-5 sm:py-3.5"
                        >
                          {item.question}
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
                          <p className="px-4 pb-4 text-sm leading-relaxed text-navy/70 sm:px-5">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
