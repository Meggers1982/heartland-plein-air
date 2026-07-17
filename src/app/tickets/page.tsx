import type { Metadata } from "next";
import Tickets from "@/page-components/Tickets";

export const metadata: Metadata = {
  title: "Buy Plein Air Festival Tickets: Get Closer to the Art",
  description:
    "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
  alternates: { canonical: "https://heartlandpleinair.org/tickets" },
};

export default function TicketsPage() {
  return <Tickets />;
}
