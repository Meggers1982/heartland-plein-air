import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";
import { getPageSeo } from "@/sanity/queries/pageSeo";

const SITE_URL = "https://heartlandpleinair.org";
const SITE_NAME = "Heartland Plein Air Festival";
const DEFAULT_IMAGE = "/assets/hero-pleinair.jpg";

type BuildArgs = {
  /** Must match a `route` value in pageSeo — see ROUTES in the schema. */
  route: string;
  /** Used if no pageSeo document exists yet for this route. */
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackImage?: string;
  /**
   * Values substituted into `{name}` placeholders in the title and description,
   * from Sanity or the fallback alike.
   *
   * Exists for /open-division, whose description quotes the registration fee.
   * Without this an editor rewriting that description would type the fee as a
   * literal and undo the single-sourcing that keeps the advertised price and
   * the PayPal charge in agreement.
   */
  replacements?: Record<string, string | number>;
};

const applyReplacements = (text: string, values: Record<string, string | number> = {}) =>
  Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );

/**
 * Assembles a route's Metadata from its `pageSeo` document.
 *
 * Every route used to repeat its title and description three times — page,
 * OpenGraph and Twitter — so they drifted easily. They are written once here.
 *
 * The fallbacks matter: a missing or unpublished pageSeo document must not
 * blank a page's title and description, which would be far worse for search
 * than slightly stale text. Editors get the Sanity value when it exists and the
 * shipped copy when it doesn't.
 */
export async function buildPageMetadata({
  route,
  fallbackTitle,
  fallbackDescription,
  fallbackImage = DEFAULT_IMAGE,
  replacements,
}: BuildArgs): Promise<Metadata> {
  const seo = await getPageSeo(route);

  const title = applyReplacements(seo?.title || fallbackTitle, replacements);
  const description = applyReplacements(seo?.description || fallbackDescription, replacements);
  const image = seo?.shareImage
    ? urlFor(seo.shareImage).width(1200).auto("format").url()
    : fallbackImage;
  const url = route === "/" ? SITE_URL : `${SITE_URL}${route}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
