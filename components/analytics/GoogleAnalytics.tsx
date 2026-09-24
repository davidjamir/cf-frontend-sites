import Script from "next/script";

type GoogleAnalyticsProps = {
    gaId: string;
};

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
                strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gaId)});
        `}
            </Script>
        </>
    );
}
