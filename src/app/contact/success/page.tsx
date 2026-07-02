import type { Metadata } from "next";
import ContactSuccess from "@/page-components/ContactSuccess";

export const metadata: Metadata = {
  title: "Message Sent | Heartland Plein Air Festival",
  description: "Thank you for contacting the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/contact/success" },
};

export default function ContactSuccessPage() {
  return <ContactSuccess />;
}
