import { postService } from "@/services/post.service";
import { siteService } from "@/services/site.service";
import {
  INTERNAL_SECRET,
  ENDPOINT_SERVER_IMAGE_GENERATOR_VERCEL,
  ENDPOINT_SERVER_IMAGE_GENERATOR_VPS,
} from "@/lib/env";

type Props = {
  params: Promise<{
    segment: string;
    year: string;
    month: string;
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: Props) {
  const { segment, year, month, slug } = await params;
  const site = await siteService.getCurrentSite();
  const post = await postService.getPostData(
    site.baseUrl,
    segment,
    `${year}/${month}/${slug}`,
  );

  if (!site.config.customOpengraphImage) {
    const image = await fetch(post.featuredImage);
    console.log("Image Featured");
    return new Response(image.body, {
      headers: {
        "Content-Type": image.headers.get("content-type") ?? "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (post?.socialPoster) {
    try {
      const data = await fetch(post?.socialPoster);
      const contentType = data.headers.get("content-type");

      if (!data.ok) {
        throw new Error(`Fetch failed: ${data.status} ${data.statusText}`);
      }
      if (!data.body) {
        throw new Error("Fetch failed: response body is empty");
      }

      if (!contentType?.startsWith("image/")) {
        throw new Error(`Invalid content-type: ${contentType}`);
      }

      const image = await data.arrayBuffer();
      if (image.byteLength === 0) {
        throw new Error("Response body is empty");
      }

      console.log("Social Poster CDN");
      return new Response(image, {
        headers: {
          "Content-Type": data.headers.get("content-type") ?? "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log("Message Error: ", message);
    }
  }

  // Use vercel serverless for first building. If not performance, use VPS cheap.
  try {
    const dataGen = await fetch(ENDPOINT_SERVER_IMAGE_GENERATOR_VERCEL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INTERNAL_SECRET}`,
        "User-Agent": "Request_Family/1.0",
      },
      body: JSON.stringify({
        site: {
          host: site.host,
          name: site.name,
          entity: site?.entity,
          theme: site.theme,
          config: {
            customOpengraphImage: site.config.customOpengraphImage,
            symbolOg: site.config.symbolOg,
            primaryColor: site.config.primaryColor,
            accentColor: site.config.accentColor,
          },
        },
        post: {
          title: post.title,
          snippet: post.snippet,
          segment: post.segment,
          featuredImage: post.featuredImage,
          author: post.author,
        },
      }),
    });

    const contentType = dataGen.headers.get("content-type");

    if (!dataGen.ok) {
      throw new Error(`Fetch failed: ${dataGen.status} ${dataGen.statusText}`);
    }
    if (!dataGen.body) {
      throw new Error("Fetch failed: response body is empty");
    }

    if (!contentType?.startsWith("image/")) {
      throw new Error(`Invalid content-type: ${contentType}`);
    }

    const imageGen = await dataGen.arrayBuffer();
    if (imageGen.byteLength === 0) {
      throw new Error("Response body is empty");
    }

    console.log("Image Gen by Server");
    return new Response(imageGen, {
      headers: {
        "Content-Type": dataGen.headers.get("content-type") ?? "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("Message Error: ", message);
  }

  const image = await fetch(post.featuredImage);
  console.log("Image Featured");
  return new Response(image.body, {
    headers: {
      "Content-Type": image.headers.get("content-type") ?? "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
