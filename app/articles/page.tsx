import ArticlesPageComponent from "@/components/Articles/Article-page";
import { Metadata } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Browse our complete collection of articles on AI, Machine Learning, Web Development, and more. Stay ahead with Gyanvora.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/articles",
  },
  openGraph: {
    title: "All Articles | Gyanvora",
    description: "Explore the latest insights and tutorials on Gyanvora.",
    url: "https://gyanvora.vercel.app/articles",
  },
};

export const revalidate = 60;

export default async function ArticlesPage() {
  let sections: { category: string; articles: Article[] }[] = [];
  try {
    const response = await commonApi({ action: "getArticleSections", config: { next: { revalidate: 60 } } });
    const rawSections = (response.data || []) as {
      category: string;
      articles: Parameters<typeof transformArticles>[0];
    }[];

    sections = rawSections.map((section) => ({
      category: section.category,
      articles: Array.isArray(section.articles) ? transformArticles(section.articles) : []
    }));
  } catch (error) {
    console.error("Error fetching articles for SSR:", error);
  }

  return <ArticlesPageComponent initialSections={sections} />;
}
