import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

/**
 * Server-side helper to fetch an article by slug with ISR revalidation.
 */
export async function fetchArticleBySlugServer(slug: string): Promise<Article | null> {
  try {
    const response = await commonApi({
      action: "getArticlBySlug",
      parameters: [slug],
      config: { next: { revalidate: 60 } },
    });
    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching article by slug [${slug}]:`, error);
    return null;
  }
}

/**
 * Server-side helper to fetch category articles titles for sidebar with ISR revalidation.
 */
export async function fetchCategoryArticlesServer(categorySlug: string): Promise<Article[]> {
  if (!categorySlug) return [];

  try {
    const response = await commonApi({
      action: "getCategoryArticlesTitles",
      parameters: [categorySlug],
      config: { next: { revalidate: 120 } },
    });

    const rawData = response?.data;
    if (Array.isArray(rawData)) return rawData;
    if (rawData && Array.isArray(rawData.articles)) return rawData.articles;
    if (rawData && Array.isArray(rawData.data)) return rawData.data;

    return [];
  } catch (error) {
    console.error(`Error prefetching category articles [${categorySlug}]:`, error);
    return [];
  }
}
