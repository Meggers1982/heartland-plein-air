'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import PayPalButton from "@/components/PayPalButton";
import MailCheckOption from "@/components/MailCheckOption";
import { setPageMeta } from "@/lib/meta";
import { quickFacts } from "@/data/openDivisionQuickFacts";

const OpenDivisionSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Registration Received | Heartland Plein Air Festival";
    return setPageMeta(
      "Thank you for registering for the Open Division at the Heartland Plein Air Festival.",
    );
  }, []);

  return (
    <InquirySuccess
      eyebrow="Thank You"
      title="Your Registration Is In"
      intro="We've received your registration. Registration is $30 and limited to 30 artists, first come, first served — please pay your fee via PayPal or by mailing a check below. Any registration without payment will not be accepted. Here's a recap of the Open Division quick facts for your reference."
      recapTitle="Open Division Quick Facts"
      recapItems={quickFacts.map((fact) => ({
        name: fact.title,
        icon: fact.icon,
        detail: fact.description,
      }))}
      backHref="/open-division"
      backLabel="Back to Open Division"
    >
      <div className="mx-auto max-w-2xl rounded-lg bg-card p-6 shadow-sm md:p-8">
        <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
          Pay Your $30 Registration Fee
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="text-center">
            <p className="mb-3 font-body text-sm font-semibold text-foreground">
              Pay Online
            </p>
            <PayPalButton
              amount="30.00"
              description="Heartland Plein Air Festival — Open Division Registration"
            />
          </div>
          <div className="border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <MailCheckOption amount="30" />
          </div>
        </div>
      </div>
    </InquirySuccess>
  );
};

export default OpenDivisionSuccess;
