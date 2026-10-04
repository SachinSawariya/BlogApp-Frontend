"use client";

import { useParams } from "next/navigation";
import { useArticleDetail } from "./hooks/useArticleDetail";
import { useCategoryArticles } from "./hooks/useCategoryArticles";
import ArticleContent from "./ArticleContent";
import ArticleSidebar from "./ArticleSidebar";
import RelatedLinks from "./RelatedLinks";
import ArticleDetailSkeleton from "./ArticleDetailSkeleton";
import { useState, useEffect } from "react";
import { Article } from "@/components/Articles/types/articlesTypes";

const ArticleDetailComponent = ({ 
  initialArticle,
  initialCategoryArticles = []
}: { 
  initialArticle?: Article | null;
  initialCategoryArticles?: Article[];
}) => {
  const params = useParams();
  const slug = params.slug as string;
  
  const { article, isLoading: articleLoading } = useArticleDetail(slug, initialArticle);
  const { articles: categoryArticles, isLoading: categoryLoading } = useCategoryArticles(
    typeof article?.category === 'string' ? article.category.toLowerCase() : article?.category?.slug || "",
    initialCategoryArticles
  );
  
  const [relatedArticles, setRelatedArticles] = useState<Article[]>(
    initialCategoryArticles.length > 0 ? initialCategoryArticles.slice(0, 3) : []
  );

  useEffect(() => {
    if (Array.isArray(categoryArticles) && categoryArticles.length > 0) {
      setRelatedArticles(categoryArticles.slice(0, 3));
    }
  }, [categoryArticles]);

  // Show skeleton while loading main article
  if (articleLoading) {
    return <ArticleDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-[1700px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Category Articles */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ArticleSidebar
              articles={categoryArticles}
              isLoading={categoryLoading}
              title={`${(typeof article?.category === 'string' ? article.category : article?.category?.name || 'Category')} Articles`}
            />
          </aside>

          {/* Main Content - Article */}
          <main className="lg:col-span-6 order-1 lg:order-2">
            <ArticleContent
              article={article}
              isLoading={articleLoading}
            />
          </main>

          {/* Right Sidebar - Related Links */}
          <aside className="lg:col-span-3 order-3">
            <RelatedLinks
              article={article}
              relatedArticles={relatedArticles}
            />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetailComponent;