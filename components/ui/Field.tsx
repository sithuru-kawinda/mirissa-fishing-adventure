import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy placeholder:text-navy/40 transition-colors focus:border-turquoise-dark focus:outline-none focus:ring-2 focus:ring-turquoise/30 aria-[invalid=true]:border-red-500";

export function Field({
  id,
  label,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
        {required && <span className="text-red-600" aria-hidden> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className={cn("mt-1.5 text-sm text-red-600")}>
          {error}
        </p>
      )}
    </div>
  );
}
