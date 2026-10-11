"use client";
import Hero from './Hero';
import FeaturedPosts from './FeaturedPosts';
import Categories from './Categories';
import CallToAction from './CallToAction';
import { useFeaturedArticles } from './hooks/useFeaturedArticles';
import { useCategories } from './hooks/useCategories';

const ErrorState = () => (
  <div className="py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We're having trouble loading our content. Please try again later.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200 transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default function HomePage({ initialFeatured, initialCategories }) {
  const { articles: featuredPosts, isLoading: isLoadingFeatured, error: featuredError } = useFeaturedArticles(initialFeatured);
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories(initialCategories);

  const hasError = featuredError || categoriesError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-950 overflow-x-hidden transition-colors">
      <Hero />
      
      {hasError ? (
        <ErrorState />
      ) : (
        <>
          <FeaturedPosts posts={featuredPosts} isLoading={isLoadingFeatured} />
          <Categories categories={categories} isLoading={isLoadingCategories} />
          <CallToAction />
        </>
      )}
    </div>
  );
}
