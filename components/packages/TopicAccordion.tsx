"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; content: ReactNode };

/**
 * Topic list for a package. Clicking a topic opens it and scrolls it into view.
 * A `#topic` in the URL (e.g. from a package card) opens and scrolls to that topic on arrival.
 */
export function TopicAccordion({ items }: { items: Item[] }) {
  const ids = items.map((i) => i.id).join(",");
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  const scrollTo = (id: string) =>
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (!id || !ids.split(",").includes(id)) return;
      setOpen(id);
      scrollTo(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [ids]);

  const toggle = (id: string) => {
    if (open === id) {
      setOpen(null);
      return;
    }
    setOpen(id);
    window.history.replaceState(null, "", `#${id}`);
    scrollTo(id);
  };

  return (
    <div className="mt-8 divide-y divide-navy/10 overflow-hidden rounded-3xl border border-navy/10">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <section key={item.id} id={item.id} className="scroll-mt-28">
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-ocean transition-colors hover:bg-sand-light",
                  isOpen && "bg-ocean text-white hover:bg-ocean",
                )}
              >
                {item.label}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform duration-300", isOpen && "rotate-180")} aria-hidden />
              </button>
            </h3>
            <div id={`${item.id}-panel`} hidden={!isOpen} className="px-6 pb-7 pt-2">
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}
