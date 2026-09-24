import { siteService } from "@/services/site.service";
import { THEMES_HOMEPAGE } from "@/constants";

export default async function Home() {
  const site = await siteService.getCurrentSite();

  const ThemeHomepage = THEMES_HOMEPAGE[site.theme as keyof typeof THEMES_HOMEPAGE];
  return <ThemeHomepage site={site} />;
}
