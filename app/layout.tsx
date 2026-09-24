import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { isDevelopment } from "@/lib/env";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { ThemeProvider } from "@/providers/theme.provider";
import { siteService } from "@/services/site.service";
import { Suspense } from "react";
import { THEMES_LAYOUT } from "@/constants";

const inter = Inter({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await siteService.getCurrentSite();

  return {
    metadataBase: new URL(site.baseUrl),
    description: site.seo.description,
    title: {
      template: `%s | ${site.seo.title}`,
      default: site.seo.title,
    },
    openGraph: {
      siteName: site.seo.title,
      locale: "en_US",
      type: "website",
      url: site.baseUrl,
      title: site.seo.title,
      description: site.seo.description,
      images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/feed",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    category: site.siteCategory,
    publisher: site.seo.title,
    verification: {
      google: site.verification?.google,
      yandex: site.verification?.yandex,
      yahoo: site.verification?.yahoo,
      other: site.verification?.other,
    },
    pinterest: {
      richPin: true,
    },
  };
}

async function SiteBoundary({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await siteService.getCurrentSite();
  const ThemeLayout = THEMES_LAYOUT[site.theme];

  return (
    <>
      {!isDevelopment && site.analytics?.gaId && (
        <GoogleAnalytics gaId={site.analytics.gaId} />
      )}
      {!isDevelopment && site.analytics?.gtmId && (
        <GoogleTagManager gtmId={site.analytics.gtmId} />
      )}
      {!isDevelopment &&
        site.config.enabledAds &&
        site.script.length > 0 &&
        site.script
          .filter((item) => item.enabled)
          .map((item) => {
            const attrs = Object.fromEntries(
              item.attributes?.map((attr) => [attr.key, attr.value]) ?? [],
            );

            return (
              <Script
                key={item.id}
                id={item.id}
                src={item.src}
                async={item.async}
                defer={item.defer}
                crossOrigin={item.crossOrigin}
                strategy={item.strategy}
                {...attrs}
              />
            );
          })}
      <ThemeProvider site={site}>
        <ThemeLayout isDevelopment={isDevelopment}>{children}</ThemeLayout>
      </ThemeProvider>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div />}>
          <SiteBoundary>{children}</SiteBoundary>
        </Suspense>
      </body>
    </html>
  );
}
