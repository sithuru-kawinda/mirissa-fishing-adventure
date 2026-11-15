export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
