import SiteFooter from "@/components/SiteFooter";
import { getFunders } from "@/sanity/queries/sponsors";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sponsors = await getFunders();
  return (
    <>
      {children}
      <SiteFooter sponsors={sponsors} />
    </>
  );
}
