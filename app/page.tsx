import Overview from "@/components/Home";
import { Metadata } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";
import { transformCategories, Category } from "@/utils/categoryTransformer";

export const metadata: Metadata = {
  title: "Gyanvora | Home",
  description:
    "Explore the latest in AI, Machine Learning, and Web Development. Expert tutorials and insights for modern developers.",
  alternates: {
    canonical: "https://gyanvora.vercel.app",
  },
  openGraph: {
    title: "Gyanvora - AI for Developers",
    description:
      "Explore the latest in AI, Machine Learning, and Web Development.",
    url: "https://gyanvora.vercel.app",
    images: ["/logo.svg"],
  },
};

export const revalidate = 300;

export default async function Home() {
  let initialFeatured: Article[] = [];
  let initialCategories: Category[] = [];

  try {
    const [featuredRes, categoriesRes] = await Promise.allSettled([
      commonApi({ action: "getFeaturedArticles", config: { next: { revalidate: 300 } } }),
      commonApi({ action: "getTopCategories", config: { next: { revalidate: 300 } } }),
    ]);

    if (featuredRes.status === "fulfilled") {
      initialFeatured = transformArticles(featuredRes.value?.data || []);
    }
    if (categoriesRes.status === "fulfilled") {
      initialCategories = transformCategories(categoriesRes.value?.data || []);
    }
  } catch (error) {
    console.error("Error pre-fetching home page data:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gyanvora",
    url: "https://gyanvora.vercel.app",
    description:
      "Explore the latest in AI, Machine Learning, and Web Development. Expert tutorials and insights for modern developers.",
    publisher: {
      "@type": "Organization",
      name: "Gyanvora",
      logo: {
        "@type": "ImageObject",
        url: "https://gyanvora.vercel.app/logo.svg",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Overview
        initialFeatured={initialFeatured}
        initialCategories={initialCategories}
      />
    </>
  );
}
