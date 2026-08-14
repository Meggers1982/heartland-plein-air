import { sanityFetch } from "@/sanity/lib/live";

export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select";

export type FormFieldConfig = {
  _key: string;
  key: string;
  label: string;
  placeholder?: string;
  type: FormFieldType;
  required: boolean;
  options?: string[];
  maxLength?: number;
};

export type FormConfig = {
  _id: string;
  formKey: string;
  name: string;
  submitLabel: string;
  successTitle?: string;
  successMessage?: string;
  fields: FormFieldConfig[];
};

export async function getFormConfig(formKey: string) {
  const { data } = await sanityFetch({
    query: `*[_type == "formConfig" && formKey == $formKey][0]`,
    params: { formKey },
    tags: ["formConfig"],
  });
  return data as FormConfig;
}
