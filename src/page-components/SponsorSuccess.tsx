'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import SponsorPaymentForm from "@/components/SponsorPaymentForm";
import { setPageMeta } from "@/lib/meta";
import { sponsorTiers } from "@/data/sponsorTiers";

const SponsorSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sponsorship Inquiry Received | Heartland Plein Air Festival";
    return setPageMeta(
      "Thank you for your sponsorship inquiry for the Heartland Plein Air Festival.",
    );
  }, []);

  return (
    <InquirySuccess
      eyebrow="Thank You"
      title="Your Sponsorship Inquiry Is In"
      intro="We've received your inquiry and will follow up soon to confirm your level and get you set up. Ready to pay now? Choose your level and pay online or by check below. Here's a recap of the sponsorship levels for your reference."
      recapTitle="Sponsorship Levels"
      recapItems={sponsorTiers.map((tier) => ({
        name: tier.name,
        price: tier.price,
        icon: tier.icon,
        detail: tier.benefits.join(" · "),
      }))}
      backHref="/sponsors"
      backLabel="Back to Sponsors"
    >
      <div className="mx-auto max-w-2xl rounded-lg bg-card p-6 text-left shadow-sm md:p-8">
        <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
          Pay Your Sponsorship Online
        </p>
        <SponsorPaymentForm />
      </div>
    </InquirySuccess>
  );
};

export default SponsorSuccess;
