import type { PortableTextBlock } from "sanity";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  marks: {
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
