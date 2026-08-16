'use client';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiteContextProvider } from "@/components/SiteContext";
import type { FestivalInfo, SiteChrome } from "@/sanity/queries/pages";

const queryClient = new QueryClient();

export default function Providers({
  children,
  festivalInfo,
  siteChrome,
}: {
  children: React.ReactNode;
  festivalInfo: FestivalInfo;
  siteChrome: SiteChrome;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SiteContextProvider value={{ festival: festivalInfo, chrome: siteChrome }}>
          {children}
        </SiteContextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
