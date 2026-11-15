"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

/** Centered confirmation popup. It stays open until the visitor closes it (button, backdrop click or Esc). */
export function SuccessModal({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center font-sans shadow-2xl"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden />
        </span>
        <h2 id="success-modal-title" className="mt-5 !font-sans text-2xl font-bold text-navy">
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-navy/75">{message}</p>
        <Button ref={closeRef} type="button" size="md" onClick={onClose} className="mt-7 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
