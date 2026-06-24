import type { Metadata } from "next";
import OpenDivision from "@/page-components/OpenDivision";

export const metadata: Metadata = {
  title: "Open Division | Heartland Plein Air Festival",
  description:
    "Information for Open Division artists at the Heartland Plein Air Festival, September 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/open-division" },
};

export default function OpenDivisionPage() {
  return <OpenDivision />;
}
