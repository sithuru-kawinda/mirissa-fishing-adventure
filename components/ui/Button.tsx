import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "goldOutline" | "gold" | "forest" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-turquoise text-navy hover:bg-white hover:text-navy shadow-lg shadow-turquoise/20",
  secondary: "bg-navy text-white hover:bg-ocean",
  goldOutline: "border border-navy/25 text-navy hover:border-[#d4a017] hover:bg-[#d4a017] active:border-[#b8860b] active:bg-[#b8860b]",
  gold: "bg-[#d4a017] text-navy hover:bg-[#f0d36b] active:bg-[#e3bf4a] shadow-lg shadow-[#d4a017]/25",
  forest: "bg-navy text-white hover:bg-[#0f5e30] active:bg-[#08401f]",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  light: "border border-white/60 text-white hover:bg-white hover:text-navy",
  ghost: "text-ocean hover:text-turquoise-dark",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
