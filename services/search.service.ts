import { ADAPTER_API_ENDPOINT, ADAPTER_SECRET_TOKEN } from "@/lib/env";
import type { PostIndex } from "@/core/domain/post";

export const searchService = {
  async searchPosts(domain: string, q: string) {
    try {
      const url = new URL("/api/search", ADAPTER_API_ENDPOINT);
      url.searchParams.set("domain", domain);
      url.searchParams.set("q", q);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${ADAPTER_SECRET_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to search posts");
      }

      const data = (await response.json()) as {
        ok: boolean;
        count: number;
        items: PostIndex[];
      };
      return data.items as PostIndex[];
    } catch (error) {
      console.error("[fetchSearchPosts] ERROR:", error);
      throw error;
    }
  },
};
