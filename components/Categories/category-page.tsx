"use client";
import { FiSearch, FiAlertCircle, FiFilter, FiTrendingUp, FiFolder } from "react-icons/fi";
import CategoryCard from "@/shared/Card/CategoryCard";
import CategoryCardSkeleton from "@/shared/Skeleton/CategoryCardSkeleton";
import { useCategory, Category } from "./hooks/useCategory";

export default function CategoriesPageComponents({ initialCategories }: { initialCategories?: Category[] }) {
  const { 
    categories, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery 
  } = useCategory({ initialCategories });

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort categories by post count (descending)
  const sortedCategories = [...filteredCategories].sort((a, b) => b.postCount - a.postCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header - Same as Articles Page */}
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
                <FiFolder className="w-8 h-8" />
                <FiTrendingUp className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                All Categories
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Browse our comprehensive collection of articles organized by categories. 
                Find exactly what you&apos;re looking for with smart search and filtering.
              </p>
            </div>

            {/* Right Side - Search Bar - Desktop Only */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-12 pr-4 py-3 border border-white/20 rounded-xl leading-5 bg-white/10 backdrop-blur-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-lg transition-all duration-200"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-blue-200" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl leading-5 bg-white/10 backdrop-blur-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-lg transition-all duration-200"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400 mt-0.5" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {error.message || 'Failed to load categories. Please try again.'}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State - Skeleton */}
        {isLoading ? (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Category Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                    <p className="text-sm text-gray-600">Total Categories</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiFilter className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {sortedCategories.reduce((sum, cat) => sum + cat.postCount, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Articles</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiSearch className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {searchQuery ? sortedCategories.length : categories.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      {searchQuery ? 'Matching' : 'Available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            {sortedCategories.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FiSearch className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {searchQuery ? 'No categories found' : 'No categories available'}
                </h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                  {searchQuery 
                    ? 'No categories match your search. Try different keywords or browse all categories.'
                    : 'Categories will appear here once content is published.'
                  }
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  {searchQuery ? 'Clear Search' : 'Browse All Articles'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    count={category.postCount}
                    href={`/categories/${category.slug}`}
                    icon={category.icon}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
