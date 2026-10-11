export default function ArticleDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Skeleton */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800/80 rounded-lg shadow-sm p-6 animate-pulse border border-gray-100 dark:border-gray-700/60">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-gray-800/80 rounded-lg shadow-sm overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700/60">
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-750 rounded w-1/4"></div>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-8">
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 dark:bg-gray-700/70 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800/80 rounded-lg shadow-sm p-6 animate-pulse border border-gray-100 dark:border-gray-700/60">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded w-2/3"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-750 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
