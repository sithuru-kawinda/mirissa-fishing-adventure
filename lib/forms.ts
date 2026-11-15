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
  country: string;
  phone: string;
  email: string;
  adults: string;
  children: string;
  passport: string;
  hotel: string;
  date: string;
  time: string;
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
  if (v.country.trim().length < 2) e.country = "Please enter your country.";
  if (!isPhone(v.phone)) e.phone = "Please enter a valid contact number.";
  if (!isEmail(v.email)) e.email = "Please enter a valid email address.";
  const adults = Number(v.adults);
  const children = Number(v.children || "0");
  if (!Number.isInteger(adults) || adults < 1 || adults > 50) e.adults = "Please enter at least 1 adult (up to 50).";
  if (!Number.isInteger(children) || children < 0 || children > 50) e.children = "Children must be a number from 0 to 50.";
  if (!v.date) e.date = "Please choose a booking date.";
  else if (v.date < todayISO()) e.date = "Please choose a date in the future.";
  if (!/^\d{2}:\d{2}$/.test(v.time)) e.time = "Please choose a booking time.";
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
