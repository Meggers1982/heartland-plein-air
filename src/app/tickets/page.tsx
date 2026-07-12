import type { Metadata } from "next";
import Tickets from "@/page-components/Tickets";

export const metadata: Metadata = {
  title: "Tickets | Heartland Plein Air Festival",
  description:
    "Most Heartland Plein Air Festival events are free. Get the Collector VIP Pass for private artist access, priority seating, and early access to purchase artwork — or grab a standalone Judge's Lecture ticket.",
  alternates: { canonical: "https://heartlandpleinair.org/tickets" },
};

export default function TicketsPage() {
  return <Tickets />;
}
