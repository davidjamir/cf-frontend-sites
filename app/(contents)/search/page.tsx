import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { searchService } from "@/services/search.service";
import { THEMES_CONTENT } from "@/constants";
import { siteService } from "@/services/site.service";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
    const params = await searchParams;
    const q = params.q ?? "";
    const site = await siteService.getCurrentSite();

    return {
        title: decodeURIComponent(q),
        keywords: [decodeURIComponent(q)],
        publisher: site.seo.title,
        openGraph: {
            siteName: site.seo.title,
            locale: "en_US",
            type: "website",
            url: `${site.baseUrl}/search?q=${q}`,
            title: `${decodeURIComponent(q)} | ${site.seo.title}`,
            description: site.seo.description,
            images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
        },
        alternates: {
            canonical: `search?q=${q}`,
        },
    };
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const q = params.q ?? "";

    if (!q) {
        redirect("/")
    }

    const site = await siteService.getCurrentSite();
    const posts = await searchService.searchPosts(site.host, q);

    const ThemeContent =
        THEMES_CONTENT[site.theme as keyof typeof THEMES_CONTENT];

    return (
        <ThemeContent
            mode={site.configView.search}
            posts={posts}
            component="Search"
            value={decodeURIComponent(q)}
            visibledBreadcrumb={site.config.visibledBreadcrumb}
        />
    );
}
