import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  icon?: string;
}

interface UseCategoryProps {
  initialSearchQuery?: string;
  initialCategories?: Category[];
}

// Default icons for categories (can be extended or replaced)
const defaultIcons: Record<string, string> = {
  technology: "💻",
  programming: "👨‍💻",
  "web development": "🌐",
  "mobile development": "📱",
  "ui/ux": "🎨",
  "data science": "📊",
  "machine learning": "🤖",
  "cloud computing": "☁️",
  devops: "🔧",
  cybersecurity: "🔒",
  blockchain: "⛓️",
  iot: "📡",
};

export const useCategory = ({
  initialSearchQuery = "",
  initialCategories,
}: UseCategoryProps = {}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories || []);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(!initialCategories || initialCategories.length === 0);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await commonApi({
        action: "getCategoriesList",
        config: {
          next: { revalidate: 60 },
        },
      });

      const formattedCategories = response.data.map((category: { id?: string; _id?: string; name: string; slug?: string; description?: string; articlesCount?: number; icon?: string }) => ({
        id: category.id || category._id,
        name: category.name,
        slug: category.slug || category.name.toLowerCase().replace(/\s+/g, "-"),
        description: category.description,
        postCount: category.articlesCount || 0,
        icon:
          category.icon || defaultIcons[category.name.toLowerCase()] || "📄",
      }));

      setCategories(formattedCategories);
      setFilteredCategories(formattedCategories);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      const error =
        err instanceof Error ? err : new Error("Failed to fetch categories");
      setError(error);

      // Fallback to mock data if API fails
      const fallbackCategories: Category[] = [
        {
          id: "1",
          name: "Technology",
          slug: "technology",
          postCount: 24,
          icon: "💻",
        },
        {
          id: "2",
          name: "Programming",
          slug: "programming",
          postCount: 32,
          icon: "👨‍💻",
        },
        {
          id: "3",
          name: "Web Development",
          slug: "web-development",
          postCount: 18,
          icon: "🌐",
        },
        {
          id: "4",
          name: "Mobile Development",
          slug: "mobile-development",
          postCount: 15,
          icon: "📱",
        },
        {
          id: "5",
          name: "UI/UX Design",
          slug: "ui-ux-design",
          postCount: 12,
          icon: "🎨",
        },
      ];

      setCategories(fallbackCategories);
      setFilteredCategories(fallbackCategories);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (category.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ??
            false)
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  useEffect(() => {
    if (!initialCategories || initialCategories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, initialCategories]);

  return {
    categories: filteredCategories,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    refreshCategories: fetchCategories,
  };
};

export type { Category };
