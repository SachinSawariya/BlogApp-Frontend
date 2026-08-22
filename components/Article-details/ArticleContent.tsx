"use client";

import Link from "next/link";
import { FiCalendar, FiClock, FiUser, FiHeart, FiBookmark } from "react-icons/fi";
import { Article } from "@/components/Articles/types/articlesTypes";
import Image from "next/image";
import { useEffect } from "react";

interface ArticleContentProps {
  article: Article | null;
  isLoading: boolean;
}

export default function ArticleContent({ article, isLoading }: ArticleContentProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Article Not Found</h3>
        <p className="text-gray-600">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100/80 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      {/* Article Header & Image Section */}
      <div className="relative group/cover">
        {/* Featured Image */}
        {article.coverImage && (
          <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transform group-hover/cover:scale-105 transition-transform duration-1000 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
            
            {/* Header Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-blue-600/90 text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] backdrop-blur-md shadow-lg shadow-blue-500/20">
                  {typeof article.category === 'string' ? article.category : article.category.name}
                </span>
                <span className="flex items-center space-x-2 text-sm font-medium text-white/90">
                  <FiClock className="w-4 h-4 text-blue-400" />
                  <span>{article.readTime} read</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-[1.15] tracking-tight">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        {/* Fallback Header (if no image) */}
        {!article.coverImage && (
          <div className="p-12 md:p-16 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] backdrop-blur-md">
                  {typeof article.category === 'string' ? article.category : article.category.name}
                </span>
                <span className="flex items-center space-x-2 text-sm font-medium text-white/80">
                  <FiClock className="w-4 h-4 text-blue-400" />
                  <span>{article.readTime} read</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-[1.15] tracking-tight">
                {article.title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Author & Meta Bar */}
      <div className="px-8 md:px-12 py-8 border-b border-gray-100 bg-gray-50/30 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/10 overflow-hidden transform hover:rotate-3 transition-transform duration-300">
            {article.authorAvatar ? (
              <Image
                src={article.authorAvatar}
                alt={article.authorName || "Author"}
                fill
                className="object-cover"
              />
            ) : (
              <FiUser className="w-7 h-7" />
            )}
          </div>
          <div>
            <p className="font-extrabold text-gray-900 text-lg leading-tight">{article.authorName || "Admin User"}</p>
            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center space-x-1.5">
                <FiCalendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">
                  {article.createdAt 
                    ? new Date(article.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'Recently published'}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
           <button className="group flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
             <FiHeart className="w-5 h-5 transition-transform group-hover:scale-110" />
             <span className="font-bold text-[15px]">{article.likes}</span>
           </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-8 py-4 md:px-12 md:py-6 lg:px-16 lg:py-8">
        <div className="prose prose-blue lg:prose-xl max-w-none text-gray-800 leading-[1.9] font-normal selection:bg-blue-100">
          <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        </div>

        {/* Tags & Footer */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-400 font-bold text-sm uppercase tracking-widest mr-4 flex items-center gap-2">
              <FiBookmark className="text-blue-600 w-4 h-4" />
              Categorized In
            </span>
            {article.category && (
              <Link href={`/categories/${typeof article.category === 'string' ? article.category.toLowerCase().replace(/ /g, '-') : article.category.slug}`}>
                <span className="bg-blue-50 text-blue-700 border border-blue-100/50 px-5 py-2 rounded-2xl text-sm font-bold hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer capitalize">
                  {typeof article.category === 'string' ? article.category : article.category.name}
                </span>
              </Link>
            )}
            {article.tags && article.tags.map((tag, index) => (
              <Link key={index} href={`/tags/${tag.toLowerCase()}`}>
                <span className="bg-gray-50 text-gray-600 border border-gray-100 px-5 py-2 rounded-2xl text-sm font-bold hover:bg-white hover:border-blue-200 hover:text-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer">
                  #{tag}
                </span>
              </Link>
            ))}
            {!article.tags && (
              <>
                <Link href="/tags/blog">
                  <span className="bg-gray-50 text-gray-600 border border-gray-100 px-5 py-2 rounded-2xl text-sm font-bold hover:bg-white transition-all cursor-pointer">
                    #Blog
                  </span>
                </Link>
                <Link href="/tags/tech">
                  <span className="bg-gray-50 text-gray-600 border border-gray-100 px-5 py-2 rounded-2xl text-sm font-bold hover:bg-white transition-all cursor-pointer">
                    #Tech
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
