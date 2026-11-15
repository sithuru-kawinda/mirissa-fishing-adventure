"use client";

import { CalendarCheck, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { FormFeedback } from "@/components/ui/FormFeedback";
import { packages } from "@/data/packages";
import { submitForm, todayISO, validateBooking, type BookingValues, type Errors } from "@/lib/forms";
import { site } from "@/lib/site";
import type { FormStatus } from "@/types";

export function BookingForm() {
  const preselected = useSearchParams().get("package") ?? "";
  const initial: BookingValues = {
    packageSlug: packages.some((p) => p.slug === preselected) ? preselected : "",
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
    requests: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<BookingValues>>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof BookingValues]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ state: "idle" });
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus({ state: "submitting" });
    const result = await submitForm(site.bookingEndpoint, {
      ...values,
      packageName: packages.find((p) => p.slug === values.packageSlug)?.name,
    });
    setStatus(result);
    if (result.state === "sent") setValues({ ...initial, packageSlug: "" });
  };

  const pkgName = packages.find((p) => p.slug === values.packageSlug)?.name ?? "(not selected)";
  const summary = `Hello, I'd like to request a booking.\n\nPackage: ${pkgName}\nName: ${values.name}\nEmail: ${values.email}\nPhone/WhatsApp: ${values.phone}\nPreferred date: ${values.date}\nGuests: ${values.guests}\nSpecial requests: ${values.requests || "None"}`;

  const field = (id: keyof BookingValues) => ({
    id,
    name: id,
    value: values[id],
    onChange,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: inputClass,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-navy/10 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
      <Field id="packageSlug" label="Selected Package" required error={errors.packageSlug}>
        <select {...field("packageSlug")}>
          <option value="">Choose a package…</option>
          {packages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Customer Name" required error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Your full name" {...field("name")} />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...field("email")} />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
          <input type="tel" autoComplete="tel" placeholder="+1 555 000 0000" {...field("phone")} />
        </Field>
        <Field id="date" label="Preferred Date" required error={errors.date}>
          <input type="date" min={todayISO()} {...field("date")} />
        </Field>
        <Field id="guests" label="Number of Guests" required error={errors.guests}>
          <input type="number" min={1} max={50} inputMode="numeric" {...field("guests")} />
        </Field>
      </div>
      <Field id="requests" label="Special Requests">
        <textarea rows={4} placeholder="Dietary needs, experience level, celebrations…" {...field("requests")} />
      </Field>
      <p className="text-sm text-navy/60">
        This is a booking request, not a confirmed reservation. Your trip is confirmed only once our team replies to you.
      </p>
      <Button type="submit" size="lg" disabled={status.state === "submitting"} className="w-full sm:w-auto">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <CalendarCheck className="h-5 w-5" aria-hidden /> Request Booking
          </>
        )}
      </Button>
      <FormFeedback status={status} summary={summary} subject={`Booking request – ${pkgName}`} />
    </form>
  );
}
