import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/App";
import { JsonLd, organizationSchema, buildFestivalEventSchema } from "@/lib/schema";
import { getArtistCount } from "@/sanity/queries/artists";
import { getFestivalInfo } from "@/sanity/queries/pages";
import { formatFestivalRange } from "@/lib/festivalDate";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { startDate, endDate } = await getFestivalInfo();
  const range = formatFestivalRange(startDate, endDate);
  return {
    metadataBase: new URL("https://heartlandpleinair.org"),
    title: `Heartland Plein Air Festival | ${range}`,
    description: `Heartland Plein Air Festival brings 25 nationally recognized artists to the Omaha metro for a week of outdoor painting, public exhibition, and live art-making. ${range}.`,
    openGraph: {
      title: `Heartland Plein Air Festival | ${range}`,
      description: `25 nationally recognized plein air artists paint Douglas and Sarpy County live, ${range}. Public exhibition and auction on September 19.`,
      type: "website",
      locale: "en_US",
      siteName: "Heartland Plein Air Festival",
      images: ["/assets/hero-pleinair.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Heartland Plein Air Festival | ${range}`,
      description: `25 nationally recognized plein air artists paint Douglas and Sarpy County live, ${range}.`,
      images: ["/assets/hero-pleinair.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [invitedCount, festivalInfo] = await Promise.all([
    getArtistCount(),
    getFestivalInfo(),
  ]);
  return (
    <html lang="en">
      <head>
        {/* Each route's own metadata (see src/app/*\/page.tsx) sets alternates.canonical,
            which Next.js renders into <head> automatically. A second, hardcoded canonical
            here would conflict with those per-page values on every route but "/". */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationSchema, buildFestivalEventSchema(invitedCount, {
              startDate: festivalInfo.startDate,
              endDate: festivalInfo.endDate,
              range: formatFestivalRange(festivalInfo.startDate, festivalInfo.endDate),
            })],
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:font-body focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers festivalInfo={festivalInfo}>{children}</Providers>
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
            // autoConfig:false disables Meta's Automatic Advanced Matching and
            // automatic event logging — the behaviour that scrapes values out of
            // form fields (names, emails, phone numbers) and sends them to Meta
            // without anything in our code asking it to.
            //
            // This matters most on /tickets, which hosts the Youth Paintout
            // registration form: a child's name, age, home address, phone and
            // emergency contact. Excluding the pixel by route was not an option
            // there — that form shares the page with ticket sales, where the
            // pixel is presumably wanted for conversion tracking. Turning off
            // field scraping targets the actual risk instead.
            //
            // Kept: the explicit PageView below, and any events we fire
            // ourselves. Lost: Meta's automatic match-quality enrichment.
            fbq('set', 'autoConfig', false, '1819681512327549');
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
