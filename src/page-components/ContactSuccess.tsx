'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import type { ContactInfo, SiteChrome } from "@/sanity/queries/pages";

const ContactSuccess = ({
  contactInfo,
  chrome,
}: {
  contactInfo: ContactInfo;
  chrome: SiteChrome;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InquirySuccess
      contactInfo={contactInfo}
      chrome={chrome}
      eyebrow="Thank You"
      title="Message Sent"
      intro="Thanks for reaching out. We'll get back to you as soon as we can."
      backHref="/contact"
      backLabel="Back to Contact"
    />
  );
};

export default ContactSuccess;
