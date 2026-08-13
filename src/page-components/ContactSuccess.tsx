'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";

const ContactSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InquirySuccess
      eyebrow="Thank You"
      title="Message Sent"
      intro="Thanks for reaching out. We'll get back to you as soon as we can."
      backHref="/contact"
      backLabel="Back to Contact"
    />
  );
};

export default ContactSuccess;
