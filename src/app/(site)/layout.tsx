import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import SiteFooter from "@/components/SiteFooter";
import DisableDraftMode from "@/components/DisableDraftMode";
import { getFunders } from "@/sanity/queries/sponsors";
import { SanityLive } from "@/sanity/lib/live";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sponsors = await getFunders();
  const isDraftMode = (await draftMode()).isEnabled;
  return (
    <>
      {children}
      <SiteFooter sponsors={sponsors} />
      <SanityLive />
      {isDraftMode && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
