import CategoriesPageComponents from "@/components/Categories/category-page";
import { Metadata } from "next";
import commonApi from "@/api";
import { Category } from "@/components/Categories/hooks/useCategory";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore articles by topic. From AI and ML to Web Development and Programming Languages, find exactly what you need.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/categories",
  },
  openGraph: {
    title: "Explore Categories | Gyanvora",
    description: "Find articles organized by topic on Gyanvora.",
    url: "https://gyanvora.vercel.app/categories",
  },
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  try {
    const response = await commonApi({
      action: "getCategoriesList",
      config: { next: { revalidate: 60 } },
    });
    interface ApiCategoryItem {
      id?: string;
      _id?: string;
      name: string;
      slug?: string;
      description?: string;
      articlesCount?: number;
      icon?: string;
    }

    categories = ((response?.data || []) as ApiCategoryItem[]).map((category) => ({
      id: category.id || category._id || "",
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, "-"),
      description: category.description,
      postCount: category.articlesCount || 0,
      icon: category.icon || "📄",
    }));
  } catch (error) {
    console.error("Error prefetching categories for SSR:", error);
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Categories",
      description: "Explore articles by topic. From AI and ML to Web Development and Programming Languages, find exactly what you need.",
      url: "https://gyanvora.vercel.app/categories",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://gyanvora.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: "https://gyanvora.vercel.app/categories",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoriesPageComponents initialCategories={categories} />
    </>
  );
}
