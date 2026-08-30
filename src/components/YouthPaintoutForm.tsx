'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import type { FormConfig } from "@/sanity/queries/formConfig";
import { buildZodSchemaFromConfig } from "@/lib/buildZodSchemaFromConfig";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepdkyb";

type FormState = {
  firstName: string;
  lastName: string;
  age: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  parentName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationship: string;
  consent: boolean;
  photoRelease: boolean;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

const YouthPaintoutForm = ({ config }: { config: FormConfig }) => {
  const router = useRouter();
  const getField = (key: string) => config.fields.find((f) => f.key === key);
  // Participation consent is required. The photo release is deliberately
  // separate and optional — permission to attend shouldn't be conditional on
  // agreeing to be photographed. Both are legal/liability-sensitive and are
  // kept hardcoded here rather than part of the editable form config.
  const schema = buildZodSchemaFromConfig(config.fields).extend({
    consent: z.literal(true, {
      errorMap: () => ({ message: "A parent or guardian must give permission to participate." }),
    }),
    photoRelease: z.boolean(),
  });
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    age: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    parentName: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    relationship: "",
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
          age: result.data.age,
          streetAddress: result.data.streetAddress,
          city: result.data.city,
          state: result.data.state,
          zip: result.data.zip,
          phone: result.data.phone,
          email: result.data.email,
          parentGuardian: result.data.parentName,
          emergencyContactName: result.data.emergencyContactName,
          emergencyContactPhone: result.data.emergencyContactPhone,
          relationshipToStudent: result.data.relationship,
          parentConsent: "Yes — permission to participate given",
          photoRelease: result.data.photoRelease ? "Yes" : "No",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/tickets/youth-paintout/success");
    } catch {
      setSubmitError(
        "Something went wrong sending your registration. Please try again, or email us directly at info@ralstonarts.org.",
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

  type TextKey =
    | "firstName"
    | "lastName"
    | "age"
    | "streetAddress"
    | "city"
    | "state"
    | "zip"
    | "phone"
    | "email"
    | "parentName"
    | "emergencyContactName"
    | "emergencyContactPhone"
    | "relationship";

  const field = (
    key: TextKey,
    type: string,
    autoComplete: string,
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={`youth-${key}`} className={labelClass}>
        {getField(key)?.label}
      </label>
      <input
        id={`youth-${key}`}
        type={type}
        placeholder={getField(key)?.placeholder}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        maxLength={getField(key)?.maxLength}
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
        {/* The label already toggles the checkbox when clicked anywhere
            (native <label htmlFor> behavior), but the checkbox's own
            16x16 box was well under a 44x44 tap target on its own. The
            wrapping span adds padding plus an equal-and-opposite negative
            margin (with the top margin adjusted for the input's original
            mt-1 optical offset) so the invisible hit area grows to 46x46
            without moving or resizing the visible checkbox. */}
        <span className="-ml-[15px] -mr-[15px] -mt-[11px] -mb-[15px] flex-shrink-0 p-[15px]">
          <input
            id={`youth-${key}`}
            type="checkbox"
            checked={form[key]}
            onChange={(e) => update(key, e.target.checked)}
            aria-invalid={errors[key] ? "true" : "false"}
            aria-describedby={errors[key] ? `youth-${key}-error` : undefined}
            className="block h-4 w-4 accent-[hsl(var(--primary))]"
          />
        </span>
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
      <div className="grid gap-6 sm:grid-cols-3">
        {field("firstName", "text", "given-name")}
        {field("lastName", "text", "family-name")}
        {field("age", "text", "off")}
      </div>

      {field("streetAddress", "text", "address-line1")}

      <div className="grid gap-6 sm:grid-cols-3">
        {field("city", "text", "address-level2")}
        {field("state", "text", "address-level1")}
        {field("zip", "text", "postal-code")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {field("phone", "tel", "tel")}
        {field("email", "email", "email")}
      </div>

      {field("parentName", "text", "name")}

      <div className="grid gap-6 sm:grid-cols-2">
        {field("emergencyContactName", "text", "off")}
        {field("emergencyContactPhone", "tel", "off")}
      </div>

      {field("relationship", "text", "off")}

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
          {submitting ? "Sending..." : config.submitLabel}
        </button>
      </div>
    </form>
  );
};

export default YouthPaintoutForm;
