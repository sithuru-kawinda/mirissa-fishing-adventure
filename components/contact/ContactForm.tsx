"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { FormFeedback } from "@/components/ui/FormFeedback";
import { submitForm, validateContact, type ContactValues, type Errors } from "@/lib/forms";
import { site } from "@/lib/site";
import type { FormStatus } from "@/types";

// Compact fields: same shared input style, with tighter padding and smaller text.
const fieldClass = inputClass.replace("px-4 py-3.5 text-base", "px-3 py-2.5 text-sm");

const empty: ContactValues = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors<ContactValues>>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof ContactValues]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ state: "idle" });
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus({ state: "submitting" });
    const result = await submitForm(site.contactEndpoint, values);
    setStatus(result);
    if (result.state === "sent") setValues(empty);
  };

  const summary = `Hello, I'd like to get in touch.\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nSubject: ${values.subject}\n\n${values.message}`;
  const field = (id: keyof ContactValues) => ({
    id,
    name: id,
    value: values[id],
    onChange,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: fieldClass,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex h-full flex-col gap-3.5 rounded-3xl border border-navy/10 bg-white p-5 shadow-xl shadow-navy/5 sm:p-6">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field id="name" label="Full Name" required error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Your full name" {...field("name")} />
        </Field>
        <Field id="email" label="Email Address" required error={errors.email}>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...field("email")} />
        </Field>
        <Field id="phone" label="Phone Number" required error={errors.phone}>
          <input type="tel" autoComplete="tel" placeholder="+1 555 000 0000" {...field("phone")} />
        </Field>
        <Field id="subject" label="Subject" required error={errors.subject}>
          <input type="text" placeholder="How can we help?" {...field("subject")} />
        </Field>
      </div>
      <Field id="message" label="Message" required error={errors.message} className="flex flex-1 flex-col">
        <textarea rows={3} placeholder="Tell us about your trip…" {...field("message")} className={`${fieldClass} min-h-20 flex-1 resize-none`} />
      </Field>
      <Button type="submit" size="md" disabled={status.state === "submitting"} className="w-full sm:w-auto">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden /> Send Message
          </>
        )}
      </Button>
      <FormFeedback status={status} summary={summary} subject={values.subject || "Enquiry"} />
    </form>
  );
}
