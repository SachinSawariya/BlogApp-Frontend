import Link from "next/link";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import ArticleCard from "@/shared/Card/ArticleCard";
import ArticleCardSkeleton from "@/shared/Skeleton/ArticleCardSkeleton";

const FeaturedHeader = () => (
  <div className="flex justify-between items-center mb-10">
    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
      <FiTrendingUp className="text-blue-600" />
      Featured Articles
    </h2>
    <Link 
      href="/articles"
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 group"
    >
      View All
      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const FeaturedLoading = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
    {[...Array(4)].map((_, index) => (
      <ArticleCardSkeleton key={index} />
    ))}
  </div>
);

const FeaturedEmpty = () => (
  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
      <FiTrendingUp className="w-12 h-12 text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      No featured articles yet
    </h3>
    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
      Check back soon for our latest featured content or explore other sections.
    </p>
    <Link 
      href="/articles"
      className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
    >
      Browse All Articles
    </Link>
  </div>
);

const FeaturedList = ({ posts }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
    {posts.map((post, key) => (
      <ArticleCard
        key={key}
        id={post._id || post.id}
        title={post.title}
        slug={post.slug}
        category={typeof post.category === 'string' ? post.category : post.category?.name || 'Uncategorized'}
        excerpt={post.content}
        readTime={post.readTime}
        imageUrl={post.coverImage || post.imageUrl}
        likes={post.likes}
        comments={post.comments}
      />
    ))}
  </div>
);

export default function FeaturedPosts({ posts, isLoading }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="text-blue-600" />
                Featured Articles
              </h2>
              <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
            <FeaturedLoading />
          </>
        ) : (
          <>
            {!posts || posts.length === 0 ? (
              <>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <FiTrendingUp className="text-blue-600" />
                    Featured Articles
                  </h2>
                </div>
                <FeaturedEmpty />
              </>
            ) : (
              <>
                <FeaturedHeader />
                <FeaturedList posts={posts} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
