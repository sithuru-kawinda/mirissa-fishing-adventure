import type { FishingPackage } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** What to show as a package's price: its custom label if it has one, otherwise the formatted price. */
export function packagePrice(pkg: Pick<FishingPackage, "price" | "priceLabel">) {
  return pkg.priceLabel ?? formatPrice(pkg.price);
}

export function formatPrice(price?: { amount: number; currency: string; unit?: string }) {
  if (!price) return "Price on request";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
  return price.unit ? `${formatted} ${price.unit}` : formatted;
}
