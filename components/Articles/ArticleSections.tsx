import Link from "next/link";
import ArticleCard from "@/shared/Card/ArticleCard";
import { Article } from "./types/articlesTypes";
import { GoArrowRight } from "react-icons/go";

interface ArticleSectionProps {
  category: string;
  articles: Article[];
  viewMode?: "grid" | "list";
}

export const ArticleSection = ({ 
  category, 
  articles, 
  viewMode = "grid"
}: ArticleSectionProps) => {
  return (
    <section className="mb-12 md:mb-16 relative">
      {/* Section Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-6 mb-6 md:mb-8 transition-colors">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-2 h-6 md:w-2 md:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {category}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {articles.length} {articles.length === 1 ? "article" : "articles"} in this category
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Link
              href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="group flex items-center justify-center md:justify-end gap-2 md:gap-3 w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="text-sm md:text-base">View All</span>
              <GoArrowRight className="w-4 h-4 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      <div className={`${
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          : "space-y-4 md:space-y-6"
      }`}>
        {articles.map((article, index) => (
          <ArticleCard
            key={article._id || index}
            id={article._id}
            title={article.title}
            category={category}
            slug={article.slug}
            excerpt={article.content}
            readTime={article.readTime}
            imageUrl={article.coverImage}
            likes={article.likes}
            viewMode={viewMode}
          />
        ))}
      </div>
    </section>
  );
};
