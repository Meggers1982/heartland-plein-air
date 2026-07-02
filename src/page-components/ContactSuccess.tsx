'use client';
import { useEffect } from "react";
import InquirySuccess from "@/components/InquirySuccess";
import { setPageMeta } from "@/lib/meta";

const ContactSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Message Sent | Heartland Plein Air Festival";
    return setPageMeta(
      "Thank you for contacting the Heartland Plein Air Festival.",
    );
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
