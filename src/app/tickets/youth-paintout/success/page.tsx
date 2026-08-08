import type { Metadata } from "next";
import YouthPaintoutSuccess from "@/page-components/YouthPaintoutSuccess";

export const metadata: Metadata = {
  title: "Youth Paintout Registration Received | Heartland Plein Air Festival",
  description:
    "You're registered for the Youth Paintout on September 12. Here's what to wear and what to do when you arrive.",
  alternates: {
    canonical: "https://heartlandpleinair.org/tickets/youth-paintout/success",
  },
};

export default function YouthPaintoutSuccessPage() {
  return <YouthPaintoutSuccess />;
}
