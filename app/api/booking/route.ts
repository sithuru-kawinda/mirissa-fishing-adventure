import nodemailer from "nodemailer";
import { packages } from "@/data/packages";
import { validateBooking, type BookingValues } from "@/lib/forms";
import { site } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const user = process.env.GMAIL_USER ?? site.contact.email;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!pass) {
    return Response.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: Partial<Record<keyof BookingValues, unknown>>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (k: keyof BookingValues) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const v: BookingValues = {
    packageSlug: str("packageSlug"),
    name: str("name"),
    country: str("country"),
    phone: str("phone"),
    email: str("email"),
    adults: str("adults"),
    children: str("children") || "0",
    passport: str("passport").slice(0, 40),
    hotel: str("hotel").slice(0, 200),
    date: str("date"),
    time: str("time"),
    requests: str("requests").slice(0, 2000),
  };

  const pkg = packages.find((p) => p.slug === v.packageSlug);
  if (!pkg || pkg.bookable === false || Object.keys(validateBooking(v)).length) {
    return Response.json({ error: "Invalid booking details." }, { status: 400 });
  }

  const adults = Number(v.adults);
  const children = Number(v.children);
  const guests = adults + children;
  const dateLabel = new Date(`${v.date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeLabel = `${v.time} (24-hour)`;
  const money = (n: number, c: string) => `${c} ${n.toLocaleString("en-US")}`;
  let price = "Price on request – our team will confirm it";
  if (pkg.priceLabel) {
    price = pkg.priceLabel;
  } else if (pkg.price) {
    const { amount, currency, unit } = pkg.price;
    price = `${money(amount, currency)} ${unit ?? ""}`.trim();
    if (unit?.includes("per person")) price += ` – estimated total for ${guests} guest${guests > 1 ? "s" : ""}: ${money(amount * guests, currency)}`;
  }

  const rows: [string, string][] = [
    ["Package", pkg.name],
    ["Booking date", dateLabel],
    ["Booking time", timeLabel],
    ["Adults", v.adults],
    ["Children", v.children],
    ["Price", price],
    ["Name", v.name],
    ["Country", v.country],
    ["Contact number", v.phone],
    ["Email", v.email],
    ["Passport number", v.passport || "Not provided"],
    ["Hotel", v.hotel || "Not provided"],
    ["Additional requests", v.requests || "None"],
  ];
  const table = (list: [string, string][]) =>
    `<table cellpadding="6" style="border-collapse:collapse">${list
      .map(([k, val]) => `<tr><td valign="top"><strong>${esc(k)}</strong></td><td>${esc(val).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`;
  const plain = (list: [string, string][]) => list.map(([k, val]) => `${k}: ${val}`).join("\n");

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  const sendTelegram = async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) throw new Error("Telegram is not configured.");
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: `🎣 New booking request\n\n${plain(rows)}` }),
    });
    if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
  };

  // Notify the team by email and Telegram; the booking only fails if both fail.
  const [mail, telegram] = await Promise.allSettled([
    transporter.sendMail({
      from: `"${site.name} Website" <${user}>`,
      to: site.contact.email,
      replyTo: `"${v.name.replace(/["\r\n]/g, "")}" <${v.email}>`,
      subject: `New booking request – ${pkg.name}`,
      text: plain(rows),
      html: `<h2>New booking request</h2>${table(rows)}`,
    }),
    sendTelegram(),
  ]);
  if (mail.status === "rejected") console.error("Booking email failed:", mail.reason);
  if (telegram.status === "rejected") console.error("Telegram notification failed:", telegram.reason);
  if (mail.status === "rejected" && telegram.status === "rejected") {
    return Response.json({ error: "Could not send booking." }, { status: 502 });
  }

  // Confirmation to the customer. A failure here must not fail the booking, which the team already has.
  const customerRows = rows.slice(0, 6); // package, date, time, adults, children, price
  try {
    await transporter.sendMail({
      from: `"${site.name}" <${user}>`,
      to: v.email,
      replyTo: site.contact.email,
      subject: `We received your booking request – ${site.name}`,
      text: `Hi ${v.name},

Thank you for booking with ${site.name}! We have received your request:

${plain(customerRows)}

This is a booking request, not yet a confirmed reservation. Our team will contact you shortly to confirm.

Questions? Email ${site.contact.email} or WhatsApp ${site.contact.phone}.`,
      html: `<p>Hi ${esc(v.name)},</p><p>Thank you for booking with <strong>${esc(site.name)}</strong>! We have received your request:</p>${table(customerRows)}<p>This is a booking request, not yet a confirmed reservation. Our team will contact you shortly to confirm.</p><p>Questions? Email <a href="mailto:${site.contact.email}">${site.contact.email}</a> or WhatsApp ${esc(site.contact.phone)}.</p>`,
    });
  } catch (err) {
    console.error("Customer confirmation email failed:", err);
  }

  return Response.json({ ok: true });
}
