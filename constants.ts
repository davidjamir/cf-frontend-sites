import { getOrigin } from "@/helpers/getOrigin";

import NewsTheme from "@/themes/news/NewsTheme";
// import TeamTheme from "@/themes/team/TeamTheme";
// import MLBTheme from "@/themes/mlb/MLBTheme";
// import MusicTheme from "@/themes/music/MusicTheme";
// import NBATheme from "@/themes/nba/NBATheme";
// import NFLTheme from "@/themes/nfl/NFLTheme";
// import NHLTheme from "@/themes/nhl/NHLTheme";
// import SportTheme from "@/themes/sport/SportTheme";
// import FootballTheme from "@/themes/football/FootballTheme";

import {
  NewsContent,
  NewsPostPage,
  NewsNetworkItem,
} from "@/themes/news/NewsContent";
import { NewsHomePage } from "@/themes/news/NewsHomepage";

export const NUMBER_POSTS_LATEST = 15;

export const ORIGIN_CONFIG_DEVELOPMENT_DEFAULT = (
  domain = "www.thetimenews.us",
) => ({
  host: domain,
  protocol: "https",
  url: `https://${domain}`,
  origin: getOrigin(domain),
  originUrl: `https://${getOrigin(domain)}`,
});

export const THEMES_LAYOUT = {
  news: NewsTheme,
  team: NewsTheme,
  sport: NewsTheme,
  music: NewsTheme,
  movie: NewsTheme,
  nba: NewsTheme,
  nfl: NewsTheme,
  nhl: NewsTheme,
  mlb: NewsTheme,
  football: NewsTheme,
  racing: NewsTheme,
};

export const THEMES_CONTENT = {
  news: NewsContent,
  team: NewsContent,
  sport: NewsContent,
  music: NewsContent,
  movie: NewsContent,
  nba: NewsContent,
  nfl: NewsContent,
  nhl: NewsContent,
  mlb: NewsContent,
  football: NewsContent,
  racing: NewsContent,
};

export const THEMES_HOMEPAGE = {
  news: NewsHomePage,
  team: NewsHomePage,
  sport: NewsHomePage,
  music: NewsHomePage,
  movie: NewsHomePage,
  nba: NewsHomePage,
  nfl: NewsHomePage,
  nhl: NewsHomePage,
  mlb: NewsHomePage,
  football: NewsHomePage,
  racing: NewsHomePage,
};

export const THEMES_POSTPAGE = {
  news: NewsPostPage,
  team: NewsPostPage,
  sport: NewsPostPage,
  music: NewsPostPage,
  movie: NewsPostPage,
  nba: NewsPostPage,
  nfl: NewsPostPage,
  nhl: NewsPostPage,
  mlb: NewsPostPage,
  football: NewsPostPage,
  racing: NewsPostPage,
};

export const THEMES_NETWORK = {
  news: NewsNetworkItem,
  team: NewsNetworkItem,
  sport: NewsNetworkItem,
  music: NewsNetworkItem,
  movie: NewsNetworkItem,
  nba: NewsNetworkItem,
  nfl: NewsNetworkItem,
  nhl: NewsNetworkItem,
  mlb: NewsNetworkItem,
  football: NewsNetworkItem,
  racing: NewsNetworkItem,
};