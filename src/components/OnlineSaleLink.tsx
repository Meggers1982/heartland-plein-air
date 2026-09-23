import type { ReactNode } from "react";

import { ONLINE_SALE_URL } from "@/lib/onlineSale";

const VARIANT_CLASS = {
  small: "font-body text-xs font-semibold uppercase tracking-widest text-primary hover:underline",
  prose: "font-body text-base font-semibold text-primary underline-offset-4 hover:underline",
};

/** A link to the online painting sale that only exists after the festival. */
const OnlineSaleLink = ({
  children = "Shop the online sale →",
  variant = "small",
  className = "",
}: {
  children?: ReactNode;
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
}) => (
  <div className={`hidden phase-after:block ${className}`}>
    <a
      href={ONLINE_SALE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-colors ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </a>
  </div>
);

export default OnlineSaleLink;
