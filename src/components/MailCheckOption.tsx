import { Mail } from "lucide-react";

import type { ContactInfo } from "@/sanity/queries/pages";

type MailCheckOptionProps = {
  amount: string;
  info: ContactInfo;
  /** Heading above the address. Falls back so an empty field can't blank it. */
  heading?: string;
};

// The payee name and address come from Contact Details. They used to be
// hardcoded here — a third copy after the footer and the contact page — so
// updating the office address left cheques being posted to the old one.
const MailCheckOption = ({ amount, info, heading = "Mail a Check" }: MailCheckOptionProps) => (
  <div>
    <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
      <Mail className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-foreground">
        {heading}
      </p>
    </div>
    <p className="text-center font-body text-sm leading-relaxed text-foreground/85 sm:text-left">
      Make checks payable to {info.organization} for ${amount} and mail to:
    </p>
    <address className="mt-2 text-center font-body text-sm not-italic leading-relaxed text-foreground/85 sm:text-left">
      {info.organization}
      <br />
      {info.addressLine1}
      <br />
      {info.addressLine2}
    </address>
  </div>
);

export default MailCheckOption;
