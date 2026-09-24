"use client";
import { use } from "react";
import { useSite } from "@/hooks/use-site";
import { THEMES_NETWORK } from "@/constants";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default function NetWorkGroup({ params }: Props) {
    const { slug } = use(params);
    const { site } = useSite();
    const network = site.networks.find((network) => network.slug === slug);
    if (!network) {
        return <div>Network not found</div>;
    }

    const ThemeNetwork = THEMES_NETWORK[site.theme];
    return (
        <div className="w-full">
            <ThemeNetwork key={network.slug} network={network} />
        </div>
    );
}
