import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import SiteFooter from "@/components/SiteFooter";
import DisableDraftMode from "@/components/DisableDraftMode";
import { getFunders } from "@/sanity/queries/sponsors";
import { getContactInfo } from "@/sanity/queries/pages";
import { SanityLive } from "@/sanity/lib/live";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sponsors, contactInfo] = await Promise.all([getFunders(), getContactInfo()]);
  const isDraftMode = (await draftMode()).isEnabled;
  return (
    <>
      {children}
      <SiteFooter sponsors={sponsors} contactInfo={contactInfo} />
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
