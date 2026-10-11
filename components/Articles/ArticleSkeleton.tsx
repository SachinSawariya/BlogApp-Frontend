import React from 'react';

const ArticlesSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="space-y-20">
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">
            {/* Section Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse"></div>
            </div>

            {/* Articles Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, articleIndex) => (
                <div key={articleIndex} className="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-750">
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="h-6 w-24 bg-gray-100 dark:bg-gray-750 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4 animate-pulse"></div>
                    
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
                    
                    {/* Stats Bar Skeleton */}
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesSkeleton;