import { Article } from "@/components/Articles/types/articlesTypes";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ArticleSidebarProps {
  articles: Article[];
  isLoading: boolean;
  title: string;
}

export default function ArticleSidebar({ articles, isLoading, title }: ArticleSidebarProps) {
  const params = useParams();
  const currentSlug = params?.slug as string;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 sticky top-12 border border-gray-100 dark:border-gray-800 transition-colors">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
        {title}
      </h3>
      
      {!Array.isArray(articles) || articles.length === 0 ? (
        <div className="text-center py-8">
           <p className="text-gray-400 dark:text-gray-500 text-sm">No other articles yet</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          {articles.map((article: Article) => {
            const isActive = currentSlug === article.slug;
            return (
              <Link
                key={article._id || article.slug}
                href={`/articles/${article.slug}`}
                className={`group relative block px-5 py-4 rounded-2xl transition-all duration-300 border ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900/60 shadow-sm" 
                    : "hover:bg-blue-50/50 dark:hover:bg-gray-800/60 border-transparent hover:border-blue-100/50 dark:hover:border-gray-700/50"
                }`}
              >
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-blue-600 rounded-full transition-all duration-300 ${
                  isActive ? "h-1/2" : "h-0 group-hover:h-1/2"
                }`}></div>
                <h4 className={`text-[15px] leading-snug transition-colors ${
                  isActive ? "text-blue-700 dark:text-blue-300 font-bold" : "text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 font-medium"
                }`}>
                  {article.title}
                </h4>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
