'use client';
import { useEffect } from "react";

/**
 * Sets `document.title` after mount.
 *
 * Only for `not-found.tsx`, which is the one route file in the App Router that
 * cannot export a `metadata` object. Without this the 404 inherits the
 * site-wide title from `src/app/layout.tsx`, so a dead link lands in history
 * and bookmarks looking exactly like the homepage.
 *
 * React 19 hoists a `<title>` rendered anywhere in the tree, which would make
 * this server-rendered and let the file be deleted — but this project is on
 * React 18 (see package.json), so the title has to be set client-side.
 *
 * No SEO cost: the route already responds with a real 404 status, which is
 * what crawlers act on. This is purely for the human-facing tab.
 *
 * Why the MutationObserver rather than a one-shot assignment: the page streams,
 * and Next writes the root layout's `<title>` into `<head>` on a later chunk
 * than this component's hydration. A plain `useEffect` sets the title and then
 * loses it moments later — verified on the deployed page, where the tab kept
 * showing the homepage title. Re-asserting on any `<head>` mutation wins that
 * race regardless of chunk order. The `!==` guard means our own write doesn't
 * retrigger the observer into a loop.
 */
const SetDocumentTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [title]);
  return null;
};

export default SetDocumentTitle;
