'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import type { ContactInfo } from "@/sanity/queries/pages";
import SponsorPaymentForm from "@/components/SponsorPaymentForm";
import { getIcon } from "@/sanity/lib/iconMap";
import type { SponsorTier } from "@/sanity/queries/sponsors";

const SponsorSuccess = ({
  contactInfo,
  sponsorTiers }: {
  contactInfo: ContactInfo;
  sponsorTiers: SponsorTier[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InquirySuccess
      contactInfo={contactInfo}
      eyebrow="Thank You"
      title="Your Sponsorship Inquiry Is In"
      intro="We've received your inquiry and will follow up soon to confirm your level and get you set up. Ready to pay now? Choose your level and pay online or by check below. Here's a recap of the sponsorship levels for your reference."
      recapTitle="Sponsorship Levels"
      recapItems={sponsorTiers.map((tier) => ({
        name: tier.name,
        price: tier.price,
        icon: getIcon(tier.icon),
        detail: tier.benefits.join(" · "),
      }))}
      backHref="/sponsors"
      backLabel="Back to Sponsors"
    >
      <div className="mx-auto max-w-2xl rounded-lg bg-card p-6 text-left shadow-sm md:p-8">
        <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
          Pay Your Sponsorship Online
        </p>
        <SponsorPaymentForm sponsorTiers={sponsorTiers} />
      </div>
    </InquirySuccess>
  );
};

export default SponsorSuccess;
