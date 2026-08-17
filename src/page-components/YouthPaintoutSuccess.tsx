'use client';
import { useEffect } from "react";
import { Shirt, ClipboardCheck, MapPin, Palette, CalendarPlus, Printer } from "lucide-react";
import InquirySuccess from "@/components/InquirySuccess";
import type { ContactInfo, TicketsPage, SiteChrome } from "@/sanity/queries/pages";
import { getIcon } from "@/sanity/lib/iconMap";
import { buildEventIcs, downloadIcs } from "@/lib/ics";


const YouthPaintoutSuccess = ({
  contactInfo,
  chrome,
  page,
}: {
  contactInfo: ContactInfo;
  chrome: SiteChrome;
  page: TicketsPage;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCalendar = () => {
    const ics = buildEventIcs({
      uid: "day-sep-12-youth-paintout",
      date: "20260912",
      time: "10 AM – Noon",
      name: "Youth Paintout — Heartland Plein Air Festival",
      location: "Wildewood Park",
      address: "8000 Ralston Ave., Ralston, NE",
      description:
        "Wear clothes that can get paint on them. No ticket needed — give your name at the registration table when you arrive. Check in by 9:45 AM; a parent or guardian must stay in the park for the full session.",
    });
    downloadIcs("youth-paintout-sep-12.ics", ics);
  };

  const actionClass =
    "inline-flex items-center gap-2 rounded-full border-2 border-secondary/60 bg-transparent px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground";

  return (
    <InquirySuccess
      contactInfo={contactInfo}
      chrome={chrome}
      eyebrow="You're Registered"
      title="See You at the Youth Paintout"
      intro="You're on the list — there's nothing else to do to hold your spot. Here's what you'll want to know before Saturday, September 12, whether you're the young artist coming to paint or the parent or guardian bringing them."
      recapTitle="What to Do on the Day"
      recapItems={page.youthPaintoutDayOf.map((i) => ({ ...i, icon: getIcon(i.icon) }))}
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
