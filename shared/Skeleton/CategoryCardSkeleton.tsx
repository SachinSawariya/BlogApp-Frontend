'use client';

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/60 p-6 rounded-xl shadow-md text-center animate-pulse">
      {/* Icon Skeleton */}
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
      
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1 mx-auto w-20"></div>
      
      {/* Count Skeleton */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-16"></div>
    </div>
  );
};

export default CategoryCardSkeleton;
