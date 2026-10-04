"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

interface UseSearchArticlesProps {
  initialQuery?: string;
}

export function useSearchArticles({ initialQuery }: UseSearchArticlesProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery || searchParams.get("q") || "");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setIsLoading(true);
        const response = await commonApi({
          action: "getArticleSections",
        });

        // Flatten all articles from all sections
        const articles: Article[] = (response?.data || []).reduce(
          (acc: Article[], section: { articles: Article[] }) => {
            return [...acc, ...(section.articles || [])];
          },
          []
        );

        setAllArticles(articles);
      } catch (err) {
        console.error("Error fetching articles for search:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch articles"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        (typeof article.category === "string"
          ? article.category.toLowerCase().includes(query)
          : article.category?.name?.toLowerCase().includes(query)) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        article.authorName?.toLowerCase().includes(query)
      );
    });
  }, [allArticles, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("q", searchQuery);
      router.push(`/search?${params.toString()}`);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredArticles,
    isLoading,
    error,
    handleSearch,
  };
}
