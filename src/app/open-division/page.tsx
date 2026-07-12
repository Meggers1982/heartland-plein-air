import type { Metadata } from "next";
import OpenDivision from "@/page-components/OpenDivision";

export const metadata: Metadata = {
  title: "Register to Paint Plein Air With the Pros: Omaha 2026",
  description:
    "Register to paint alongside 25 national artists during festival week. Limited to 30 spots at $30. All mediums welcome. Sept. 13–19, 2026, Omaha metro.",
  alternates: { canonical: "https://heartlandpleinair.org/open-division" },
};

export default function OpenDivisionPage() {
  return <OpenDivision />;
}
