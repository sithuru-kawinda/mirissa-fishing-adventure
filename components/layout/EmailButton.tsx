import Image from "next/image";
import { site } from "@/lib/site";

export function EmailButton() {
  return (
    <a
      href={`mailto:${site.contact.email}`}
      aria-label={`Email us at ${site.contact.email}`}
      className="fixed bottom-4 right-4 z-50 block h-12 w-12 overflow-hidden rounded-full shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <Image src="/email-icon.png" alt="" width={448} height={448} className="h-full w-full scale-[1.12] object-cover" />
    </a>
  );
}
