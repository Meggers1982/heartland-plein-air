import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/App";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heartland Plein Air Festival | September 13–19, 2026",
  description:
    "Heartland Plein Air Festival brings 25 nationally recognized artists to the Omaha metro for a week of outdoor painting, public exhibition, and live art-making. September 13–19, 2026.",
  openGraph: {
    title: "Heartland Plein Air Festival | September 13–19, 2026",
    description:
      "25 nationally recognized plein air artists paint Douglas and Sarpy County live, September 13–19, 2026. Public exhibition and auction on September 19.",
    type: "website",
    locale: "en_US",
    siteName: "Heartland Plein Air Festival",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heartland Plein Air Festival | September 13–19, 2026",
    description:
      "25 nationally recognized plein air artists paint Douglas and Sarpy County live, September 13–19, 2026.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://heartlandpleinair.org" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQ1HV47WKM"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BQ1HV47WKM');
          `}
        </Script>
      </body>
    </html>
  );
}
