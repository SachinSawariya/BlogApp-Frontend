import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

interface UseTagArticlesProps {
  tag: string;
  page?: number;
  limit?: number;
}

export const useTagArticles = (
  { tag, page = 1, limit = 12 }: UseTagArticlesProps,
  initialData?: { articles: Article[]; pagination: any; tag?: string },
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

  const [displayTag, setDisplayTag] = useState<string>(initialData?.tag || tag);

  const fetchTagArticles = useCallback(async (forceFetch = false) => {
    if (!tag) return;
    
    // If we have initial data and it's the first page, we don't need to fetch
    if (initialData && page === 1 && !forceFetch) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await commonApi({
        action: "getArticlesByTag",
        parameters: [tag, page, limit],
      });

      if (response.data && response.data.articles && response.data.pagination) {
        setArticles(transformArticles(response.data.articles));
        setPagination(response.data.pagination);
        if (response.data.tag) setDisplayTag(response.data.tag);
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
      console.error("Error fetching tag articles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch tag articles"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [tag, page, limit, initialData]);

  useEffect(() => {
    if (initialData && typeof initialData !== "string" && page === 1) {
      if (initialData.articles) setArticles(transformArticles(initialData.articles));
      if (initialData.pagination) setPagination(initialData.pagination);
      if (initialData.tag) setDisplayTag(initialData.tag);
      setIsLoading(false);
    }
  }, [initialData, page]);

  useEffect(() => {
    fetchTagArticles();
  }, [fetchTagArticles]);

  return {
    articles,
    pagination,
    displayTag,
    isLoading,
    error,
    refresh: fetchTagArticles,
  };
};
