import { Fragment } from "react";
import Link from "next/link";

const LINK_PATTERN = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)]+)\)/g;

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
