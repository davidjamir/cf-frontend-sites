export type Post = {
  id: string;
  title: string;
  slug: string;
  domain: string;
  featuredImage: string;
  thumbnailImage?: string;
  socialPoster?: string;
  snippet: string;
  mainCategory: string;
  categories: string[];
  segment: string;
  author: string;
  createdAt: string;
  tags: string[];
  content: string;
};

export type PostIndex = {
  id: string;
  title: string;
  slug: string;
  domain: string;
  featuredImage: string;
  thumbnailImage?: string;
  socialPoster?: string;
  snippet: string;
  mainCategory: string;
  categories: string[];
  segment: string;
  author: string;
  tags: string[];
  createdAt: Date;
};
