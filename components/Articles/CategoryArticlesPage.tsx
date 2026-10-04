"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryArticles } from "./hooks/useCategoryArticles";
import ArticleCard from "@/shared/Card/ArticleCard";
import SharedPagination from "@/shared/Pagination/Pagination";
import CategoryArticlesSkeleton from "./CategoryArticlesSkeleton";
import {
  FiArrowLeft,
  FiAlertCircle,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { useState } from "react";
import { Article, PaginationInfo } from "./types/articlesTypes";

interface CategoryArticlesPageProps {
  slug: string;
  initialData?: { articles: Article[]; pagination: PaginationInfo };
}

const CategoryArticlesPageComponent = ({ slug, initialData }: CategoryArticlesPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { articles, pagination, isLoading } =
    useCategoryArticles({
      slug,
      page: currentPage,
      limit,
    }, initialData);

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
            {/* Left Side - Title and Description */}
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
                
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Browse through {pagination.totalArticles.toLocaleString()}{" "}
                {pagination.totalArticles === 1 ? "article" : "articles"} in the {categoryName} category.
                Explore insights, tutorials, and expert content.
              </p>
            </div>

            {/* Right Side - View Mode Toggle - Desktop Only */}
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
          <ExploreOtherCategory
            categoryName={categoryName}
            handleBack={handleBack}
          />
        ) : (
          <>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }`}
            >
              {articles.map((article, index) => (
                <ArticleCard
                  key={article._id || index}
                  id={article._id}
                  title={article.title}
                  slug={article.slug}
                  category={categoryName}
                  excerpt={article.content}
                  readTime={article.readTime}
                  imageUrl={article.coverImage}
                  likes={article.likes}
                  comments={article.comments}
                  viewMode={viewMode}
                />
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

export default CategoryArticlesPageComponent;

const ExploreOtherCategory = ({
  categoryName,
  handleBack,
}: {
  categoryName: string;
  handleBack: () => void;
}) => {
  return (
    <div className="text-center py-20">
      <div className="relative inline-block mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
          <FiAlertCircle className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">!</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        No articles found
      </h3>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
        There are no articles in the{" "}
        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {categoryName}
        </span>{" "}
        category yet.
        <br />
        Check back later or explore other categories for amazing content.
      </p>
      <button
        onClick={handleBack}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Explore Other Categories
      </button>
    </div>
  );
};
