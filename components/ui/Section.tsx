import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  tone = "white",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "white" | "sand" | "navy";
  className?: string;
  id?: string;
}) {
  const tones = { white: "bg-white", sand: "bg-sand-light", navy: "bg-navy text-white" };
  return (
    <section id={id} className={cn("py-16 sm:py-24 lg:py-28", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl sm:mb-16", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
            invert ? "text-turquoise" : "text-turquoise-dark",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg", invert ? "text-white/75" : "text-navy/70")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
