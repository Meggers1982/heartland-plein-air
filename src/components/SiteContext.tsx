'use client';
import { createContext, useContext, type ReactNode } from "react";

import type { FestivalInfo, SiteChrome } from "@/sanity/queries/pages";

/**
 * Supplies the two documents that every page needs to client components.
 *
 * The countdown ribbon lives inside SiteNav, which every page renders, so
 * passing these as props would mean threading them through all fourteen routes
 * and their page-components. The root layout fetches them once and publishes
 * them here instead.
 */
type SiteContextValue = { festival: FestivalInfo; chrome: SiteChrome };

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteContextProvider({
  value,
  children,
}: {
  value: SiteContextValue;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Null only if a component renders outside the provider — callers guard. */
export const useFestivalInfo = () => useContext(SiteContext)?.festival ?? null;
export const useSiteChrome = () => useContext(SiteContext)?.chrome ?? null;
