import type { Category } from "@/core/domain/category";
import type { Page } from "@/core/domain/page";

export type SiteTheme =
  | "team"
  | "sport"
  | "music"
  | "news"
  | "nba"
  | "nfl"
  | "nhl"
  | "mlb";

export type SiteSeo = {
  title: string;
  description?: string;
  canonicalUrl?: string;
};

export type AdsItem = {
  id: string;
  source: string;
  content: string;
  enabled: boolean;
};

export type SiteAds = {
  adsTxt?: string;
  adsScript: {
    adsHeader: AdsItem[];
    adsBody: { afterPost: AdsItem; beforePost: AdsItem; inPost: AdsItem[] };
    adsFooter: AdsItem[];
    adsLeftSidebar: AdsItem[];
    adsRightSidebar: AdsItem[];
    adsVideoHeader: AdsItem;
  };
};

export type SiteVerification = {
  google?: string;
  yandex?: string;
  yahoo?: string;
  other?: Record<string, string | string[]>;
};
export type ScriptAttributeItem = {
  key: string;
  value: string;
};

export type SiteScriptItem = {
  id: string;
  src: string;
  async: boolean;
  defer: boolean;
  crossOrigin?: "anonymous" | "use-credentials";
  strategy?:
    | "afterInteractive"
    | "lazyOnload"
    | "beforeInteractive"
    | "worker"
    | undefined;
  attributes?: ScriptAttributeItem[];
  enabled: boolean;
};

export type SiteNetworkItem = {
  id: string;
  host: string;
  baseUrl: string;
  name: string;
  logo: string;
  entity: string;
  colorBackground: string;
};

export type LeagueNetworkItem = {
  slug: string;
  name: string;
  sites: SiteNetworkItem[];
};

export type NetworkItem = {
  slug: string;
  name: string;
  leagues: LeagueNetworkItem[];
  generalSites: SiteNetworkItem[];
};

export type Socials = {
  facebook?: string;
  instagram?: string;
  threads?: string;
  x?: string;
  tiktok?: string;
  youtube?: string;
  telegram?: string;
  reddit?: string;
  pinterest?: string;
  discord?: string;
  whatsapp?: string;
  snapchat?: string;
  twitch?: string;
  linkedin?: string;
};

export type Site = {
  id: string;
  host: string;
  baseUrl: string;
  origin: string;
  name: string;
  icon: string;
  logo: string;
  wordmark?: string;
  siteCategory: string;
  theme: SiteTheme;
  seo: SiteSeo;
  ads: SiteAds;
  script: SiteScriptItem[];
  categories: Category[];
  pages: Page[];
  verification: SiteVerification;
  configView: {
    category: "list" | "grid";
    search: "list" | "grid";
    tag: "list" | "grid";
  };
  config: {
    colorHeader: string;
    colorTextHeader: string;
    visibledBreadcrumb: boolean;
    customOpengraphImage: boolean;
    enabledAds: boolean;
    primaryColor: string;
    accentColor: string;
    symbolOg: string;
  };
  analytics: {
    gaId?: string;
    gtmId?: string;
  };
  socials: Socials;
  networks: NetworkItem[];
  entity?: string;
  league?: string;
};
