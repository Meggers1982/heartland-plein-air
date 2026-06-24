import type { Metadata } from "next";
import Sponsors from "@/page-components/Sponsors";

export const metadata: Metadata = {
  title: "Sponsors | Heartland Plein Air Festival",
  description:
    "Learn about the sponsors who make the Heartland Plein Air Festival possible, and find out how to become a sponsor or advertise in the catalog.",
  alternates: { canonical: "https://heartlandpleinair.org/sponsors" },
};

export default function SponsorsPage() {
  return <Sponsors />;
}
