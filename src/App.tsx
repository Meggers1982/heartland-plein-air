'use client';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FestivalInfoProvider } from "@/components/FestivalInfoProvider";
import type { FestivalInfo } from "@/sanity/queries/pages";

const queryClient = new QueryClient();

export default function Providers({
  children,
  festivalInfo,
}: {
  children: React.ReactNode;
  festivalInfo: FestivalInfo;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FestivalInfoProvider value={festivalInfo}>{children}</FestivalInfoProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
