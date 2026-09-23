// The after-festival online painting sale (FASO), open through Oct 4, 2026.
// Every call-out is hardcoded and shown only in the after-festival phase.
// Cleanup list: CHANGES.md follow-up #10.
export const ONLINE_SALE_URL = "https://ralstonhingecreativedistrict.faso.com/collections/232389";

export const ONLINE_SALE_HIGHLIGHT_ID = "homepageHighlight-9-online-sales";

export const ONLINE_SALE_FAQ_IDS = new Set([
  "faqItem-purchasing-1",
  "faqItem-purchasing-4",
  "faqItem-visitors-1",
]);

// "Sign up for the newsletter to be notified when the online sale opens" —
// wrong once the sale is open, so it is hidden after the festival.
export const isStaleOnlineSaleBlock = (faqId: string, blockIndex: number) =>
  faqId === "faqItem-purchasing-4" && blockIndex === 1;
