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
    metadataBase: new URL(site.baseUrl),
    title: slug,
    category: slug,
    publisher: site.seo.title,
    openGraph: {
      siteName: site.seo.title,
      locale: "en_US",
      type: "website",
      url: `${site.baseUrl}/category/${slug}`,
      title: `${slug} | ${site.seo.title}`,
      description: site.seo.description,
      images: [{ url: "/images/default-banner.png", alt: site.seo.title }],
    },
    alternates: {
      canonical: `category/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (!slug || slug.length < 3) {
    notFound();
  }

  const site = await siteService.getCurrentSite();
  const posts = await postService.getPostIndexByCategory(
    site.host,
    slug,
  );

  const ThemeContent =
    THEMES_CONTENT[site.theme as keyof typeof THEMES_CONTENT];

  return (
    <ThemeContent
      mode={site.configView.category}
      posts={posts}
      component="Category"
      value={decodeURIComponent(slug)}
      visibledBreadcrumb={site.config.visibledBreadcrumb}
    />
  );
}
