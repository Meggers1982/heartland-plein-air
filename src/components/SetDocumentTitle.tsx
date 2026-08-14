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
 */
const SetDocumentTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default SetDocumentTitle;
