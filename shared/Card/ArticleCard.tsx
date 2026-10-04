"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiClock,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiArrowLeft,
  FiEye,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import type { MouseEvent, ReactNode } from "react";

interface ArticleCardProps {
  id: string | number;
  title: string;
  category: string;
  slug: string;
  excerpt: string;
  readTime: string | number | undefined;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  views?: number;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  children?: ReactNode;
  viewMode?: "grid" | "list";
}

const ArticleCard = ({
  title,
  category,
  slug,
  excerpt,
  readTime,
  imageUrl,
  likes: initialLikes = 0,
  comments = 0,
  views = 0,
  className = "",
  onClick,
  children,
  viewMode = "grid",
}: ArticleCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(initialLikes);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use useEffect result to determine view mode on client-side only to prevent hydration mismatch
  const actualViewMode = isMounted && isMobile ? "list" : viewMode;

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLiked) {
      setCurrentLikes((prev) => prev - 1);
    } else {
      setCurrentLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: excerpt,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    // If click originated from a link or button, let default behavior happen
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }

    if (onClick) {
      onClick(e);
    } else {
      router.push(`/articles/${slug}`);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div
      className={`${
        actualViewMode === "grid"
          ? "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
          : "bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-[1.02] group"
      } ${className}`}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && handleClick(e)
      }
    >
      {actualViewMode === "grid" ? (
        <>
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            <Link href={`/articles/${slug}`} className="block w-full h-full" tabIndex={-1} aria-label={title}>
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold p-4 text-center"
                  aria-label={`Category: ${category}`}
                >
                  {category}
                </div>
              )}
            </Link>

            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4 pointer-events-none">
              <div className="flex space-x-3 text-white w-full justify-between pointer-events-auto">
                <div className="flex space-x-3">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 hover:text-red-400 transition-colors bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg"
                    aria-label={
                      isLiked ? "Unlike this article" : "Like this article"
                    }
                  >
                    <FiHeart
                      className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span className="text-xs font-medium">
                      {formatNumber(currentLikes)}
                    </span>
                  </button>
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <FiMessageSquare className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {formatNumber(comments)}
                    </span>
                  </div>
                  {views > 0 && (
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <FiEye className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {formatNumber(views)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleShare}
                  className="hover:text-blue-300 transition-colors bg-white/20 backdrop-blur-sm p-1.5 rounded-lg"
                  aria-label="Share this article"
                >
                  <FiShare2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                {category}
              </span>
              <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                <FiClock className="mr-1 w-3.5 h-3.5" />
                <span>{readTime} min read</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              <Link href={`/articles/${slug}`} className="hover:text-blue-600 transition-colors">
                {title}
              </Link>
            </h3>

            <div className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <FiHeart className="w-3.5 h-3.5 mr-1" />
                  {formatNumber(currentLikes)}
                </span>
                <span className="flex items-center">
                  <FiMessageSquare className="w-3.5 h-3.5 mr-1" />
                  {formatNumber(comments)}
                </span>
                {views > 0 && (
                  <span className="flex items-center">
                    <FiEye className="w-3.5 h-3.5 mr-1" />
                    {formatNumber(views)}
                  </span>
                )}
              </div>

              <Link
                href={`/articles/${slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center group opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Read More
                <FiArrowLeft className="ml-1 w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {children}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Image */}
          <div className="md:w-1/3 lg:w-2/5 h-48 md:h-auto relative overflow-hidden">
            <Link href={`/articles/${slug}`} className="block w-full h-full" tabIndex={-1} aria-label={title}>
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold p-4 text-center">
                  {category}
                </div>
              )}
            </Link>
          </div>

          {/* Right Side - Content */}
          <div className="md:w-2/3 lg:w-3/5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                  {category}
                </span>
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                  <FiClock className="mr-1 w-3.5 h-3.5" />
                  <span>{readTime} min read</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                <Link href={`/articles/${slug}`} className="hover:text-blue-600 transition-colors">
                  {title}
                </Link>
              </h3>

              <div className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
              </div>
            </div>

            {/* Footer with interactions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  aria-label={
                    isLiked ? "Unlike this article" : "Like this article"
                  }
                >
                  <FiHeart
                    className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>{formatNumber(currentLikes)}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <FiMessageSquare className="w-4 h-4" />
                  <span>{formatNumber(comments)}</span>
                </div>
                {views > 0 && (
                  <div className="flex items-center space-x-1">
                    <FiEye className="w-4 h-4" />
                    <span>{formatNumber(views)}</span>
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="hover:text-blue-500 transition-colors"
                  aria-label="Share this article"
                >
                  <FiShare2 className="w-4 h-4" />
                </button>
              </div>

              <Link
                href={`/articles/${slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
              >
                Read More
                <FiArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
