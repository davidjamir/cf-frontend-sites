import { cacheLife, cacheTag } from "next/cache";
import {
  isProduction,
  isCrypto,
  WORKER_R2_DATABASE,
  INTERNAL_SECRET,
  ADAPTER_API_ENDPOINT,
  ADAPTER_SECRET_TOKEN,
  AES_SECRET_KEY,
} from "@/lib/env";
import { decryptPacket } from "@/lib/decrypt";
import { NUMBER_POSTS_LATEST } from "@/constants";
import type { Post, PostIndex } from "@/core/domain/post";

export const postService = {
  async getPostData(
    baseUrl: string,
    domain: string,
    segment: string,
    slug: string,
  ) {
    "use cache";
    cacheLife("max");
    cacheTag(`post-data:${baseUrl}/${segment}/${slug}`);

    try {
      const searchParams = new URLSearchParams({ host: domain, segment, slug });

      const request = new Request(
        `${baseUrl}/api/post?${searchParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${INTERNAL_SECRET}` },
        },
      );

      const response: Response = !isProduction
        ? await fetch(request)
        : await WORKER_R2_DATABASE.fetch(request);

      if (!response.ok) {
        throw new Error("Failed to get post data");
      }

      if (isCrypto) {
        const encryptedData: string = await response.text();
        return decryptPacket<Post>(encryptedData, AES_SECRET_KEY);
      }

      const postData: Post = await response.json();
      return postData;
    } catch (error) {
      console.error("[fetchPostData] ERROR:", error);
      throw error;
    }
  },

  async getPostIndexByCategory(domain: string, category: string) {
    "use cache";
    cacheLife("hours");
    cacheTag(`posts-index-category:${domain}:${category}`);

    try {
      const url = new URL("/api/category", ADAPTER_API_ENDPOINT);
      url.searchParams.set("domain", domain);
      url.searchParams.set("category", category);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${ADAPTER_SECRET_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get post by category");
      }

      const data = (await response.json()) as {
        ok: boolean;
        count: number;
        items: PostIndex[];
      };

      return data.items as PostIndex[];
    } catch (error) {
      console.error("[fetchPostIndexByCategory] ERROR:", error);
      throw error;
    }
  },

  async getPostIndexByTag(domain: string, tag: string) {
    "use cache";
    cacheLife("hours");
    cacheTag(`posts-index-tag:${domain}:${tag}`);

    try {
      const url = new URL("/api/tag", ADAPTER_API_ENDPOINT);
      url.searchParams.set("domain", domain);
      url.searchParams.set("tag", tag);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${ADAPTER_SECRET_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get post by tag");
      }
      const data = (await response.json()) as {
        ok: boolean;
        count: number;
        items: PostIndex[];
      };

      return data.items as PostIndex[];
    } catch (error) {
      console.error("[fetchPostIndexByTag] ERROR:", error);
      throw error;
    }
  },

  async getPostIndexLatest(baseUrl: string, domain: string) {
    "use cache";
    cacheLife("hours");
    cacheTag(`posts-index-latest:${baseUrl}`);

    try {
      const url = new URL(`${baseUrl}/api/latest`);
      url.searchParams.set("host", domain);

      const request = new Request(url, {
        headers: { Authorization: `Bearer ${INTERNAL_SECRET}` },
      });

      const response: Response = !isProduction
        ? await fetch(request)
        : await WORKER_R2_DATABASE.fetch(request);

      if (!response.ok) {
        throw new Error("Failed to get post latest");
      }

      let data;
      if (isCrypto) {
        const encryptedData: string = await response.text();
        data = await decryptPacket<{
          ok: boolean;
          count: number;
          items: PostIndex[];
        }>(encryptedData, AES_SECRET_KEY);
      }

      data = (await response.json()) as {
        ok: boolean;
        count: number;
        items: PostIndex[];
      };

      return data.items.slice(0, NUMBER_POSTS_LATEST) as PostIndex[];
    } catch (error) {
      console.error("[fetchPostIndexLatest] ERROR:", error);
      throw error;
    }
  },

  async getPostIndexRelated(
    domain: string,
    slug: string,
    categories: string[],
  ) {
    "use cache";
    cacheLife("days");
    cacheTag(`posts-index-related:${domain}/${slug}`);

    try {
      const url = new URL("/api/related", ADAPTER_API_ENDPOINT);
      url.searchParams.set("domain", domain);
      url.searchParams.set("slug", slug);
      if (categories.length > 0) {
        url.searchParams.set("categories", categories.join(","));
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${ADAPTER_SECRET_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get post related");
      }
      const data = (await response.json()) as {
        ok: boolean;
        count: number;
        items: PostIndex[];
      };

      return data.items as PostIndex[];
    } catch (error) {
      console.error("[fetchPostIndexRelated] ERROR:", error);
      throw error;
    }
  },
};
