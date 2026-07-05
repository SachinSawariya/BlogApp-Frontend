import CategoriesPageComponents from "@/components/Categories/category-page";
import { Metadata } from "next";

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

export default function CategoriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Categories",
    description: "Explore articles by topic. From AI and ML to Web Development and Programming Languages, find exactly what you need.",
    url: "https://gyanvora.vercel.app/categories",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoriesPageComponents />
    </>
  );
}
