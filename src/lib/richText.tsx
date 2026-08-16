import { Fragment } from "react";
import Link from "next/link";

// mailto: and tel: are matched as well as / and http(s). Without them a link
// like [info@ralstonarts.org](mailto:...) fails to match and the raw markdown
// is printed to the page — which is exactly what shipped when the advertising
// copy moved into Sanity.
const LINK_PATTERN = /\[([^\]]+)\]\(((?:\/|https?:\/\/|mailto:|tel:)[^)]+)\)/g;

export function renderRichText(text: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    parts.push(
      href.startsWith("/") ? (
        <Link href={href} className="font-semibold text-primary hover:underline">
          {label}
        </Link>
      ) : href.startsWith("mailto:") || href.startsWith("tel:") ? (
        // No target/rel: opening a mail client in a new tab leaves a blank one behind.
        <a href={href} className="font-semibold text-primary hover:underline">
          {label}
        </a>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}
