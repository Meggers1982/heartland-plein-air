import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import RichText from "@/components/RichText";
import type { FaqItem } from "@/sanity/queries/faq";
import type { FaqTeaserSection as FaqTeaserSectionData } from "@/sanity/queries/homepage";

type Props = FaqTeaserSectionData & { faqs: FaqItem[] };

const FaqTeaserSection = ({ eyebrow, title, linkLabel, linkHref, faqs }: Props) => {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger className="font-display text-lg font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground space-y-4">
                  {faq.answer.map((block) => (
                    <p key={block._key}>
                      <RichText value={[block]} />
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <Link
              href={linkHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              {linkLabel}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FaqTeaserSection;
