"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTagArticles } from "./hooks/useTagArticles";
import ArticleCard from "@/shared/Card/ArticleCard";
import SharedPagination from "@/shared/Pagination/Pagination";
import CategoryArticlesSkeleton from "./CategoryArticlesSkeleton";
import {
  FiArrowLeft,
  FiAlertCircle,
  FiGrid,
  FiList,
  FiTag
} from "react-icons/fi";
import { useState } from "react";
import { Article, PaginationInfo } from "./types/articlesTypes";

interface TagArticlesPageProps {
  tag: string;
  initialData?: { articles: Article[]; pagination: PaginationInfo; tag?: string };
}

const TagArticlesPageComponent = ({ tag, initialData }: TagArticlesPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { articles, pagination, displayTag, isLoading } =
    useTagArticles({
      tag,
      page: currentPage,
      limit,
    }, initialData);

  const handleBack = () => {
    router.back();
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return <CategoryArticlesSkeleton viewMode={viewMode} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
            <div className="text-left flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={handleBack}
                  className="hidden md:flex group items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back</span>
                </button>
                <div className="h-8 w-px bg-white/30"></div>
                <FiTag className="w-6 h-6 text-blue-300" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight flex items-center gap-3">
                Tag: <span className="text-blue-200">#{displayTag}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Explore {pagination.totalArticles.toLocaleString()}{" "}
                {pagination.totalArticles === 1 ? "article" : "articles"} tagged with #{displayTag}.
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">Grid View</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                  <span className="font-medium">List View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <FiAlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">We couldn&apos;t find any articles with the tag #{tag}.</p>
            <button onClick={handleBack} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">Go Back</button>
          </div>
        ) : (
          <>
            <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}`}>
              {articles.map((article, index) => (
                <div key={article._id || index}>
                  <ArticleCard
                    id={article._id}
                    title={article.title}
                    slug={article.slug}
                    category={typeof article.category === 'string' ? article.category : article.category?.name || "Uncategorized"}
                    excerpt={article.content}
                    readTime={article.readTime}
                    imageUrl={article.coverImage}
                    likes={article.likes}
                    comments={article.comments}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>

            <div className="mt-16">
              <SharedPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                resultsPerPage={limit}
                totalResults={pagination.totalArticles}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TagArticlesPageComponent;
