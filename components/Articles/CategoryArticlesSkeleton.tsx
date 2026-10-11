import React from 'react';

interface CategoryArticlesSkeletonProps {
  viewMode?: "grid" | "list";
  count?: number;
}

const CategoryArticlesSkeleton = ({ 
  viewMode = "grid", 
  count = 6 
}: CategoryArticlesSkeletonProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white border-b border-transparent dark:border-gray-800/80 transition-colors">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-0"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white dark:bg-blue-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white dark:bg-purple-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
            {/* Left Side - Title and Description Skeleton */}
            <div className="text-left flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-white/20 dark:bg-gray-800 rounded-full animate-pulse"></div>
                <div className="h-8 w-px bg-white/30 dark:bg-gray-750 animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="h-12 w-48 bg-white/20 dark:bg-gray-800 rounded-lg animate-pulse mb-4"></div>
              <div className="h-6 w-64 bg-white/10 dark:bg-gray-800/60 rounded-lg animate-pulse mb-2"></div>
              <div className="h-6 w-80 bg-white/10 dark:bg-gray-800/60 rounded-lg animate-pulse"></div>
            </div>

            {/* Right Side - View Mode Toggle Skeleton - Desktop Only */}
            <div className="hidden lg:block">
              <div className="bg-white/10 dark:bg-gray-850/80 backdrop-blur-sm border border-white/20 dark:border-gray-800 rounded-xl p-1 w-48">
                <div className="h-10 bg-white/20 dark:bg-gray-800 rounded-lg animate-pulse mb-1"></div>
                <div className="h-10 bg-white/20 dark:bg-gray-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Mobile View Mode Toggle Skeleton */}
          <div className="lg:hidden mt-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1 max-w-xs mx-auto h-12">
              <div className="h-full bg-white/20 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}`}>
          {[...Array(count)].map((_, index) => (
            <CategoryArticleCardSkeleton key={index} viewMode={viewMode} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-blue-600 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual article card skeleton
const CategoryArticleCardSkeleton = ({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) => {
  if (viewMode === "grid") {
    return (
      <div className="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-750">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Content skeleton */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-100 dark:bg-gray-750 rounded-full animate-pulse"></div>
          </div>
          
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4 animate-pulse"></div>
          
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
          
          {/* Stats bar skeleton */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // List view skeleton
  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-750">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image skeleton */}
        <div className="md:w-1/3 lg:w-2/5 h-48 md:h-auto bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Content skeleton */}
        <div className="md:w-2/3 lg:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-100 dark:bg-gray-750 rounded-full animate-pulse"></div>
            </div>
            
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse w-4/5"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse w-3/5"></div>
            
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
          
          {/* Footer skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-12 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
              <div className="h-5 w-12 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
              <div className="h-5 w-12 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
              <div className="h-5 w-8 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
            </div>
            <div className="h-5 w-20 bg-gray-100 dark:bg-gray-750 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryArticlesSkeleton;
