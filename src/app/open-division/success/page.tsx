import type { Metadata } from "next";
import OpenDivisionSuccess from "@/page-components/OpenDivisionSuccess";

export const metadata: Metadata = {
  title: "Registration Received | Heartland Plein Air Festival",
  description:
    "Thank you for registering for the Open Division at the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/open-division/success" },
};

export default function OpenDivisionSuccessPage() {
  return <OpenDivisionSuccess />;
}
