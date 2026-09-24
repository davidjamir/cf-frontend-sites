import { MetadataRoute } from "next";
import { siteService } from "@/services/site.service";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await siteService.getCurrentSite();

  return {
    name: site.name,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: site.icon,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: site.icon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
