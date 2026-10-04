import { MetadataRoute } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";
import { generateSitemapEntries, SitemapCategory } from "@/utils/sitemapHelpers";

// Revalidate sitemap every hour to pick up new articles
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gyanvora.vercel.app";

  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      commonApi({
        action: "getBlogList",
        config: { next: { revalidate: 3600 } },
      }),
      commonApi({
        action: "getCategoriesList",
        config: { next: { revalidate: 3600 } },
      }),
    ]);

    const articles: Article[] = articlesRes?.data || [];
    const categories: SitemapCategory[] = categoriesRes?.data || [];

    return generateSitemapEntries({ baseUrl, articles, categories });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return generateSitemapEntries({ baseUrl, articles: [], categories: [] });
  }
}
