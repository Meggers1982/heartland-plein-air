'use client';
import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepdkyb";

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter the youth's first name." })
    .max(100, { message: "First name must be less than 100 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter the youth's last name." })
    .max(100, { message: "Last name must be less than 100 characters." }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Please enter a phone number." })
    .max(30, { message: "Phone number must be less than 30 characters." })
    .regex(/^[\d\s()+.\-extEXT]{7,}$/, { message: "Please enter a valid phone number." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter an email address." })
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be less than 255 characters." }),
});

type FormState = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormState, string>>;

const YouthPaintoutForm = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "Youth Paintout — Saturday, September 12",
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          phone: result.data.phone,
          email: result.data.email,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your registration. Please try again, or email us directly at ralstoncreativedistrict@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
          You're registered
        </h3>
        <p className="max-w-md font-body text-base text-muted-foreground">
          Thanks for signing up for the Youth Paintout. We'll be in touch before
          September 12 with what to bring and where to meet.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20";
  const labelClass =
    "block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground";
  const errorClass = "mt-1 px-1 font-body text-xs";

  const field = (
    key: keyof FormState,
    label: string,
    type: string,
    placeholder: string,
    maxLength: number,
    autoComplete: string,
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={`youth-${key}`} className={labelClass}>
        {label}
      </label>
      <input
        id={`youth-${key}`}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={errors[key] ? "true" : "false"}
        aria-describedby={errors[key] ? `youth-${key}-error` : undefined}
        className={inputClass}
      />
      {errors[key] && (
        <p
          id={`youth-${key}-error`}
          className={errorClass}
          style={{ color: "hsl(var(--destructive))" }}
        >
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("firstName", "First Name", "text", "First name", 100, "given-name")}
        {field("lastName", "Last Name", "text", "Last name", 100, "family-name")}
        {field("phone", "Phone", "tel", "(402) 555-0100", 30, "tel")}
        {field("email", "Email Address", "email", "you@example.com", 255, "email")}
      </div>

      {submitError && (
        <p className="font-body text-sm" style={{ color: "hsl(var(--destructive))" }}>
          {submitError}
        </p>
      )}

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Register for the Youth Paintout"}
        </button>
      </div>
    </form>
  );
};

export default YouthPaintoutForm;
