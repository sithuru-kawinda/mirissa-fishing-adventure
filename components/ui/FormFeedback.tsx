import { AlertCircle, CheckCircle2, Info, Mail, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";
import type { FormStatus } from "@/types";
import { cn } from "@/lib/utils";

/** `summary` is the plain-text version of what the visitor filled in, used for the WhatsApp/email hand-off. */
export function FormFeedback({ status, summary, subject }: { status: FormStatus; summary: string; subject: string }) {
  if (status.state === "idle" || status.state === "submitting") return null;

  const tone = {
    sent: { box: "border-emerald-300 bg-emerald-50 text-emerald-900", Icon: CheckCircle2 },
    local: { box: "border-amber-300 bg-amber-50 text-amber-900", Icon: Info },
    error: { box: "border-red-300 bg-red-50 text-red-900", Icon: AlertCircle },
  }[status.state];

  return (
    <div role={status.state === "error" ? "alert" : "status"} className={cn("rounded-2xl border p-5", tone.box)}>
      <p className="flex items-start gap-3 font-medium">
        <tone.Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        {status.message}
      </p>
      {status.state !== "sent" && (
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink
            href={whatsappLink(summary)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="secondary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Send via WhatsApp
          </ButtonLink>
          <ButtonLink
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`}
            size="sm"
            variant="outline"
          >
            <Mail className="h-4 w-4" aria-hidden /> Send via Email
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
