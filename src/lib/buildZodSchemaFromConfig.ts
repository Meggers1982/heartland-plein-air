import { z } from "zod";

import type { FormFieldConfig } from "@/sanity/queries/formConfig";

// Turns a fetched field-config list into a real z.object at render/submit
// time, so toggling "required" or changing "maxLength" in Studio changes
// actual validation, not just what's displayed. Deliberately does not support
// pattern/regex validation (e.g. the zip/phone format checks some forms used
// to have) — that's not part of the field-config model, so those fields fall
// back to a plain required + max-length check once routed through here.
export function buildZodSchemaFromConfig(fields: FormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let base = z.string().trim();
    if (field.maxLength) {
      base = base.max(field.maxLength, {
        message: `${field.label} must be less than ${field.maxLength} characters.`,
      });
    }
    if (field.type === "email") {
      base = base.email({ message: `Please enter a valid ${field.label.toLowerCase()}.` });
    }

    if (field.required) {
      const requiredMessage =
        field.type === "select"
          ? `Please select a ${field.label.toLowerCase()}.`
          : `Please enter your ${field.label.toLowerCase()}.`;
      shape[field.key] = base.min(1, { message: requiredMessage });
    } else {
      shape[field.key] = base.optional().or(z.literal(""));
    }
  }

  return z.object(shape);
}
