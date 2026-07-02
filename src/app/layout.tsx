import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/App";
import { organizationSchema, festivalEventSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://heartlandpleinair.org"),
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
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heartland Plein Air Festival | September 13–19, 2026",
    description:
      "25 nationally recognized plein air artists paint Douglas and Sarpy County live, September 13–19, 2026.",
    images: ["/assets/hero-pleinair.jpg"],
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
        {/* Each route's own metadata (see src/app/*\/page.tsx) sets alternates.canonical,
            which Next.js renders into <head> automatically. A second, hardcoded canonical
            here would conflict with those per-page values on every route but "/". */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [organizationSchema, festivalEventSchema],
            }),
          }}
        />
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
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1819681512327549');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1819681512327549&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
