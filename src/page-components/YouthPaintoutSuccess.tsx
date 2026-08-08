'use client';
import { useEffect } from "react";
import { Shirt, ClipboardCheck, MapPin, Palette } from "lucide-react";
import InquirySuccess from "@/components/InquirySuccess";
import { setPageMeta } from "@/lib/meta";

const dayOfInstructions = [
  {
    name: "Wear clothes that can get paint on them",
    icon: Shirt,
    detail:
      "Plein air painting is messy, and paint does not always wash out. Send your young artist in old clothes and shoes you would not mind staining. An apron or old shirt over the top is a good idea.",
  },
  {
    name: "No ticket needed — just give your name",
    icon: ClipboardCheck,
    detail:
      "There is nothing to print and nothing to show at the door. When you arrive, go to the registration table and give the youth's name. We will already have them on the list from this form.",
  },
  {
    name: "Where and when to show up",
    icon: MapPin,
    detail:
      "Saturday, September 12, 10 AM–Noon at Wildwood Park, 78th & Ralston Ave., Ralston. Arrive a few minutes early so there is time to check in and get set up before painting starts.",
  },
  {
    name: "Come back that evening",
    icon: Palette,
    detail:
      "The work created that morning is celebrated at the Youth Art Show Reception, 5–6:30 PM at the Baright Public Library, 5555 S. 77th St. Free and open to everyone — bring the whole family. Sponsored by Applewood Hy-Vee.",
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

  return (
    <InquirySuccess
      eyebrow="You're Registered"
      title="See You at the Youth Paintout"
      intro="We've got the registration — nothing else is needed to hold the spot. Here's what the youth and their parent or guardian should know before Saturday, September 12."
      recapTitle="What to Do on the Day"
      recapItems={dayOfInstructions}
      backHref="/tickets"
      backLabel="Back to Tickets"
    />
  );
};

export default YouthPaintoutSuccess;
