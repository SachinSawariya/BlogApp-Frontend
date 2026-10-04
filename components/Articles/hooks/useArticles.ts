import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

export interface ArticleSection {
  category: string;
  articles: Article[];
}

export const useArticles = (initialData?: ArticleSection[]) => {
  const [sections, setSections] = useState<
    Array<{
      category: string;
      articles: Article[];
    }>
  >(initialData || []);
  const [isLoading, setIsLoading] = useState(!(initialData && initialData.length > 0));
  const [error, setError] = useState<Error | null>(null);

  const fetchArticleSections = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await commonApi({
        action: "getArticleSections",
      });
      const transformedSections = (response.data || []).map((section: ArticleSection) => ({
        ...section,
        articles: Array.isArray(section.articles) ? transformArticles(section.articles) : []
      }));
      setSections(transformedSections);
    } catch (err) {
      console.error("Error fetching article sections:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch article sections")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setSections(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (sections.length === 0 && isLoading) {
      fetchArticleSections();
    }
  }, [fetchArticleSections, sections.length, isLoading]);

  return {
    sections,
    isLoading,
    error,
    refresh: fetchArticleSections,
  };
};
