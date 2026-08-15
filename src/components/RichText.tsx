import type { PortableTextBlock } from "sanity";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  marks: {
    // Italic is used as a term-of-art highlight (e.g. "plein air" on /about),
    // which the hardcoded markup styled in the display face and brand orange.
    // Safe to define globally: a scan of every existing Portable Text field
    // found link annotations only — no other content uses `em`.
    em: ({ children }) => <em className="font-display text-primary">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      return href.startsWith("/") ? (
        <Link href={href} className="font-semibold text-primary hover:underline">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

const RichText = ({ value }: { value: PortableTextBlock[] }) => (
  <PortableText value={value} components={components} />
);

export default RichText;
