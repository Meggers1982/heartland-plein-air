import { defineField, defineType } from "sanity";

// Singleton (_id: "schedulePage") — the headings around the schedule.
// The days and events themselves come from Schedule Days and Festival Locations.
export const schedulePage = defineType({
  name: "schedulePage",
  title: "Schedule Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "browseLabel", type: "string", description: "The label above the day buttons." }),
    defineField({ name: "locationsEyebrow", type: "string" }),
    defineField({ name: "locationsTitle", type: "string" }),
    defineField({ name: "locationsIntro", type: "text", rows: 3, description: "Shown above the map." }),
    defineField({ name: "mapHelperText", type: "string", description: "The line under the day filter on the map." }),
    defineField({ name: "noEventsText", type: "string", description: "Shown when a filter matches nothing." }),
  ],
  preview: { prepare: () => ({ title: "Schedule Page" }) },
});
