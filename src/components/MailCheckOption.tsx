import { Mail } from "lucide-react";

type MailCheckOptionProps = {
  amount: string;
};

const MailCheckOption = ({ amount }: MailCheckOptionProps) => (
  <div>
    <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
      <Mail className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-foreground">
        Mail a Check
      </p>
    </div>
    <p className="text-center font-body text-sm leading-relaxed text-foreground/85 sm:text-left">
      Make checks payable to Ralston HINGE Creative District for ${amount} and mail to:
    </p>
    <address className="mt-2 text-center font-body text-sm not-italic leading-relaxed text-foreground/85 sm:text-left">
      Ralston HINGE Creative District
      <br />
      5615 S. 77th St
      <br />
      Ralston, NE 68127
    </address>
  </div>
);

export default MailCheckOption;
