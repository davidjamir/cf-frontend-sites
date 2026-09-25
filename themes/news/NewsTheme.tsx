"use client";
import { useSite } from "@/hooks/use-site";
import NewHeader from "./NewsHeader";
import NewsFooter from "./NewsFooter";
import { Separator } from "@/components/ui/separator";
import AdBlock from "@/components/layout/AdBlock";

export default function NewsTheme({ children, isProduction }: { children: React.ReactNode; isProduction: boolean }) {
    const { site } = useSite();

    return (
        <div className="min-h-screen flex flex-col overflow-hidden">
            {/* ADS VIDEO HEADER*/}
            {isProduction &&
                site.config.enabledAds &&
                site.ads.adsScript.adsVideoHeader.enabled &&
                site.ads.adsScript.adsVideoHeader.content && (
                    <div key={site.ads.adsScript.adsVideoHeader.id} className="w-full">
                        <AdBlock code={site.ads.adsScript.adsVideoHeader.content} />
                    </div>
                )}

            {/* HEADER */}
            <div
                className="w-full p-4"
                style={{
                    backgroundColor: site.config.colorHeader,
                    color: site.config.colorTextHeader,
                }}
            >
                <NewHeader site={site} />
            </div>
            <Separator className="hidden md:block" />

            {/* SCRIPTS ADS HEADER */}
            <div className=" w-full min-h-1">
                {isProduction &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsHeader.length > 0 &&
                    site.ads.adsScript.adsHeader.filter(ad => ad.enabled).map((ad) => (
                        <AdBlock key={ad.id} code={ad.content} />
                    ))}
            </div>

            {/* BODY LAYOUT */}
            <div className="flex-1 flex justify-center p-4">
                {/* MAIN FULL WIDTH */}
                <main className="min-w-0 w-full max-w-300">{children}</main>
            </div>

            {/* SCRIPTS ADS FOOTER */}
            <div className=" w-full min-h-1">
                {isProduction &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsFooter.length > 0 &&
                    site.ads.adsScript.adsFooter.filter(ad => ad.enabled).map((ad) => (
                        <AdBlock key={ad.id} code={ad.content} />
                    ))}
            </div>

            {/* FOOTER */}
            <div className="w-full flex justify-center px-4 pt-4 bg-black text-white">
                <NewsFooter />
            </div>
        </div>
    );
}
