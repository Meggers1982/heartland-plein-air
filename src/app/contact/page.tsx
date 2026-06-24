import type { Metadata } from "next";
import Contact from "@/page-components/Contact";

export const metadata: Metadata = {
  title: "Contact | Heartland Plein Air Festival",
  description:
    "Get in touch with the Heartland Plein Air Festival — questions, sponsorships, volunteer inquiries, and more.",
  alternates: { canonical: "https://heartlandpleinair.org/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
