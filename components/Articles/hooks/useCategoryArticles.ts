import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article, PaginationInfo } from "../types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

interface UseCategoryArticlesProps {
  slug: string;
  page?: number;
  limit?: number;
}

export const useCategoryArticles = (
  { slug, page = 1, limit = 12 }: UseCategoryArticlesProps,
  initialData?: { articles: Article[]; pagination: PaginationInfo },
) => {
  const [articles, setArticles] = useState<Article[]>(
    initialData ? transformArticles(initialData.articles) : [],
  );
  const [pagination, setPagination] = useState(
    initialData?.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalArticles: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategoryArticles = useCallback(async (forceFetch = false) => {
    if (!slug) return;
    if (initialData && page === 1 && !forceFetch) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await commonApi({
        action: "getCategoryArticles",
        parameters: [slug, page, limit],
      });

      if (response.data && response.data.articles && response.data.pagination) {
        setArticles(transformArticles(response.data.articles));
        setPagination(response.data.pagination);
      } else {
        setArticles([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalArticles: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      }
    } catch (err) {
      console.error("Error fetching category articles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch category articles"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [slug, page, limit, initialData]);

  useEffect(() => {
    if (initialData && typeof initialData !== "string" && page === 1) {
      if (initialData.articles) setArticles(transformArticles(initialData.articles));
      if (initialData.pagination) setPagination(initialData.pagination);
      setIsLoading(false);
    }
  }, [initialData, page]);

  useEffect(() => {
    fetchCategoryArticles();
  }, [fetchCategoryArticles]);

  return {
    articles,
    pagination,
    isLoading,
    error,
    refresh: fetchCategoryArticles,
  };
};
