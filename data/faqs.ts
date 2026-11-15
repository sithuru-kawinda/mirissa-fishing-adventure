import { addOns, policy, transfer } from "@/data/extras";
import { packages } from "@/data/packages";
import { extraPassengers, paymentMethods, ratesNote } from "@/data/rates";
import { formatPrice } from "@/lib/utils";
import type { Faq } from "@/types";

const priceList = packages
  .filter((p) => p.price || p.priceLabel)
  .map((p) => `${p.name} (${p.duration}): ${p.priceLabel ?? formatPrice(p.price)}`)
  .join(". ");

/** One question per add-on in `data/extras.ts`, in the same order. */
const addOnQuestions = [
  "What is the catch and cook experience?",
  "Can I add snorkelling or diving to my trip?",
  "Do you offer GoPro and drone photography?",
  "Can you arrange a celebration or drinks package?",
  "Can I add whale and dolphin watching?",
];

/** SAMPLE ANSWERS — edit to match your real policies before launch. */
export const faqs: Faq[] = [
  {
    question: "What fishing experiences do you offer?",
    category: "Choosing the Right Tour",
    answer:
      "We offer a range of ocean fishing experiences from Mirissa. See our Packages page for the current options; details are being finalised.",
  },
  {
    question: "Where does the fishing adventure start?",
    category: "Booking & Logistics",
    answer:
      "Trips depart from the Mirissa area on Sri Lanka's southern coast. Your exact meeting point and time will be shared when you book.",
  },
  {
    question: "How long does a fishing trip take?",
    category: "The Experience",
    answer:
      "Trip length depends on the package you choose. The duration is listed on each package page and confirmed during booking.",
  },
  {
    question: "What should I bring?",
    category: "The Experience",
    answer:
      "We suggest sun protection, a hat, sunglasses, comfortable light clothing, water and any personal medication. We'll share a full checklist when you book.",
  },
  {
    question: "Is fishing equipment provided?",
    category: "Choosing the Right Tour",
    answer:
      "Please confirm with our team when booking what equipment is included with your chosen package.",
  },
  {
    question: "Can beginners join?",
    category: "The Experience",
    answer:
      "Beginners are generally welcome. Let us know your experience level when booking so the team can prepare.",
  },
  {
    question: "How can I book a fishing trip?",
    category: "Booking & Logistics",
    answer:
      "Use the Book Now button to send us your preferred package, date and group size, or contact us by WhatsApp, phone or email. Your trip is only confirmed once our team replies.",
  },
  {
    question: "What happens if the weather is bad?",
    category: "Safety & Ethics",
    answer:
      "Safety comes first. If we have to cancel because of bad weather or unsafe sea conditions, you receive a 100% refund or the choice of another suitable date. If you need to cancel yourself, let us know at least 24 hours before departure for a full refund.",
  },
  {
    question: "Are private fishing trips available?",
    category: "Choosing the Right Tour",
    answer:
      "Yes. Our Customized Private Charter reserves the whole boat for your family or friends, with the hours, start time and activities (cruising, snorkelling, fishing) set by you. Contact us to plan it.",
  },
  {
    question: "How do you keep guests safe?",
    category: "Safety & Ethics",
    answer:
      "We follow international maritime safety standards. Every guest receives a mandatory safety briefing before departure, and life jackets must be worn for the whole time on the boat. We also follow responsible, sustainable fishing practices that respect marine life and the environment.",
  },
  {
    question: "Do you provide transport to the harbour?",
    category: "Booking & Logistics",
    answer: `We arrange safe, easy transport from your hotel to ${transfer.harbour}. ${transfer.free} ${transfer.nearbyIntro} ${transfer.nearby.join(", ")}. ${transfer.vehicles}`,
  },
  {
    question: "What is your booking and cancellation policy?",
    category: "Booking & Logistics",
    answer: policy.map((p) => `${p.title}: ${p.text}`).join(" "),
  },
  {
    question: "How much do the fishing trips cost?",
    category: "Pricing",
    answer: `${priceList}. ${ratesNote} Private charter pricing depends on your plans, so contact us for a quote.`,
  },
  {
    question: "Is there an extra charge for additional passengers?",
    category: "Pricing",
    answer: `The base package covers up to ${extraPassengers.includedGuests} guests. Each additional guest beyond ${extraPassengers.includedGuests} is $${extraPassengers.amount} extra, up to a maximum of ${extraPassengers.maxGuests} guests.`,
  },
  {
    question: "What payment options do you accept?",
    category: "Pricing",
    answer: paymentMethods.map((m) => `${m.title}: ${m.detail}`).join(" "),
  },
  ...addOns.map((a, i) => ({
    question: addOnQuestions[i],
    category: "Additional Services",
    answer: a.text,
  })),
];
