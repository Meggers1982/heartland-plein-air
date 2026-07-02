'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import { setPageMeta } from "@/lib/meta";
import { adSizes } from "@/data/adSizes";

const AdvertisingSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ad Reservation Received | Heartland Plein Air Festival";
    return setPageMeta(
      "Thank you for reserving ad space in the Heartland Plein Air Festival catalog.",
    );
  }, []);

  return (
    <InquirySuccess
      eyebrow="Thank You"
      title="Your Ad Reservation Is In"
      intro="We've received your reservation and will follow up soon. Print-ready ads are due by July 15th — email your artwork to ralstoncreativedistrict@gmail.com and enclose a check payable to the Ralston Hinge Creative District. Here's a recap of the ad sizes for your reference."
      recapTitle="Catalog Ad Sizes"
      recapItems={adSizes.map((size) => ({
        name: size.name,
        price: size.price,
        icon: size.icon,
        detail: size.dimensions,
      }))}
      backHref="/advertising"
      backLabel="Back to Advertising"
    />
  );
};

export default AdvertisingSuccess;
