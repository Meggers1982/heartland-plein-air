'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
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
      intro="We've received your registration and will follow up soon with payment instructions and check-in details. Here's a recap of the Open Division quick facts for your reference."
      recapTitle="Open Division Quick Facts"
      recapItems={quickFacts.map((fact) => ({
        name: fact.title,
        icon: fact.icon,
        detail: fact.description,
      }))}
      backHref="/open-division"
      backLabel="Back to Open Division"
    />
  );
};

export default OpenDivisionSuccess;
