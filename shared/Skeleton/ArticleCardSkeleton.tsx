'use client';

interface ArticleCardSkeletonProps {
  viewMode?: "grid" | "list";
}

const ArticleCardSkeleton = ({ viewMode = "grid" }: ArticleCardSkeletonProps) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-lg animate-pulse overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Image Skeleton */}
          <div className="md:w-1/3 lg:w-2/5 h-48 md:h-auto bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Right Side - Content Skeleton */}
          <div className="md:w-2/3 lg:w-3/5 p-6 flex flex-col justify-between">
            <div>
              {/* Category and Read Time Skeleton */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              
              {/* Excerpt Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/60">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Skeleton
  return (
    <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/60 rounded-xl shadow-lg animate-pulse overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4"></div>
        
        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
