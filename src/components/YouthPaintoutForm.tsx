'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

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
  parentName: z
    .string()
    .trim()
    .min(1, { message: "Please enter the parent or guardian's name." })
    .max(150, { message: "Name must be less than 150 characters." }),
  // Participation consent is required. The photo release is deliberately
  // separate and optional — permission to attend shouldn't be conditional on
  // agreeing to be photographed.
  consent: z.literal(true, {
    errorMap: () => ({ message: "A parent or guardian must give permission to participate." }),
  }),
  photoRelease: z.boolean(),
});

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  parentName: string;
  consent: boolean;
  photoRelease: boolean;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

const YouthPaintoutForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    parentName: "",
    consent: false,
    photoRelease: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
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
          parentGuardian: result.data.parentName,
          parentConsent: "Yes — permission to participate given",
          photoRelease: result.data.photoRelease ? "Yes" : "No",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/tickets/youth-paintout/success");
    } catch {
      setSubmitError(
        "Something went wrong sending your registration. Please try again, or email us directly at ralstoncreativedistrict@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20";
  const labelClass =
    "block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground";
  const errorClass = "mt-1 px-1 font-body text-xs";

  type TextKey = "firstName" | "lastName" | "phone" | "email" | "parentName";

  const field = (
    key: TextKey,
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

  const checkbox = (
    key: "consent" | "photoRelease",
    label: string,
    optional?: boolean,
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={`youth-${key}`} className="flex cursor-pointer items-start gap-3">
        <input
          id={`youth-${key}`}
          type="checkbox"
          checked={form[key]}
          onChange={(e) => update(key, e.target.checked)}
          aria-invalid={errors[key] ? "true" : "false"}
          aria-describedby={errors[key] ? `youth-${key}-error` : undefined}
          className="mt-1 h-4 w-4 flex-shrink-0 accent-[hsl(var(--primary))]"
        />
        <span className="font-body text-sm leading-relaxed text-foreground/85">
          {label}
          {optional && (
            <span className="text-muted-foreground/90"> (optional)</span>
          )}
        </span>
      </label>
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
        {field("firstName", "Youth's First Name", "text", "First name", 100, "given-name")}
        {field("lastName", "Youth's Last Name", "text", "Last name", 100, "family-name")}
        {field("phone", "Phone", "tel", "(402) 555-0100", 30, "tel")}
        {field("email", "Email Address", "email", "you@example.com", 255, "email")}
      </div>

      {field(
        "parentName",
        "Parent or Guardian Name",
        "text",
        "Parent or guardian's full name",
        150,
        "name",
      )}

      <div className="space-y-4 rounded-sm border border-border bg-muted/40 p-5">
        {checkbox(
          "consent",
          "I am the parent or guardian of the youth named above, and I give permission for them to take part in the Youth Paintout on Saturday, September 12.",
        )}
        {checkbox(
          "photoRelease",
          "I give permission for photos taken at the event that include my child to be used in festival promotion.",
          true,
        )}
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
