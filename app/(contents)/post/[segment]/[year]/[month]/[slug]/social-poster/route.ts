import { postService } from "@/services/post.service";
import { siteService } from "@/services/site.service";

type Props = {
  params: Promise<{
    segment: string;
    year: string;
    month: string;
    slug: string;
  }>;
};

export const size = {
  width: 1080,
  height: 1350,
};

export async function GET(_: Request, { params }: Props) {
  const { segment, year, month, slug } = await params;
  const site = await siteService.getCurrentSite();
  const post = await postService.getPostData(
    site.baseUrl,
    segment,
    `${year}/${month}/${slug}`,
  );

  const image = await fetch(post?.socialImage || post?.featuredImage);
  return new Response(image.body, {
    headers: {
      "Content-Type": image.headers.get("content-type") ?? "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
