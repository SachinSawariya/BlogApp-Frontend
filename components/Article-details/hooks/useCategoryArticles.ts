import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

export const useCategoryArticles = (categorySlug: string, initialData?: Article[]) => {
  const [articles, setArticles] = useState<Article[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategoryArticles = useCallback(async () => {
    if (!categorySlug) return;
    
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getCategoryArticlesTitles",
        parameters: [categorySlug],
      });
      
      // Handle different response structures
      let articlesData = [];
      if (Array.isArray(response.data)) {
        articlesData = response.data;
      } else if (response.data && Array.isArray(response.data.articles)) {
        articlesData = response.data.articles;
      } else if (response.data && Array.isArray(response.data.data)) {
        articlesData = response.data.data;
      }
      
      setArticles(articlesData);
    } catch (err) {
      console.error("Error fetching category articles titles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch category articles titles")
      );
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      fetchCategoryArticles();
    }
  }, [fetchCategoryArticles, initialData]);

  return {
    articles,
    isLoading,
    error,
    refresh: fetchCategoryArticles,
  };
};
