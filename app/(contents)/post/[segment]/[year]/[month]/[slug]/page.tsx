import type { Metadata } from "next";
import { isProduction } from "@/lib/env";
import { postService } from "@/services/post.service";
import { siteService } from "@/services/site.service";
import { notFound } from "next/navigation";
import { THEMES_POSTPAGE } from "@/constants";

type Props = {
    params: {
        segment: string;
        year: string;
        month: string;
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const { segment, year, month, slug } = await params;
    const site = await siteService.getCurrentSite();
    const post = await postService.getPostData(
        site.baseUrl,
        segment,
        `${year}/${month}/${slug}`
    );

    return {
        metadataBase: new URL(site.baseUrl),
        title: {
            absolute: post.title,
        },
        description: post.snippet,
        openGraph: {
            siteName: site.seo.title,
            locale: "en_US",
            type: "article",
            url: `${site.baseUrl}/post/${post.segment}/${post.slug}`,
            title: post.title,
            description: post.snippet,
            images: [
                {
                    url: post.featuredImage,
                    width: 1080,
                    height: 1350,
                    alt: post.title,
                    type: "image/png",
                },
            ],
        },
        alternates: {
            canonical: `post/${post.segment}/${post.slug}`,
        },
        authors: [{ name: post.author }],
        publisher: site.seo.title,
        category: post.mainCategory,
        keywords: post.tags,
    };
}

export default async function Page({ params }: Props) {
    const { segment, year, month, slug } = await params;
    const yearNumber = Number(year);

    if (
        Number.isNaN(yearNumber) ||
        year.length !== 4 ||
        yearNumber < 2026 ||
        yearNumber > 2035
    ) {
        notFound();
    }

    const monthNumber = Number(month);

    if (
        Number.isNaN(monthNumber) ||
        month.length !== 2 ||
        monthNumber < 1 ||
        monthNumber > 12
    ) {
        notFound();
    }

    if (!slug || slug.length < 3) {
        notFound();
    }

    const site = await siteService.getCurrentSite();
    const post = await postService.getPostData(
        site.baseUrl,
        segment,
        `${year}/${month}/${slug}`,
    );
    const related = await postService.getPostIndexRelated(
        site.host,
        post.slug,
        post.categories,
    );

    const ThemePostPage =
        THEMES_POSTPAGE[site.theme as keyof typeof THEMES_POSTPAGE];
    return (
        <ThemePostPage post={post} related={related} isProduction={isProduction} />
    )
}
