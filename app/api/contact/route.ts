import nodemailer from "nodemailer";
import { validateContact, type ContactValues } from "@/lib/forms";
import { site } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const user = process.env.GMAIL_USER ?? site.contact.email;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!pass) {
    return Response.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: Partial<Record<keyof ContactValues, unknown>>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (k: keyof ContactValues, max: number) =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "";
  const v: ContactValues = {
    name: str("name", 200),
    email: str("email", 200),
    phone: str("phone", 50),
    subject: str("subject", 200),
    message: str("message", 5000),
  };
  if (Object.keys(validateContact(v)).length) {
    return Response.json({ error: "Invalid message details." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", v.name],
    ["Email", v.email],
    ["Phone", v.phone],
    ["Subject", v.subject],
    ["Message", v.message],
  ];

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"${site.name} Website" <${user}>`,
      to: site.contact.email,
      replyTo: `"${v.name.replace(/["\r\n]/g, "")}" <${v.email}>`,
      subject: `Contact form – ${v.subject.replace(/[\r\n]+/g, " ")}`,
      text: rows.map(([k, val]) => `${k}: ${val}`).join("\n"),
      html: `<h2>New contact message</h2><table cellpadding="6" style="border-collapse:collapse">${rows
        .map(([k, val]) => `<tr><td valign="top"><strong>${esc(k)}</strong></td><td>${esc(val).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
    });
  } catch (err) {
    console.error("Contact email failed:", err);
    return Response.json({ error: "Could not send email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
