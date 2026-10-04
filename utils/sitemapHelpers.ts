import { MetadataRoute } from "next";
import { Article } from "@/components/Articles/types/articlesTypes";
import { normalizeCategory } from "@/utils/seoHelpers";

export interface SitemapCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface SitemapGeneratorOptions {
  baseUrl: string;
  articles: Article[];
  categories: SitemapCategory[];
}

/**
 * Computes the latest modification date among all articles.
 */
export function getLatestArticleDate(articles: Article[]): Date {
  if (articles.length === 0) return new Date();

  const latestArticle = articles.reduce((latest, current) => {
    const currentTimestamp = new Date(current.updatedAt || current.createdAt || 0).getTime();
    const latestTimestamp = new Date(latest.updatedAt || latest.createdAt || 0).getTime();
    return currentTimestamp > latestTimestamp ? current : latest;
  }, articles[0]);

  return new Date(latestArticle.updatedAt || latestArticle.createdAt || Date.now());
}

/**
 * Builds a Map of category slug -> latest article modified Date.
 */
export function buildCategoryLastModMap(articles: Article[]): Map<string, Date> {
  const map = new Map<string, Date>();

  articles.forEach((art) => {
    const { slug: catSlug } = normalizeCategory(art.category);

    if (catSlug) {
      const artDate = new Date(art.updatedAt || art.createdAt || 0);
      const existing = map.get(catSlug);
      if (!existing || artDate > existing) {
        map.set(catSlug, artDate);
      }
    }
  });

  return map;
}

/**
 * Builds a Map of unique tag -> latest article modified Date.
 */
export function buildTagLastModMap(articles: Article[]): Map<string, Date> {
  const map = new Map<string, Date>();

  articles.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      const artDate = new Date(article.updatedAt || article.createdAt || 0);
      article.tags.forEach((tag) => {
        if (typeof tag === "string" && tag.trim()) {
          const cleanTag = tag.trim().toLowerCase();
          const existing = map.get(cleanTag);
          if (!existing || artDate > existing) {
            map.set(cleanTag, artDate);
          }
        }
      });
    }
  });

  return map;
}

/**
 * Generates the complete, structured Sitemap array.
 */
export function generateSitemapEntries({
  baseUrl,
  articles,
  categories,
}: SitemapGeneratorOptions): MetadataRoute.Sitemap {
  const latestDate = getLatestArticleDate(articles);
  const categoryLastModMap = buildCategoryLastModMap(articles);
  const tagLastModMap = buildTagLastModMap(articles);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.createdAt || latestDate),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: categoryLastModMap.get(category.slug) || latestDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = Array.from(tagLastModMap.entries()).map(
    ([tag, lastMod]) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [...staticPages, ...articleEntries, ...categoryEntries, ...tagEntries];
}
