'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import PayPalButton from "@/components/PayPalButton";
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
      intro="We've received your registration. Registration is $30 and limited to 30 artists, first come, first served — please click the PayPal button below to pay your fee. Any registration without payment will not be accepted. Here's a recap of the Open Division quick facts for your reference."
      recapTitle="Open Division Quick Facts"
      recapItems={quickFacts.map((fact) => ({
        name: fact.title,
        icon: fact.icon,
        detail: fact.description,
      }))}
      backHref="/open-division"
      backLabel="Back to Open Division"
    >
      <div className="mx-auto max-w-xs rounded-lg bg-card p-6 shadow-sm">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-foreground">
          Pay Your $30 Registration Fee
        </p>
        <PayPalButton
          amount="30.00"
          description="Heartland Plein Air Festival — Open Division Registration"
        />
      </div>
    </InquirySuccess>
  );
};

export default OpenDivisionSuccess;
