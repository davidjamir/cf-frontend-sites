import { redirect } from "next/navigation";
import { searchService } from "@/services/search.service";
import { THEMES_CONTENT } from "@/constants";
import { siteService } from "@/services/site.service";

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
