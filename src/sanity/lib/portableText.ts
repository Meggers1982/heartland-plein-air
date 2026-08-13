import type { PortableTextBlock } from "sanity";

// JSON-LD needs plain strings, never Portable Text — use this only at
// structured-data call sites, never in the rendered UI path (which uses
// @portabletext/react instead).
export function portableTextToPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) =>
      Array.isArray(block.children)
        ? block.children.map((child) => ("text" in child ? child.text : "")).join("")
        : ""
    )
    .join("\n\n");
}
