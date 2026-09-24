import type { Metadata } from "next";
import { postService } from "@/services/post.service";
import { siteService } from "@/services/site.service";
import { notFound } from "next/navigation";
import { THEMES_CONTENT } from "@/constants";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const site = await siteService.getCurrentSite();

    return {
        title: slug,
        keywords: [slug],
        publisher: site.seo.title,
        openGraph: {
            siteName: site.seo.title,
            locale: "en_US",
            type: "website",
            url: `${site.baseUrl}/tag/${slug}`,
            title: `${slug} | ${site.seo.title}`,
            description: site.seo.description,
            images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
        },
        alternates: {
            canonical: `tag/${slug}`,
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    if (!slug || slug.length < 3) {
        notFound();
    }

    const site = await siteService.getCurrentSite();
    const posts = await postService.getPostIndexByTag(
        site.host,
        slug,
    );

    const ThemeContent =
        THEMES_CONTENT[site.theme as keyof typeof THEMES_CONTENT];

    return (
        <ThemeContent
            mode={site.configView.tag}
            posts={posts}
            component="Tag"
            value={decodeURIComponent(slug)}
            visibledBreadcrumb={site.config.visibledBreadcrumb}
        />
    );
}
