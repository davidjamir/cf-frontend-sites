import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";
import {
  isProduction,
  isCrypto,
  WORKER_R2_DATABASE,
  INTERNAL_SECRET,
  AES_SECRET_KEY,
} from "@/lib/env";
import { decryptPacket } from "@/lib/decrypt";
import { ORIGIN_CONFIG_DEVELOPMENT_DEFAULT } from "@/constants";
import type { Site } from "@/core/domain/site";

async function fetchSite(baseUrl: string, domain: string) {
  "use cache";
  cacheLife("days");
  cacheTag(`site-config:${baseUrl}`);

  try {
    const url = new URL(`${baseUrl}/api/site`);
    url.searchParams.set("host", domain);

    const request = new Request(url, {
      headers: { Authorization: `Bearer ${INTERNAL_SECRET}` },
    });

    const response: Response = !isProduction
      ? await fetch(request)
      : await WORKER_R2_DATABASE.fetch(request);

    if (!response.ok) {
      throw new Error("Failed to get current site");
    }

    if (isCrypto) {
      const encryptedData: string = await response.text();
      return decryptPacket<Site>(encryptedData, AES_SECRET_KEY);
    }

    const siteData: Site = await response.json();
    return siteData;
  } catch (error) {
    console.error("[fetchSite] ERROR:", error);
    throw error;
  }
}

export const siteService = {
  async getRequestOrigin() {
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

    if (!host) {
      throw new Error("Missing host");
    }

    // Checking environment app
    if (!isProduction || host.startsWith("localhost")) {
      return ORIGIN_CONFIG_DEVELOPMENT_DEFAULT();
    }

    return ORIGIN_CONFIG_DEVELOPMENT_DEFAULT(host);
  },

  async getHost() {
    const { host } = await this.getRequestOrigin();

    return host;
  },

  async getCurrentSite() {
    const { url, host } = await this.getRequestOrigin();
    const resultSite = await fetchSite(url, host);

    return resultSite;
  },
};
