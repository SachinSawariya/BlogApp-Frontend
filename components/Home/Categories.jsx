import Link from "next/link";
import { FiFolder, FiArrowRight, FiGrid } from "react-icons/fi";
import CategoryCard from "@/shared/Card/CategoryCard";
import CategoryCardSkeleton from "@/shared/Skeleton/CategoryCardSkeleton";

const CategoryHeader = () => (
  <div className="flex justify-between items-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
      <FiGrid className="text-blue-600" />
      Browse by Category
    </h2>
    <Link
      href="/categories"
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
    >
      View All
      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const CategoryLoading = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
    {[...Array(5)].map((_, index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
);

const CategoryEmpty = () => (
  <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
      <FiFolder className="w-12 h-12 text-blue-200" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      No categories available yet
    </h3>
    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
      Categories will appear here once articles are published.
    </p>
    <Link
      href="/categories"
      className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 gap-2 mx-auto active:scale-95"
    >
      Explore All
    </Link>
  </div>
);

const CategoryList = ({ categories }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
    {categories.map((category, index) => (
      <CategoryCard
        key={category.slug || index}
        name={category.name}
        count={category.count}
        icon={category.icon}
        href={`/categories/${category.slug}`}
      />
    ))}
  </div>
);

export default function Categories({ categories, isLoading }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Browse by Category
              </h2>
              <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <CategoryLoading />
          </>
        ) : (
          <>
            {!categories || categories.length === 0 ? (
              <>
                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Browse by Category
                </h2>
                <CategoryEmpty />
              </>
            ) : (
              <>
                <CategoryHeader />
                <CategoryList categories={categories} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
