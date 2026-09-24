"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/dist/client/link";
import { Badge } from "@/components/ui/badge";
import { UserPen, CalendarCheck2, Tag } from "lucide-react";
import { Post, PostIndex } from "@/core/domain/post";
import { Separator } from "@/components/ui/separator";
import { useSite } from "@/hooks/use-site";
import AdBlock from "@/components/layout/AdBlock";
import BreadcrumbHeader from "@/components/layout/BreadcrumbHeader";
import TagBlock from "@/components/layout/TagBlock";
import { NetworkItem, SiteNetworkItem } from "@/core/domain/site";

export function NewsPostList({ posts }: { posts: PostIndex[] }) {
    return (
        <div className="w-full flex flex-col gap-2 md:gap-4 max-w-4xl mx-auto ">
            {posts.map((post) => (
                <NewsCardListItem key={post.id} post={post} />
            ))}
        </div>
    );
}

function NewsCardListItem({ post }: { post: PostIndex }) {
    return (
        <Card
            className="
                    relative flex flex-row
                    overflow-hidden p-0
                    md:border-none shadơw-sm border border-gray-300/20
                    transition-all duration-300 ring-0 md:ring-1
                    hover:-translate-y-1
                    hover:shadow-xl hover:shadow-blue-500/20 min-h-30
                    rounded-md md:rounded-2xl
                "
        >
            {/* MAIN ARTICLE LINK */}
            <Link
                href={`/post/${post.segment}/${post.slug}`}
                prefetch={false}
                className="absolute inset-0 z-10"
                aria-label={post.title}
            />

            {/* IMAGE LEFT */}
            <div className="relative z-20 w-30 md:w-65 lg:w-80 h-30 md:h-62 shrink-0 overflow-hidden pointer-events-none">
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 20vw"
                    className="
                            object-cover
                            transition-transform duration-300 ease-out
                            group-hover:scale-110
                        "
                />
            </div>

            {/* CONTENT RIGHT */}
            <div className=" relative z-20 flex flex-col gap-2 md:gap-2 justify-center md:p-2 flex-1 pointer-events-none">
                <h3 className="text-base md:text-lg font-semibold line-clamp-2 pointer-events-none">
                    {post.title.slice(0, 90)}...
                </h3>
                <div className="flex flex-row gap-2 justify-start items-center pointer-events-auto">
                    <div className="flex flex-row gap-2 justify-start items-center pointer-events-none">
                        <Badge className="hidden md:flex min-h-0 bg-blue-400/20 text-blue-700 backdrop-blur">
                            <UserPen data-icon="inline-start" />
                            {post.author}
                        </Badge>
                        <Badge className="bg-blue-400/20 text-blue-700 backdrop-blur">
                            <CalendarCheck2 data-icon="inline-end" />{" "}
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </Badge>
                    </div>
                    <div className="pointer-events-auto ">
                        <Link
                            key={post.mainCategory}
                            href={`/category/${post.mainCategory}`}
                            prefetch={false}
                            className="relative z-30 inline-flex items-center py-1"
                        >
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                                {post.mainCategory}
                            </Badge>
                        </Link>
                    </div>
                </div>

                <span className="w-full min-h-0 hidden md:block pointer-events-none">
                    {post.snippet.slice(0, 220)}...
                </span>
                {post.tags?.length > 0 && (
                    <div className="hidden md:flex flex-row gap-2 flex-wrap overflow-hidden pointer-events-auto">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag}
                                href={`/tag/${tag}`}
                                prefetch={false}
                                className="relative z-30 inline-flex"
                            >
                                <Badge className="bg-green-400/20 text-green-700 backdrop-blur hover:bg-green-400/30 hover:text-green-800 transition-colors">
                                    <Tag data-icon="inline-start" />
                                    {tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

function NewsCardGridItem({ post }: { post: PostIndex }) {
    return (
        <Link href={`/post/${post.segment}/${post.slug}`} prefetch={false} className="block group">
            <Card
                className="
                    relative mx-auto w-full max-w-sm p-0 min-h-50 md:min-h-60 lg:min-h-90
                    overflow-hidden
                    border-none
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-xl hover:shadow-blue-500/20
                    hover:border-blue-500/40
                "
            >
                {/* CATEGORY BADGE */}
                <div className="absolute z-40 top-3 right-3">
                    <Badge className="bg-blue-600 text-white  px-4 py-2">
                        {post.mainCategory}
                    </Badge>
                </div>

                {/* IMAGE */}
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="
                            object-cover
                            transition-transform duration-300 ease-out
                            group-hover:scale-110
                        "
                />

                {/* OVERLAY CONTENT */}
                <CardHeader
                    className="
                        absolute z-30 bottom-0 left-0 right-0
                        bg-linear-to-t from-blue-600/30 to-transparent]
                        text-white py-4 md:py-6 lg:py-10
                    "
                >
                    <CardTitle
                        className="
                            bg-blue-500/90 p-2 rounded-xl text-md md:text-lg lg:text-2xl
                            transition-transform duration-300 ease-out
                            group-hover:translate-y-px
                            group-hover:scale-[1.05]
                        "
                    >
                        {post.title.slice(0, 90)}...
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}

export function NewsPostGrid({ posts }: { posts: PostIndex[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
                <NewsCardGridItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export function NewsContent({
    mode,
    posts,
    component,
    value,
    visibledBreadcrumb,
}: {
    mode: "list" | "grid";
    posts: PostIndex[];
    component?: "Tag" | "Category" | "Search";
    value?: string;
    visibledBreadcrumb: boolean;
}) {
    return (
        <>
            {visibledBreadcrumb && (
                <BreadcrumbHeader component={component} value={value} />
            )}
            {posts.length > 0 ? (
                mode === "grid" ? (
                    <NewsPostGrid posts={posts} />
                ) : (
                    <NewsPostList posts={posts} />
                )
            ) : (
                <></>
            )}
        </>
    );
}

export function NewsPostPage({
    post,
    related,
    isDevelopment
}: {
    post: Post;
    related: PostIndex[];
    isDevelopment: boolean;
}) {
    const { site } = useSite();

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-[180px_1fr_180px] lg:grid-cols-[200px_1fr_200px] gap-4">
            {/* SIDERBAR LEFT */}
            <aside className="hidden md:block">
                {!isDevelopment &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsLeftSidebar.length > 0 &&
                    site.ads.adsScript.adsLeftSidebar.filter(ad => ad.enabled).map((ad) => (
                        <div key={ad.id} className="w-full pb-2">
                            <AdBlock code={ad.content} />
                        </div>
                    ))}
            </aside>

            {/* MAIN ARTICLE */}
            <div className="w-full px-2 border border-gray-200/5 shadow-sm rounded-md">
                {/* BEFORE POST ADS */}
                {!isDevelopment &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsBody?.beforePost?.enabled &&
                    site.ads.adsScript.adsBody?.beforePost?.content && (
                        <div className="w-full min-h-5">
                            <AdBlock
                                key={site.ads.adsScript.adsBody?.beforePost.id}
                                code={site.ads.adsScript.adsBody?.beforePost.content}
                            />
                        </div>
                    )}

                <article className="prose prose-neutral max-w-none text-black">
                    {/* TITLE */}
                    <h1 className="text-2xl font-bold leading-tight tracking-tight lg:text-4xl">
                        {post.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-black/65 md:text-md">
                        <span>{post.author}</span> <span>•</span>
                        <time>{post.createdAt}</time> <span>•</span>
                        <Link
                            key={post.mainCategory}
                            href={`/category/${post.mainCategory}`}
                            prefetch={false}
                            className="relative z-30 inline-flex"
                        >
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 p-2 md:p-3 transition-colors">
                                {post.mainCategory}
                            </Badge>
                        </Link>
                    </div>
                    {/* CONTENT */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />

                    {post.tags.length > 0 && <TagBlock tags={post.tags} />}
                </article>

                {/* RELATED POSTS */}
                {related.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="w-full ">
                            <h2 className="text-xl font-bold mb-4">Related Posts</h2>
                            <NewsPostGrid posts={related} />
                        </div>
                    </>
                )}

                {/* UNDER POST ADS */}
                {!isDevelopment &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsBody?.afterPost?.enabled &&
                    site.ads.adsScript.adsBody?.afterPost?.content && (
                        <div className="w-full min-h-5">
                            <AdBlock
                                key={site.ads.adsScript.adsBody?.afterPost.id}
                                code={site.ads.adsScript.adsBody?.afterPost.content}
                            />
                        </div>
                    )}
            </div>

            {/* SIDERBAR RIGHT */}
            <aside className="hidden md:block">
                {!isDevelopment &&
                    site.config.enabledAds &&
                    site.ads.adsScript.adsRightSidebar.length > 0 &&
                    site.ads.adsScript.adsRightSidebar.filter(ad => ad.enabled).map((ad) => (
                        <div key={ad.id} className="w-full pb-2">
                            <AdBlock code={ad.content} />
                        </div>
                    ))}
            </aside>
        </div>
    );
}

export function NewsNetworkSiteCard({ site }: { site: SiteNetworkItem }) {
    return (
        <Link
            href={site.baseUrl}
            target="_blank"
            className="flex items-center gap-4 rounded-xl border p-3 lg:p-4 transition hover:bg-muted"
        >
            <div className="relative h-12 w-12 lg:h-16 lg:w-16 shrink-0 overflow-hidden rounded-lg"
                style={{ backgroundColor: site.colorBackground }}
            >
                <Image
                    src={site.logo}
                    alt={site.name}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    className="object-contain"
                />
            </div>

            <div className="min-w-0">
                <h3 className="truncate font-medium">{site.name}</h3>

                {site.entity && (
                    <p className="text-muted-foreground truncate text-sm">
                        {site.entity}
                    </p>
                )}
            </div>
        </Link>
    );
}

export function NewsNetworkItem({ network }: { network: NetworkItem }) {
    return (
        <div className="space-y-10">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">{network.name} Network</h1>
                <p className="text-muted-foreground">
                    Browse all websites in the {network.name} network.
                </p>
            </header>

            {network.generalSites.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">General</h2>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {network.generalSites.map((site) => (
                            <NewsNetworkSiteCard key={site.host} site={site} />
                        ))}
                    </div>
                </section>
            )}

            {network.leagues.map((league) => (
                <section key={league.slug} className="space-y-4">
                    <h2 className="text-xl font-semibold">{league.name}</h2>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {league.sites.map((site) => (
                            <NewsNetworkSiteCard key={site.host} site={site} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}