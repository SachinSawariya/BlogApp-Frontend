import { FiExternalLink, FiTag, FiTrendingUp, FiBookOpen, FiClock } from "react-icons/fi";
import { Article } from "@/components/Articles/types/articlesTypes";
import Link from "next/link";
import { useMemo } from "react";
import { processArticleContent } from "@/utils/contentProcessor";
import TableOfContents from "./TableOfContents";

interface RelatedLinksProps {
  article: Article | null;
  relatedArticles?: Article[];
}

export default function RelatedLinks({ article, relatedArticles = [] }: RelatedLinksProps) {
  const { headings } = useMemo(() => {
    return processArticleContent(article?.content || "");
  }, [article?.content]);

  if (!article) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Related Content</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded-full w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sticky top-12">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100/80">
        <h3 className="text-2xl font-extrabold mb-8 text-gray-900 tracking-tight">
          Explore
        </h3>
        
        <div className="space-y-10">
          {/* Table of Contents in sidebar */}
          {headings.length >= 2 && (
            <TableOfContents headings={headings} variant="sidebar" />
          )}
          {/* Article Category */}
          <div className="group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-blue-50/50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FiTag className="w-5 h-5 text-blue-600 group-hover:text-white" />
              </div>
              <h4 className="font-extrabold text-gray-800 text-sm uppercase tracking-widest">Category</h4>
            </div>
            <Link
              href={`/categories/${typeof article.category === 'string' ? article.category.toLowerCase() : article.category?.slug || ""}`}
              className="flex items-center justify-between px-5 py-4 bg-gray-50/50 hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 rounded-2xl transition-all duration-500 group/link"
            >
              <span className="text-base font-bold capitalize text-gray-700 group-hover/link:text-blue-700">
                {typeof article.category === 'string' ? article.category : article.category?.name || "Uncategorized"}
              </span>
              <FiExternalLink className="w-5 h-5 text-gray-300 group-hover/link:text-blue-600 transition-colors" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-emerald-50/50 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <FiTrendingUp className="w-5 h-5 text-emerald-600 group-hover:text-white" />
              </div>
              <h4 className="font-extrabold text-gray-800 text-sm uppercase tracking-widest">Analytics</h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:bg-white hover:border-emerald-100 transition-all duration-300">
                <span className="text-xs font-bold text-gray-400 tracking-wider">READ TIME</span>
                <span className="text-sm font-extrabold text-gray-900">{article.readTime}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:bg-white hover:border-emerald-100 transition-all duration-300">
                <span className="text-xs font-bold text-gray-400 tracking-wider">ENGAGEMENT</span>
                <span className="text-sm font-extrabold text-gray-900">{(article.likes || 0) + (article.comments || 0)}</span>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {Array.isArray(relatedArticles) && relatedArticles.length > 0 && (
            <div className="group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-purple-50/50 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <FiBookOpen className="w-5 h-5 text-purple-600 group-hover:text-white" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-sm uppercase tracking-widest">Recommended</h4>
              </div>
              <div className="space-y-6">
                {relatedArticles.slice(0, 3).map((relatedArticle) => (
                  <Link
                    key={relatedArticle._id}
                    href={`/articles/${relatedArticle.slug}`}
                    className="block group/item relative pl-5 border-l-2 border-gray-100 hover:border-purple-500 transition-colors duration-300"
                  >
                    <h5 className="text-[15px] font-bold text-gray-800 group-hover/item:text-purple-600 transition-colors line-clamp-2 leading-tight">
                      {relatedArticle.title}
                    </h5>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                      <FiClock className="w-3 h-3" />
                      {relatedArticle.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Box */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20 px-8">
        <h4 className="text-xl font-extrabold mb-6 flex items-center gap-3">
          <FiExternalLink className="text-blue-400" />
          Share Article
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
            className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white hover:text-gray-900 border border-white/10 px-4 py-4 rounded-2xl text-[14px] font-extrabold transition-all duration-300 backdrop-blur-md"
          >
            LinkedIn
          </button>
          <button
            onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + window.location.href)}`, '_blank')}
            className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white hover:text-gray-900 border border-white/10 px-4 py-4 rounded-2xl text-[14px] font-extrabold transition-all duration-300 backdrop-blur-md"
          >
            WhatsApp
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
            className="bg-white/5 hover:bg-white hover:text-gray-900 border border-white/10 px-4 py-4 rounded-2xl text-[13px] font-extrabold transition-all duration-300"
          >
            Facebook
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="bg-white/5 hover:bg-white hover:text-gray-900 border border-white/10 px-4 py-4 rounded-2xl text-[13px] font-extrabold transition-all duration-300"
          >
            Copy link
          </button>
        </div>

      </div>
    </div>
  );
}
