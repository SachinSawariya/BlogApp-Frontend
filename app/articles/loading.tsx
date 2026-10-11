// This file is the Next.js loading boundary for /articles.
// It renders instantly when the user navigates to /articles while the
// server component (page.tsx) awaits its API fetch in the background.

import { FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
      {/* Hero Banner Skeleton — matches the real page exactly */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white border-b border-transparent dark:border-gray-800/80 transition-colors">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-0" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white dark:bg-blue-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white dark:bg-purple-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
            <div className="text-left flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <FiBookOpen className="w-8 h-8 text-white dark:text-blue-400" />
                <FiTrendingUp className="w-8 h-8 text-white dark:text-indigo-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                All Articles
              </h1>
              <p className="text-lg md:text-xl text-white/90 dark:text-slate-300 max-w-2xl leading-relaxed">
                Discover our latest articles, tutorials, and insights. Explore
                different categories and find content that matters to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Skeleton Cards */}
      <div className="container mx-auto px-4 py-10">
        <div className="space-y-20">
          {[0, 1, 2].map((sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              {/* Section Header Skeleton */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-6 w-20 bg-gray-100 dark:bg-gray-750 rounded-full animate-pulse" />
              </div>

              {/* Articles Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[0, 1, 2].map((articleIndex) => (
                  <div
                    key={articleIndex}
                    className="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-750"
                    style={{ animationDelay: `${articleIndex * 100}ms` }}
                  >
                    {/* Image Skeleton */}
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />

                    {/* Content Skeleton */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-6 w-24 bg-gray-100 dark:bg-gray-750 rounded-full" />
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4" />
                      <div className="h-4 bg-gray-100 dark:bg-gray-700/70 rounded mb-2" />
                      <div className="h-4 bg-gray-100 dark:bg-gray-700/70 rounded w-3/4 mb-4" />

                      {/* Stats Bar Skeleton */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60">
                        <div className="flex items-center space-x-3">
                          <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded" />
                          <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded" />
                          <div className="h-4 w-8 bg-gray-100 dark:bg-gray-750 rounded" />
                        </div>
                        <div className="h-4 w-16 bg-gray-100 dark:bg-gray-750 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle top progress bar */}
      <style>{`
        @keyframes loading-bar {
          0%   { transform: scaleX(0);   transform-origin: left; }
          50%  { transform: scaleX(0.7); transform-origin: left; }
          100% { transform: scaleX(1);   transform-origin: left; }
        }
        .articles-loading-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #6366f1, #a855f7);
          z-index: 9999;
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="articles-loading-bar" aria-hidden="true" />
    </div>
  );
}
