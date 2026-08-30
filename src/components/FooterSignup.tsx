import type { SiteChrome } from "@/sanity/queries/pages";
import { NEWSLETTER_SIGNUP_URL } from "@/components/NewsletterCTA";

// Points at the district's FASO list, same as the homepage CTA — see the note on
// NEWSLETTER_SIGNUP_URL. `chrome.signupPlaceholder` and `chrome.signupSuccess`
// are no longer rendered here (there is no field to fill and no success state to
// show); the fields are left in Sanity because the homepage footnote still uses
// its sibling `signupFootnote`.
const FooterSignup = ({ chrome }: { chrome: SiteChrome }) => {
  return (
    <div className="w-full">
      <a
        href={NEWSLETTER_SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-primary px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/30 transition-all hover:scale-[1.03] hover:opacity-95 active:scale-[0.98]"
      >
        Sign Up for Updates
      </a>
      <p className="mt-2 font-body text-xs text-foreground/80">
        {chrome.signupFootnote}
      </p>
    </div>
  );
};

export default FooterSignup;
