'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import { ICON_MAP } from "@/sanity/lib/iconMap";
import type { AdSize } from "@/sanity/queries/advertising";

const AdvertisingSuccess = ({ adSizes }: { adSizes: AdSize[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InquirySuccess
      eyebrow="Thank You"
      title="Your Ad Reservation Is In"
      intro="We've received your reservation and will follow up soon. Print-ready ads are due by July 15th — email your artwork to info@ralstonarts.org, and mail a check payable to the Ralston Hinge Creative District to 5615 S. 77th St, Ralston, NE 68127. Here's a recap of the ad sizes for your reference."
      recapTitle="Catalog Ad Sizes"
      recapItems={adSizes.map((size) => ({
        name: size.name,
        price: size.price,
        icon: ICON_MAP[size.icon],
        detail: size.dimensions,
      }))}
      backHref="/advertising"
      backLabel="Back to Advertising"
    />
  );
};

export default AdvertisingSuccess;
