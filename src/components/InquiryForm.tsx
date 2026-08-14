'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { buildZodSchemaFromConfig } from "@/lib/buildZodSchemaFromConfig";
import type { FormConfig } from "@/sanity/queries/formConfig";

type FormState = {
  name: string;
  organization: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  level: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

type InquiryFormProps = {
  config: FormConfig;
  formspreeEndpoint: string;
  levelOptions: string[];
  // Fixed Formspree payload key for the level field (e.g. "Sponsorship
  // Level"), independent of the editable field label — so an editor
  // relabeling the dropdown in Studio can't silently change what key a
  // Zapier zap or notification template keys off of.
  levelPayloadKey: string;
  addressFields?: boolean;
  successHref?: string;
};

const InquiryForm = ({
  config,
  formspreeEndpoint,
  levelOptions,
  levelPayloadKey,
  addressFields = false,
  successHref,
}: InquiryFormProps) => {
  const router = useRouter();
  const getField = (key: string) => config.fields.find((f) => f.key === key);
  const schema = buildZodSchemaFromConfig(config.fields);
  const [form, setForm] = useState<FormState>({
    name: "",
    organization: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    level: "",
    message: "",
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
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          ...(addressFields
            ? { street: form.street, city: form.city, state: form.state, zip: form.zip }
            : { organization: form.organization }),
          email: form.email,
          phone: form.phone,
          [levelPayloadKey]: form.level,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      if (successHref) {
        router.push(successHref);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError(
        "Something went wrong sending your inquiry. Please try again, or email us directly at info@ralstonarts.org.",
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
          {config.successTitle}
        </h3>
        <p className="max-w-md font-body text-base text-muted-foreground">
          {config.successMessage}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20";
  const labelClass =
    "block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground";
  const errorClass = "mt-1 px-1 font-body text-xs";

  const name = getField("name");
  const organization = getField("organization");
  const street = getField("street");
  const city = getField("city");
  const state = getField("state");
  const zip = getField("zip");
  const email = getField("email");
  const phone = getField("phone");
  const level = getField("level");
  const message = getField("message");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <div className={`grid gap-6 ${addressFields ? "" : "sm:grid-cols-2"}`}>
        <div className="space-y-1.5">
          <label htmlFor="inquiry-name" className={labelClass}>
            {name?.label ?? "Name"}
          </label>
          <input
            id="inquiry-name"
            type="text"
            placeholder={name?.placeholder}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={name?.maxLength}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="inquiry-name-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
              {errors.name}
            </p>
          )}
        </div>
        {!addressFields && organization && (
          <div className="space-y-1.5">
            <label htmlFor="inquiry-organization" className={labelClass}>
              {organization.label}
            </label>
            <input
              id="inquiry-organization"
              type="text"
              placeholder={organization.placeholder}
              value={form.organization}
              onChange={(e) => update("organization", e.target.value)}
              maxLength={organization.maxLength}
              aria-invalid={errors.organization ? "true" : "false"}
              aria-describedby={errors.organization ? "inquiry-organization-error" : undefined}
              className={inputClass}
            />
            {errors.organization && (
              <p id="inquiry-organization-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
                {errors.organization}
              </p>
            )}
          </div>
        )}
      </div>

      {addressFields && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="inquiry-street" className={labelClass}>
              {street?.label ?? "Street Address"}
            </label>
            <input
              id="inquiry-street"
              type="text"
              placeholder={street?.placeholder}
              value={form.street}
              onChange={(e) => update("street", e.target.value)}
              maxLength={street?.maxLength}
              aria-invalid={errors.street ? "true" : "false"}
              aria-describedby={errors.street ? "inquiry-street-error" : undefined}
              className={inputClass}
            />
            {errors.street && (
              <p id="inquiry-street-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
                {errors.street}
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="inquiry-city" className={labelClass}>
                {city?.label ?? "City"}
              </label>
              <input
                id="inquiry-city"
                type="text"
                placeholder={city?.placeholder}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                maxLength={city?.maxLength}
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby={errors.city ? "inquiry-city-error" : undefined}
                className={inputClass}
              />
              {errors.city && (
                <p id="inquiry-city-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
                  {errors.city}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inquiry-state" className={labelClass}>
                {state?.label ?? "State"}
              </label>
              <input
                id="inquiry-state"
                type="text"
                placeholder={state?.placeholder}
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                maxLength={state?.maxLength}
                aria-invalid={errors.state ? "true" : "false"}
                aria-describedby={errors.state ? "inquiry-state-error" : undefined}
                className={inputClass}
              />
              {errors.state && (
                <p id="inquiry-state-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
                  {errors.state}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inquiry-zip" className={labelClass}>
                {zip?.label ?? "Zip Code"}
              </label>
              <input
                id="inquiry-zip"
                type="text"
                placeholder={zip?.placeholder}
                value={form.zip}
                onChange={(e) => update("zip", e.target.value)}
                maxLength={zip?.maxLength}
                aria-invalid={errors.zip ? "true" : "false"}
                aria-describedby={errors.zip ? "inquiry-zip-error" : undefined}
                className={inputClass}
              />
              {errors.zip && (
                <p id="inquiry-zip-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
                  {errors.zip}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="inquiry-email" className={labelClass}>
            {email?.label ?? "Email"}
          </label>
          <input
            id="inquiry-email"
            type="email"
            placeholder={email?.placeholder}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={email?.maxLength}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="inquiry-email-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="inquiry-phone" className={labelClass}>
            {phone?.label ?? "Phone"}{" "}
            {!phone?.required && <span className="normal-case text-muted-foreground/90">(optional)</span>}
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            placeholder={phone?.placeholder}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={phone?.maxLength}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p id="inquiry-phone-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="inquiry-level" className={labelClass}>
          {level?.label ?? "Level"}
        </label>
        <div className="relative">
          <select
            id="inquiry-level"
            value={form.level}
            onChange={(e) => update("level", e.target.value)}
            aria-invalid={errors.level ? "true" : "false"}
            aria-describedby={errors.level ? "inquiry-level-error" : undefined}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select {(level?.label ?? "level").toLowerCase()}
            </option>
            {levelOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        {errors.level && (
          <p id="inquiry-level-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
            {errors.level}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="inquiry-message" className={labelClass}>
          {message?.label ?? "Message"}{" "}
          {!message?.required && <span className="normal-case text-muted-foreground/90">(optional)</span>}
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          placeholder={message?.placeholder}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={message?.maxLength}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "inquiry-message-error" : undefined}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p id="inquiry-message-error" className={errorClass} style={{ color: "hsl(var(--destructive))" }}>
            {errors.message}
          </p>
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

export default InquiryForm;
