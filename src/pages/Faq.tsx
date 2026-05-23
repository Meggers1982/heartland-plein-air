import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";

const faqs = [
  {
    q: "What is plein air painting?",
    a: "Plein air is a French term meaning \"open air,\" and the practice is exactly what it sounds like: artists painting outside, directly from life, rather than working from photos or references back in a studio. The goal is to capture a place as it actually exists in a given moment — the quality of the light, the atmosphere, the movement, the feeling of being there. The tradition goes back to the 19th century and was central to the Impressionist movement. Artists like Monet and Renoir built their careers on it. Working outdoors means working quickly — a plein air piece is often completed within an hour or two before the light shifts — so the paintings tend to have an energy and immediacy that studio work can't quite replicate. Every painting is a one-of-a-kind record of a specific place at a specific moment in time.",
  },
  {
    q: "Where will the artists be painting?",
    a: "Artists will paint freely across the Omaha Metro throughout the festival week, choosing their own locations each day. That said, there are several scheduled events where you're guaranteed to find artists in action. Lunchtime Quick Paint competitions take place in Benson (62nd and Maple) on September 14, Dundee (50th and Underwood) on September 15, and the Cathedral & Castle district (along 40th Street between Cuming and Davenport) on September 16. On September 17, an evening Quick Paint will be held in Ralston at Main and 77th Street. Beyond those events, artists may paint anywhere that inspires them — and the metro gives them a lot to work with. Suggested locations include Lauritzen Gardens, the Old Market, the Riverfront, Memorial Park, Fort Omaha, Neale Woods Nature Reserve, the Bob Kerrey Pedestrian Bridge, Elmwood Park Grotto, Fontanelle Forest, Schramm State Park, Chalco Hills, Boystown, and Ralston's Oak Park, among others.",
  },
  {
    q: "Can I watch the artists paint?",
    a: "The public is welcome to observe artists at work throughout the entire festival week, at any location across the metro. If you want a guaranteed front-row seat, the lunchtime and evening Quick Paint competitions are your best bet — all participating artists converge on a single location, painting simultaneously against the clock. It's one of the most exciting things to witness at any plein air festival.",
  },
  {
    q: "How can I purchase a painting?",
    a: "Paintings are available for purchase at two events: the Collector's Soiree on September 18 (5–8 PM at the Granary, 7401 Main Street, Ralston) and the Public Exhibition on September 19 (1–4 PM, also at the Granary). The Soiree is ticketed; the Public Exhibition is free. For anyone unable to attend in person, an online sale of remaining artworks runs from September 19 through October 2 at HeartlandPleinAir.org and RalstonArts.org.",
  },
  {
    q: "Is there an admission fee?",
    a: "Watching artists paint throughout the week at outdoor locations across the metro is completely free, as is the Public Exhibition on September 19. The Collector's Soiree on September 18 is a ticketed event — check back here for updates on pricing and ticket availability.",
  },
];

const Faq = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden bg-primary/10 py-32">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Questions & Answers
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl font-body text-lg font-light leading-relaxed text-muted-foreground">
              Everything you need to know about the Heartland Plein Air Arts Festival.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* FAQ Accordion */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="font-display text-lg font-semibold text-foreground text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / Newsletter */}
      <div id="contact">
        <NewsletterCTA />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Faq;
