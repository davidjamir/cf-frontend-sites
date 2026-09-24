"use client";
import { useSite } from "@/hooks/use-site";
import { THEMES_NETWORK } from "@/constants";

export default function NetWorks() {
    const { site } = useSite();
    const ThemeNetwork = THEMES_NETWORK[site.theme];

    return (
        <div className="w-full">
            {site.networks.length > 0 && site.networks.map((network) => (
                <ThemeNetwork key={network.slug} network={network} />
            ))}
        </div>
    );
}
