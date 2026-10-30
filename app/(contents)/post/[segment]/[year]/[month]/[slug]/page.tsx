import type { Metadata } from "next";
import { isProduction } from "@/lib/env";
import { postService } from "@/services/post.service";
import { siteService } from "@/services/site.service";
import { notFound } from "next/navigation";
import { isValidPostParams } from "@/helpers/validatorPostPath";
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
        site.host,
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
    if (!isValidPostParams(segment, year, month, slug)) {
        notFound();
    }

    const site = await siteService.getCurrentSite();
    const post = await postService.getPostData(
        site.baseUrl,
        site.host,
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
