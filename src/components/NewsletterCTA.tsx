import AnimatedSection from "@/components/AnimatedSection";

const NewsletterCTA = () => {
  return (
    <section id="newsletter" className="bg-foreground py-20">
      <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-4 font-display text-3xl font-bold text-background">
          Stay in the Loop
        </h2>
        <p className="mb-8 font-body text-base text-background/70">
          Sign up for updates about the Heartland Plein Air Arts Festival,
          including artist announcements, event schedules, and more.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 rounded border border-background/20 bg-background/10 px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </AnimatedSection>
    </section>
  );
};

export default NewsletterCTA;
