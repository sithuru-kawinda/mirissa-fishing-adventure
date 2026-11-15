"use client";

import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/types";

/** Time each review stays before the row slides one place to the left. */
const AUTO_MS = 7000;
const MAX_VISIBLE = 3;

function usePerView() {
  const [perView, setPerView] = useState(MAX_VISIBLE);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-navy/10 bg-sand-light p-6 sm:p-8">
      <Quote className="h-8 w-8 text-turquoise" aria-hidden />
      <div className="mt-4 flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-[#d4a017] text-[#d4a017]" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 leading-relaxed text-navy/80">{t.quote}</blockquote>
      <figcaption className="mt-6 border-t border-navy/10 pt-5">
        <p className="font-semibold">{t.name}</p>
        <p className="text-sm text-navy/60">{t.origin}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Shows a few reviews at a time. Every AUTO_MS the row slides one place left: the first review leaves on the
 * left and the next one enters from the right. The first reviews are repeated at the end so the loop is seamless.
 */
export function ReviewCarousel({ items }: { items: Testimonial[] }) {
  const perView = usePerView();
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || n <= perView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, n, perView]);

  const slides = [...items, ...items.slice(0, MAX_VISIBLE)];
  const active = index % n;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="-mx-3 overflow-hidden">
        <ul
          className="flex"
          style={{
            transform: `translateX(-${(index * 100) / perView}%)`,
            transition: animate ? "transform 1600ms ease-in-out" : "none",
          }}
          onTransitionEnd={() => {
            if (index >= n) {
              setAnimate(false);
              setIndex(0);
            }
          }}
        >
          {slides.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= n}
              className="shrink-0 px-3"
              style={{ width: `${100 / perView}%` }}
            >
              <ReviewCard t={t} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Choose review">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show review ${i + 1}`}
            aria-current={i === active}
            onClick={() => {
              setAnimate(true);
              setIndex(i);
            }}
            className={`relative h-2.5 rounded-full transition-all duration-300 before:absolute before:-inset-2 before:content-[''] ${i === active ? "w-8 bg-[#d4a017]" : "w-2.5 bg-navy/20 hover:bg-navy/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
