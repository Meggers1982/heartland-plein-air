'use client';
import { useEffect } from "react";
import { Shirt, ClipboardCheck, MapPin, Palette, CalendarPlus, Printer } from "lucide-react";
import InquirySuccess from "@/components/InquirySuccess";
import { setPageMeta } from "@/lib/meta";
import { buildEventIcs, downloadIcs } from "@/lib/ics";

const dayOfInstructions = [
  {
    name: "Wear clothes that can get paint on them",
    icon: Shirt,
    detail:
      "Painting outside is messy, and paint does not always wash out. Wear old clothes and shoes you would not be upset about staining — an apron or an old shirt over the top is a good idea too.",
  },
  {
    name: "No ticket needed — just give your name",
    icon: ClipboardCheck,
    detail:
      "There is nothing to print and nothing to show when you get there. Go to the registration table, give your first and last name, and you will be checked in. You are already on the list from this form.",
  },
  {
    name: "Where and when to show up",
    icon: MapPin,
    detail:
      "Saturday, September 12, 10 AM–Noon at Wildwood Park, 78th & Ralston Ave., Ralston. Try to arrive a few minutes early so there is time to check in and get set up before painting starts.",
  },
  {
    name: "Come back that evening",
    icon: Palette,
    featured: true,
    detail:
      "The work made that morning is celebrated at the Youth Art Show Reception, 5–6:30 PM at the Baright Public Library, 5555 S. 77th St. It is free and open to everyone, so bring the whole family. Sponsored by Applewood Hy-Vee.",
  },
];

const YouthPaintoutSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Youth Paintout Registration Received | Heartland Plein Air Festival";
    return setPageMeta(
      "You're registered for the Youth Paintout on September 12. Here's what to wear and what to do when you arrive.",
    );
  }, []);

  const handleAddToCalendar = () => {
    const ics = buildEventIcs({
      uid: "day-sep-12-youth-paintout",
      date: "20260912",
      time: "10 AM – Noon",
      name: "Youth Paintout — Heartland Plein Air Festival",
      location: "Wildwood Park",
      address: "78th & Ralston Ave., Ralston, NE",
      description:
        "Wear clothes that can get paint on them. No ticket needed — give your name at the registration table when you arrive.",
    });
    downloadIcs("youth-paintout-sep-12.ics", ics);
  };

  const actionClass =
    "inline-flex items-center gap-2 rounded-full border-2 border-secondary/60 bg-transparent px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground";

  return (
    <InquirySuccess
      eyebrow="You're Registered"
      title="See You at the Youth Paintout"
      intro="You're on the list — there's nothing else to do to hold your spot. Here's what you'll want to know before Saturday, September 12, whether you're the young artist coming to paint or the parent or guardian bringing them."
      recapTitle="What to Do on the Day"
      recapItems={dayOfInstructions}
      backHref="/tickets"
      backLabel="Back to Tickets"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
        <button type="button" onClick={handleAddToCalendar} className={actionClass}>
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Add to calendar
        </button>
        <button type="button" onClick={() => window.print()} className={actionClass}>
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print this page
        </button>
      </div>
    </InquirySuccess>
  );
};

export default YouthPaintoutSuccess;
