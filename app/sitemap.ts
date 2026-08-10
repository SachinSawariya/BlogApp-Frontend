import { MetadataRoute } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Revalidate sitemap every hour to pick up new articles
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gyanvora.vercel.app";

  // Fetch all articles with cache busting
  let articles = [];
  try {
    const response = await commonApi({ 
      action: "getBlogList",
      config: { cache: 'no-store' }
    });
    articles = response.data || [];
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
  }

  // Fetch all categories with cache busting
  let categories = [];
  try {
    const response = await commonApi({ 
      action: "getCategoriesList",
      config: { cache: 'no-store' }
    });
    categories = response.data || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  // Extract unique tags from articles
  const allTags = new Set<string>();
  articles.forEach((article: Article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag) => allTags.add(tag.toLowerCase()));
    }
  });

  const tagEntries: MetadataRoute.Sitemap = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map(
    (article: Article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(
        article.updatedAt || article.createdAt || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.map(
    (category: Category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...articleEntries,
    ...categoryEntries,
    ...tagEntries,
  ];
}
