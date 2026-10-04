"use client";

import { FiSearch, FiBookOpen, FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useSearchArticles } from "./hooks/useSearchArticles";
import { extractTextSnippet } from "@/utils/seoHelpers";

interface SearchComponentProps {
  initialQuery?: string;
}

export default function SearchComponent({ initialQuery }: SearchComponentProps) {
  const {
    searchQuery,
    setSearchQuery,
    filteredArticles,
    isLoading,
    error,
    handleSearch,
  } = useSearchArticles({ initialQuery });

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    return extractTextSnippet(content, maxLength);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <Link 
              href="/"
              className="flex items-center text-white/90 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FiSearch className="w-8 h-8" />
              <FiBookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Search Articles
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Find exactly what you&apos;re looking for from our collection of articles
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl leading-5 bg-white/10 backdrop-blur-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-lg transition-all duration-200"
                  placeholder="Search articles by title, content, category, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {error.message || 'Failed to load articles. Please try again.'}
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
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery ? (
                  <>
                    Found {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for &quot;
                    <span className="text-blue-600">{searchQuery}</span>&quot;
                  </>
                ) : (
                  "Enter a search term to find articles"
                )}
              </h2>
              {!searchQuery && (
                <p className="text-gray-600">
                  Try searching for topics, keywords, or article titles that interest you
                </p>
              )}
            </div>

            {/* Results Grid */}
            {searchQuery && filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FiSearch className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                  No articles match your search. Try different keywords or browse all articles.
                </p>
                <div className="space-x-4">
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Search
                  </button>
                  <Link 
                    href="/articles"
                    className="inline-block px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Browse All Articles
                  </Link>
                </div>
              </div>
            ) : searchQuery && filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link href={`/articles/${typeof article.category === 'string' ? article.category : article.category?.slug}/${article.slug}`}>
                      {article.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {typeof article.category === 'string' ? article.category : article.category?.name}
                          </span>
                          {article.readTime && (
                            <span className="flex items-center text-gray-500 text-sm">
                              <FiClock className="w-3 h-3 mr-1" />
                              {article.readTime}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {highlightText(article.title, searchQuery)}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {highlightText(truncateContent(article.content), searchQuery)}
                        </p>

                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            {article.authorAvatar && (
                              <Image
                                src={article.authorAvatar}
                                alt={article.authorName || 'Author'}
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                            )}
                            <span>{article.authorName || 'Anonymous'}</span>
                          </div>
                          {article.createdAt && (
                            <div className="flex items-center">
                              <FiCalendar className="w-3 h-3 mr-1" />
                              {new Date(article.createdAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
