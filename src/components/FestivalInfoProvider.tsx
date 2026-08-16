'use client';
import { createContext, useContext, type ReactNode } from "react";

import type { FestivalInfo } from "@/sanity/queries/pages";

/**
 * Supplies the festival dates to client components anywhere in the tree.
 *
 * The countdown ribbon lives inside SiteNav, which every page renders, so
 * passing the dates as props would mean threading them through all fourteen
 * routes and their page-components. The root layout fetches them once and
 * publishes them here instead.
 */
const FestivalInfoContext = createContext<FestivalInfo | null>(null);

export function FestivalInfoProvider({
  value,
  children,
}: {
  value: FestivalInfo;
  children: ReactNode;
}) {
  return <FestivalInfoContext.Provider value={value}>{children}</FestivalInfoContext.Provider>;
}

/** Null only if a component renders outside the provider — callers guard. */
export const useFestivalInfo = () => useContext(FestivalInfoContext);
