Replace the topic title "Art Purchasing" with "Buying the Art" in both locations where the FAQ data is defined:

1. `src/data/faq.ts` — line 136, the `title` field in the topic object with `id: "purchasing"`
2. `src/pages/Faq.tsx` — line 153, the duplicate topic definition used by the page component

No other files, logic, or styling changes are needed.