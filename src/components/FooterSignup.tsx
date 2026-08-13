'use client';
import { useState } from "react";
import { Check } from "lucide-react";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqgolwo";

const FooterSignup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2.5 font-body text-sm text-foreground"
      >
        <Check className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>Thanks — you're on the list.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="your@email.com"
          maxLength={255}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "footer-email-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-primary px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/30 transition-all hover:scale-[1.03] hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      <div className="mt-2 min-h-[1rem]" aria-live="polite">
        {error ? (
          <p
            id="footer-email-error"
            className="font-body text-xs"
            style={{ color: "hsl(var(--destructive))" }}
          >
            {error}
          </p>
        ) : (
          <p className="font-body text-xs text-foreground/80">
            No spam. Festival updates only.
          </p>
        )}
      </div>
    </form>
  );
};

export default FooterSignup;
