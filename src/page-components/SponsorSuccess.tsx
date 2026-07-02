'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
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
      intro="We've received your inquiry and will follow up soon to confirm your level and get you set up. Here's a recap of the sponsorship levels for your reference."
      recapTitle="Sponsorship Levels"
      recapItems={sponsorTiers.map((tier) => ({
        name: tier.name,
        price: tier.price,
        icon: tier.icon,
        detail: tier.benefits.join(" · "),
      }))}
      backHref="/sponsors"
      backLabel="Back to Sponsors"
    />
  );
};

export default SponsorSuccess;
