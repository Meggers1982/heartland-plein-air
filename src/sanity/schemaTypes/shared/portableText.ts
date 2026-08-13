// Shared block config for every rich-text field in this schema (scheduleDay
// narratives, FAQ answers, ...) so the link annotation is defined once and
// every consumer can render/query it the same way.
export const portableTextBlock = {
  type: "block",
  marks: {
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [{ name: "href", type: "url", title: "URL" }],
      },
    ],
  },
};
