'use server'
import { cacheLife } from "next/cache";
import { postService } from "@/services/post.service";
import { NewsPostList } from "./NewsContent";
import { Site } from "@/core/domain/site";

export async function NewsHomePage({ site }: { site: Site }) {
    "use cache";
    cacheLife("hours");

    const latest = await postService.getPostIndexLatest(site.baseUrl);

    return <NewsPostList posts={latest} />
}