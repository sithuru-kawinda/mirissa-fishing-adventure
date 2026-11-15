"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { FormFeedback } from "@/components/ui/FormFeedback";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { packages } from "@/data/packages";
import { submitForm, todayISO, validateBooking, type BookingValues, type Errors } from "@/lib/forms";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { FormStatus } from "@/types";

const labelClass = "text-[11px] font-semibold uppercase tracking-wider text-navy/70";
// Soft beige fields; same as the shared input style but with a tinted background.
const fieldClass = inputClass
  .replace("bg-white", "bg-sand-light border-navy/10")
  .replace("px-4 py-3.5 text-base", "px-3 py-2.5 text-sm");

const HOURS = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

export function BookingForm() {
  const preselected = useSearchParams().get("package") ?? "";
  // Arriving from a package page locks the package; the visitor can't switch it here.
  const lockedPackage = packages.find((p) => p.slug === preselected && p.bookable !== false);
  const initial: BookingValues = {
    packageSlug: lockedPackage ? preselected : "",
    name: "",
    country: "",
    phone: "",
    email: "",
    adults: "2",
    children: "0",
    passport: "",
    hotel: "",
    date: "",
    time: "",
    requests: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<BookingValues>>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [success, setSuccess] = useState<{ email: string; packageName: string } | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof BookingValues]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  // The two 24-hour dropdowns are stored together as "HH:MM" ("07:" while only the hour is chosen).
  const setTime = (hh: string, mm: string) => {
    setValues((v) => ({ ...v, time: hh || mm ? `${hh}:${mm}` : "" }));
    if (errors.time) setErrors((er) => ({ ...er, time: undefined }));
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
    if (result.state === "sent") {
      setSuccess({ email: values.email, packageName: packages.find((p) => p.slug === values.packageSlug)?.name ?? "" });
      setValues(initial);
    }
  };

  const pkgName = packages.find((p) => p.slug === values.packageSlug)?.name ?? "(not selected)";
  const summary = `Hello, I'd like to request a booking.\n\nPackage: ${pkgName}\nName: ${values.name}\nCountry: ${values.country}\nContact number: ${values.phone}\nEmail: ${values.email}\nAdults: ${values.adults}\nChildren: ${values.children || "0"}\nPassport number: ${values.passport || "-"}\nHotel: ${values.hotel || "-"}\nBooking date: ${values.date}\nBooking time: ${values.time}\nAdditional requests: ${values.requests || "None"}`;

  const field = (id: keyof BookingValues) => ({
    id,
    name: id,
    value: values[id],
    onChange,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: fieldClass,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-3xl border border-navy/10 bg-white p-6 shadow-xl shadow-navy/5 grid-cols-2 sm:grid-cols-4 sm:p-8"
    >
      <Field id="packageSlug" className="max-sm:col-span-2" label="Package" required error={errors.packageSlug} labelClassName={labelClass}>
        {lockedPackage ? (
          <div id="packageSlug" className={cn(fieldClass, "font-medium text-navy")}>
            {lockedPackage.name}
          </div>
        ) : (
          <div id="packageSlug" tabIndex={-1} className={cn(fieldClass, "text-navy/60")}>
            No package selected.{" "}
            <Link href="/packages" className="font-semibold text-turquoise-dark underline">
              Choose a package
            </Link>
          </div>
        )}
      </Field>
      <Field id="name" className="max-sm:col-span-2" label="Name" required error={errors.name} labelClassName={labelClass}>
        <input type="text" autoComplete="name" placeholder="Jane Doe" {...field("name")} />
      </Field>
      <Field id="country" label="Country" required error={errors.country} labelClassName={labelClass}>
        <input type="text" autoComplete="country-name" placeholder="United Kingdom" {...field("country")} />
      </Field>
      <Field id="phone" label="Contact Number" required error={errors.phone} labelClassName={labelClass}>
        <input type="tel" autoComplete="tel" placeholder="+44 7000 000000" {...field("phone")} />
      </Field>
      <Field id="email" className="max-sm:col-span-2" label="Email Address" required error={errors.email} labelClassName={labelClass}>
        <input type="email" autoComplete="email" placeholder="jane.doe@example.com" {...field("email")} />
      </Field>
      <Field id="adults" label="Number of Adults" required error={errors.adults} labelClassName={labelClass}>
        <input type="number" min={1} max={50} inputMode="numeric" {...field("adults")} />
      </Field>
      <Field id="children" label="Number of Children" error={errors.children} labelClassName={labelClass}>
        <input type="number" min={0} max={50} inputMode="numeric" {...field("children")} />
      </Field>
      <Field id="passport" className="max-sm:col-span-2" label="Passport Number" error={errors.passport} labelClassName={labelClass}>
        <input type="text" autoComplete="off" placeholder="A1234567" {...field("passport")} />
      </Field>
      <Field id="hotel" className="max-sm:col-span-2" label="Hotel Name" error={errors.hotel} labelClassName={labelClass}>
        <input type="text" placeholder="Where are you staying?" {...field("hotel")} />
      </Field>
      <Field id="date" label="Booking Date" required error={errors.date} labelClassName={labelClass}>
        <input type="date" min={todayISO()} {...field("date")} />
      </Field>
      <Field id="time" label="Booking Time" required error={errors.time} labelClassName={labelClass}>
        <div className="flex items-center gap-1.5">
          <select
            {...field("time")}
            className={cn(fieldClass, "min-w-0 flex-1 !px-2")}
            aria-label="Hour (24-hour)"
            value={values.time.slice(0, 2)}
            onChange={(e) => setTime(e.target.value, values.time.slice(3, 5) || "00")}
          >
            <option value="">HH</option>
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <span aria-hidden className="font-semibold text-navy/60">
            :
          </span>
          <select
            {...field("time")}
            className={cn(fieldClass, "min-w-0 flex-1 !px-2")}
            id="time-minutes"
            aria-label="Minutes"
            value={values.time.slice(3, 5)}
            onChange={(e) => setTime(values.time.slice(0, 2), e.target.value)}
          >
            <option value="">MM</option>
            {MINUTES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </Field>
      <Field
        id="requests"
        label="Additional Requests / Questions"
        className="col-span-full"
        labelClassName={labelClass}
      >
        <textarea rows={4} placeholder="Anything else we should know?" {...field("requests")} />
      </Field>
      <p className="col-span-full text-sm text-navy/60">
        Your booking is confirmed as soon as you submit it, and a confirmation email is sent to you.
      </p>
      <div className="col-span-full">
        <Button type="submit" size="lg" disabled={status.state === "submitting"} className="w-full sm:w-auto">
          {status.state === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Submit Booking <ArrowRight className="h-5 w-5" aria-hidden />
            </>
          )}
        </Button>
      </div>
      <div className="col-span-full empty:hidden">
        {status.state !== "sent" && <FormFeedback status={status} summary={summary} subject={`Booking request – ${pkgName}`} />}
      </div>
      <SuccessModal
        open={success !== null}
        onClose={() => {
          setSuccess(null);
          setStatus({ state: "idle" });
        }}
        title="Booking Successful!"
        message={`Your booking${success?.packageName ? ` for ${success.packageName}` : ""} has been successfully confirmed. A confirmation email is on its way to ${success?.email}.`}
      />
    </form>
  );
}
