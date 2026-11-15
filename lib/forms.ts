import type { FormStatus } from "@/types";

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export const isEmail = (v: string) => EMAIL.test(v.trim());
export const isPhone = (v: string) => PHONE.test(v.trim()) && /\d{7,}/.test(v.replace(/\D/g, ""));

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function validateContact(v: ContactValues): Errors<ContactValues> {
  const e: Errors<ContactValues> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!isEmail(v.email)) e.email = "Please enter a valid email address.";
  if (!isPhone(v.phone)) e.phone = "Please enter a valid phone number.";
  if (v.subject.trim().length < 3) e.subject = "Please add a subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

export type BookingValues = {
  packageSlug: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  requests: string;
};

export function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validateBooking(v: BookingValues): Errors<BookingValues> {
  const e: Errors<BookingValues> = {};
  if (!v.packageSlug) e.packageSlug = "Please choose a package.";
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!isEmail(v.email)) e.email = "Please enter a valid email address.";
  if (!isPhone(v.phone)) e.phone = "Please enter a valid phone / WhatsApp number.";
  if (!v.date) e.date = "Please choose a preferred date.";
  else if (v.date < todayISO()) e.date = "Please choose a date in the future.";
  const g = Number(v.guests);
  if (!Number.isInteger(g) || g < 1 || g > 50) e.guests = "Guests must be a number between 1 and 50.";
  return e;
}

/**
 * Sends to the configured endpoint. With no endpoint, returns a "local" status
 * — nothing leaves the browser, and the UI must say so.
 */
export async function submitForm(endpoint: string, payload: unknown): Promise<FormStatus> {
  if (!endpoint) {
    return {
      state: "local",
      message:
        "Nothing has been sent yet — online submission isn't connected. Please send these details to our team using the buttons below.",
    };
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(String(res.status));
    return {
      state: "sent",
      message: "Thank you — your request has been received. We'll get back to you soon.",
    };
  } catch {
    return {
      state: "error",
      message: "Something went wrong sending your request. Please try again or contact us on WhatsApp.",
    };
  }
}
